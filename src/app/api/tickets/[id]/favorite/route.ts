import { type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return Response.json({ error: "로그인이 필요합니다" }, { status: 401 });
  }

  const { id: ticketId } = await params;

  const existing = await prisma.favorite.findUnique({
    where: { userId_ticketId: { userId, ticketId } },
  });

  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } });
    return Response.json({ favorited: false });
  }

  await prisma.favorite.create({ data: { userId, ticketId } });
  return Response.json({ favorited: true });
}
