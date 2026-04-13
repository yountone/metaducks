import { type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";
import { createMembershipSchema } from "@/lib/validations";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return Response.json({ error: "로그인이 필요합니다" }, { status: 401 });
  }

  const membership = await prisma.membership.findFirst({
    where: { userId, isActive: true },
    orderBy: { createdAt: "desc" },
  });

  if (!membership) {
    return Response.json({
      plan: "BASIC",
      isActive: true,
      startDate: null,
      endDate: null,
    });
  }

  return Response.json({
    plan: membership.plan,
    isActive: membership.isActive,
    startDate: membership.startDate.toISOString(),
    endDate: membership.endDate.toISOString(),
  });
}

export async function POST(request: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return Response.json({ error: "로그인이 필요합니다" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = createMembershipSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "입력값을 확인해주세요", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { plan, paymentMethod } = parsed.data;

  // Deactivate current membership
  await prisma.membership.updateMany({
    where: { userId, isActive: true },
    data: { isActive: false },
  });

  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 1);

  const membership = await prisma.membership.create({
    data: {
      userId,
      plan,
      startDate,
      endDate,
      paymentMethod,
      isActive: true,
    },
  });

  return Response.json(membership, { status: 201 });
}
