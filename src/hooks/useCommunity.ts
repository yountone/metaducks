"use client";

import { useInfiniteQuery, useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { PostListItem } from "@/types";

interface PostListResponse {
  items: PostListItem[];
  nextCursor?: string;
}

export function usePosts(category?: string) {
  return useInfiniteQuery<PostListResponse>({
    queryKey: ["posts", category],
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams();
      if (category && category !== "ALL") params.set("category", category);
      if (pageParam) params.set("cursor", pageParam as string);

      const res = await fetch(`/api/community?${params}`);
      if (!res.ok) throw new Error("게시글을 불러올 수 없습니다");
      return res.json();
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

export function usePostDetail(id: string) {
  return useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await fetch(`/api/community/${id}`);
      if (!res.ok) throw new Error("게시글을 찾을 수 없습니다");
      return res.json();
    },
    enabled: !!id,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      title: string;
      content: string;
      category: string;
      imageUrls?: string[];
    }) => {
      const res = await fetch("/api/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "게시글 작성에 실패했습니다");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useCreateComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { content: string; parentId?: string }) => {
      const res = await fetch(`/api/community/${postId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("댓글 작성에 실패했습니다");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
  });
}

export function useToggleLike(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/community/${postId}/like`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("좋아요 처리에 실패했습니다");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
  });
}
