import { type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";
import { createTicketSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const eventId = searchParams.get("eventId") || undefined;
  const showDate = searchParams.get("showDate") || undefined;
  const seatGrade = searchParams.get("seatGrade") || undefined;
  const transferType = searchParams.get("transferType") || undefined;
  const consecutiveOnly = searchParams.get("consecutiveOnly") === "true";
  const underFaceValueOnly = searchParams.get("underFaceValueOnly") === "true";
  const query = searchParams.get("query") || undefined;
  const sort = searchParams.get("sort") || "latest";
  const cursor = searchParams.get("cursor") || undefined;
  const limit = Number(searchParams.get("limit")) || 20;

  const where: Record<string, unknown> = {
    status: "ACTIVE",
  };

  if (eventId) where.eventId = eventId;
  if (showDate) where.showDate = new Date(showDate);
  if (seatGrade) where.seatGrade = seatGrade;
  if (transferType) where.transferType = transferType;
  if (consecutiveOnly) where.isConsecutive = true;
  if (underFaceValueOnly) where.isUnderFaceValue = true;
  if (query) {
    where.OR = [
      { title: { contains: query, mode: "insensitive" } },
      { section: { contains: query, mode: "insensitive" } },
      { cast: { contains: query, mode: "insensitive" } },
    ];
  }

  const orderBy = (() => {
    switch (sort) {
      case "price_asc": return { askingPrice: "asc" as const };
      case "price_desc": return { askingPrice: "desc" as const };
      case "popular": return { viewCount: "desc" as const };
      default: return { createdAt: "desc" as const };
    }
  })();

  const tickets = await prisma.ticket.findMany({
    where,
    orderBy,
    take: limit + 1,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    include: {
      seller: { select: { nickname: true, trustScore: true } },
      event: { select: { title: true } },
    },
  });

  const hasMore = tickets.length > limit;
  const items = hasMore ? tickets.slice(0, limit) : tickets;
  const nextCursor = hasMore ? items[items.length - 1]?.id : undefined;

  const formatted = items.map((t) => ({
    id: t.id,
    eventTitle: t.event.title,
    showDate: t.showDate.toISOString(),
    section: t.section,
    row: t.row,
    floor: t.floor,
    seatGrade: t.seatGrade,
    position: t.position,
    cast: t.cast,
    transferType: t.transferType,
    quantity: t.quantity,
    isConsecutive: t.isConsecutive,
    originalPrice: t.originalPrice,
    askingPrice: t.askingPrice,
    isUnderFaceValue: t.isUnderFaceValue,
    isVerified: t.isVerified,
    sellerNickname: t.seller.nickname || "익명",
    sellerTrustScore: t.seller.trustScore,
    createdAt: t.createdAt.toISOString(),
  }));

  return Response.json({ items: formatted, nextCursor });
}

export async function POST(request: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return Response.json({ error: "로그인이 필요합니다" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = createTicketSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "입력값을 확인해주세요", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const isUnderFaceValue = data.askingPrice <= data.originalPrice;

  const ticket = await prisma.ticket.create({
    data: {
      sellerId: userId,
      eventId: data.eventId,
      title: data.title,
      originalPrice: data.originalPrice,
      askingPrice: data.askingPrice,
      quantity: data.quantity,
      section: data.section,
      row: data.row,
      seatNumber: data.seatNumber,
      floor: data.floor,
      seatGrade: data.seatGrade,
      position: data.position,
      showDate: new Date(data.showDate),
      cast: data.cast,
      description: data.description,
      imageUrls: data.imageUrls,
      transferType: data.transferType,
      isConsecutive: data.isConsecutive,
      isUnderFaceValue,
    },
  });

  return Response.json(ticket, { status: 201 });
}
