import { type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";
import { createTransactionSchema } from "@/lib/validations";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return Response.json({ error: "로그인이 필요합니다" }, { status: 401 });
  }

  const transactions = await prisma.transaction.findMany({
    where: { OR: [{ buyerId: userId }, { sellerId: userId }] },
    orderBy: { createdAt: "desc" },
    include: {
      ticket: {
        select: { title: true, section: true, row: true, askingPrice: true },
      },
    },
  });

  return Response.json(transactions);
}

export async function POST(request: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return Response.json({ error: "로그인이 필요합니다" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = createTransactionSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "입력값을 확인해주세요", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { ticketId, paymentMethod, txHash } = parsed.data;

  const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });
  if (!ticket) {
    return Response.json({ error: "티켓을 찾을 수 없습니다" }, { status: 404 });
  }
  if (ticket.status !== "ACTIVE") {
    return Response.json(
      { error: "이미 판매된 티켓입니다" },
      { status: 400 }
    );
  }
  if (ticket.sellerId === userId) {
    return Response.json(
      { error: "본인의 티켓은 구매할 수 없습니다" },
      { status: 400 }
    );
  }

  const transaction = await prisma.$transaction(async (tx) => {
    // Update ticket status
    await tx.ticket.update({
      where: { id: ticketId },
      data: { status: "RESERVED" },
    });

    // Create transaction record
    return tx.transaction.create({
      data: {
        ticketId,
        buyerId: userId,
        sellerId: ticket.sellerId,
        amount: ticket.askingPrice,
        paymentMethod,
        txHash,
        status: txHash ? "CONFIRMED" : "PENDING",
      },
    });
  });

  return Response.json(transaction, { status: 201 });
}
