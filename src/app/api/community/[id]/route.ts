import { type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const post = await prisma.post.update({
    where: { id },
    data: { viewCount: { increment: 1 } },
    include: {
      author: { select: { id: true, nickname: true, image: true } },
      comments: {
        orderBy: { createdAt: "asc" },
        include: {
          author: { select: { id: true, nickname: true, image: true } },
          replies: {
            orderBy: { createdAt: "asc" },
            include: {
              author: { select: { id: true, nickname: true, image: true } },
            },
          },
        },
        where: { parentId: null },
      },
      _count: { select: { comments: true, likes: true } },
    },
  });

  if (!post) {
    return Response.json({ error: "게시글을 찾을 수 없습니다" }, { status: 404 });
  }

  return Response.json(post);
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
  const post = await prisma.post.findUnique({ where: { id } });

  if (!post || post.authorId !== userId) {
    return Response.json({ error: "권한이 없습니다" }, { status: 403 });
  }

  const body = await request.json();
  const updated = await prisma.post.update({ where: { id }, data: body });

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
  const post = await prisma.post.findUnique({ where: { id } });

  if (!post || post.authorId !== userId) {
    return Response.json({ error: "권한이 없습니다" }, { status: 403 });
  }

  await prisma.post.delete({ where: { id } });
  return Response.json({ success: true });
}
