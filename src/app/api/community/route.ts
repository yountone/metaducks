import { type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";
import { createPostSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category") || undefined;
  const cursor = searchParams.get("cursor") || undefined;
  const limit = Number(searchParams.get("limit")) || 20;

  const where: Record<string, unknown> = {};
  if (category && category !== "ALL") where.category = category;

  const posts = await prisma.post.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: limit + 1,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    include: {
      author: { select: { nickname: true } },
      _count: { select: { comments: true } },
    },
  });

  const hasMore = posts.length > limit;
  const items = hasMore ? posts.slice(0, limit) : posts;
  const nextCursor = hasMore ? items[items.length - 1]?.id : undefined;

  const formatted = items.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    authorNickname: p.author.nickname || "익명",
    viewCount: p.viewCount,
    likeCount: p.likeCount,
    commentCount: p._count.comments,
    createdAt: p.createdAt.toISOString(),
    imageUrl: p.imageUrls[0] || undefined,
  }));

  return Response.json({ items: formatted, nextCursor });
}

export async function POST(request: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return Response.json({ error: "로그인이 필요합니다" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = createPostSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "입력값을 확인해주세요", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const post = await prisma.post.create({
    data: { ...parsed.data, authorId: userId },
  });

  return Response.json(post, { status: 201 });
}
