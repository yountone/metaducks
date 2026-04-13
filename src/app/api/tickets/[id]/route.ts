import { type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const ticket = await prisma.ticket.update({
    where: { id },
    data: { viewCount: { increment: 1 } },
    include: {
      seller: { select: { id: true, nickname: true, trustScore: true, image: true } },
      event: { select: { id: true, title: true, venue: true, cast: true } },
    },
  });

  if (!ticket) {
    return Response.json({ error: "티켓을 찾을 수 없습니다" }, { status: 404 });
  }

  return Response.json({
    id: ticket.id,
    eventTitle: ticket.event.title,
    eventId: ticket.event.id,
    venue: ticket.event.venue,
    eventCast: ticket.event.cast,
    showDate: ticket.showDate.toISOString(),
    section: ticket.section,
    row: ticket.row,
    seatNumber: ticket.seatNumber,
    floor: ticket.floor,
    seatGrade: ticket.seatGrade,
    position: ticket.position,
    cast: ticket.cast,
    transferType: ticket.transferType,
    quantity: ticket.quantity,
    isConsecutive: ticket.isConsecutive,
    originalPrice: ticket.originalPrice,
    askingPrice: ticket.askingPrice,
    isUnderFaceValue: ticket.isUnderFaceValue,
    isVerified: ticket.isVerified,
    description: ticket.description,
    imageUrls: ticket.imageUrls,
    viewCount: ticket.viewCount,
    status: ticket.status,
    sellerId: ticket.seller.id,
    sellerNickname: ticket.seller.nickname || "익명",
    sellerTrustScore: ticket.seller.trustScore,
    sellerImage: ticket.seller.image,
    createdAt: ticket.createdAt.toISOString(),
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return Response.json({ error: "로그인이 필요합니다" }, { status: 401 });
  }

  const { id } = await params;
  const ticket = await prisma.ticket.findUnique({ where: { id } });

  if (!ticket) {
    return Response.json({ error: "티켓을 찾을 수 없습니다" }, { status: 404 });
  }
  if (ticket.sellerId !== userId) {
    return Response.json({ error: "권한이 없습니다" }, { status: 403 });
  }

  const body = await request.json();
  const updated = await prisma.ticket.update({
    where: { id },
    data: body,
  });

  return Response.json(updated);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return Response.json({ error: "로그인이 필요합니다" }, { status: 401 });
  }

  const { id } = await params;
  const ticket = await prisma.ticket.findUnique({ where: { id } });

  if (!ticket) {
    return Response.json({ error: "티켓을 찾을 수 없습니다" }, { status: 404 });
  }
  if (ticket.sellerId !== userId) {
    return Response.json({ error: "권한이 없습니다" }, { status: 403 });
  }

  await prisma.ticket.delete({ where: { id } });
  return Response.json({ success: true });
}
