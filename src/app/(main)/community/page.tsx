"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Eye, Heart, MessageSquare, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { POST_CATEGORIES, ROUTES } from "@/constants";
import { formatRelativeTime } from "@/lib/utils";
import { usePosts } from "@/hooks/useCommunity";

const categoryLabel = (value: string) =>
  POST_CATEGORIES.find((c) => c.value === value)?.label || value;

export default function CommunityPage() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const { data, isLoading, isError } = usePosts(
    activeCategory !== "ALL" ? activeCategory : undefined
  );

  const posts = data?.pages.flatMap((p) => p.items) ?? [];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-text-primary">커뮤니티</h1>
        <Link href={ROUTES.POST_NEW}>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-1" />
            글쓰기
          </Button>
        </Link>
      </div>

      {/* Category tabs */}
      <div className="flex items-center gap-1 overflow-x-auto mb-6 pb-1">
        <button
          onClick={() => setActiveCategory("ALL")}
          className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap transition-colors ${
            activeCategory === "ALL"
              ? "bg-foreground text-white"
              : "bg-surface text-text-secondary hover:bg-border"
          }`}
        >
          전체
        </button>
        {POST_CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-3 py-1.5 text-sm rounded-full whitespace-nowrap transition-colors ${
              activeCategory === cat.value
                ? "bg-foreground text-white"
                : "bg-surface text-text-secondary hover:bg-border"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="text-center py-12">
          <p className="text-text-secondary text-sm">
            게시글을 불러오는 중 오류가 발생했습니다
          </p>
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-secondary text-sm">
            아직 게시글이 없습니다. 첫 번째 글을 작성해보세요!
          </p>
        </div>
      )}

      {/* Post list */}
      <div className="space-y-2">
        {posts.map((post) => (
          <Link key={post.id} href={ROUTES.POST_DETAIL(post.id)}>
            <Card className="hover:border-primary/30">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-primary font-medium">
                      [{categoryLabel(post.category)}]
                    </span>
                    <h3 className="text-sm font-medium text-text-primary truncate">
                      {post.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-text-secondary">
                    <span>{post.authorNickname}</span>
                    <span>{formatRelativeTime(post.createdAt)}</span>
                    <span className="flex items-center gap-0.5">
                      <Eye className="w-3 h-3" />
                      {post.viewCount}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <Heart className="w-3 h-3" />
                      {post.likeCount}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <MessageSquare className="w-3 h-3" />
                      {post.commentCount}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
