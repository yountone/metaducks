"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Eye, Heart, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { POST_CATEGORIES, ROUTES } from "@/constants";
import { formatRelativeTime } from "@/lib/utils";

const SAMPLE_POSTS = [
  {
    id: "p1",
    title: "데스노트 4/18 마티네 후기 🎵",
    category: "REVIEW",
    authorNickname: "뮤덕이",
    viewCount: 234,
    likeCount: 15,
    commentCount: 8,
    createdAt: "2026-03-24T14:00:00",
  },
  {
    id: "p2",
    title: "위키드 좌석 시야 질문이요",
    category: "QUESTION",
    authorNickname: "위키드팬",
    viewCount: 89,
    likeCount: 3,
    commentCount: 12,
    createdAt: "2026-03-24T10:00:00",
  },
  {
    id: "p3",
    title: "레미제라블 5/1 동행 구합니다",
    category: "COMPANION",
    authorNickname: "레미팬",
    viewCount: 156,
    likeCount: 7,
    commentCount: 5,
    createdAt: "2026-03-23T18:00:00",
  },
  {
    id: "p4",
    title: "PIN 거래 시 주의사항 정리",
    category: "INFO",
    authorNickname: "안전거래",
    viewCount: 512,
    likeCount: 42,
    commentCount: 18,
    createdAt: "2026-03-22T09:00:00",
  },
  {
    id: "p5",
    title: "오늘 시카고 첫 공연 다녀왔어요",
    category: "FREE",
    authorNickname: "시카고매니아",
    viewCount: 178,
    likeCount: 21,
    commentCount: 9,
    createdAt: "2026-03-21T22:00:00",
  },
];

const categoryLabel = (value: string) =>
  POST_CATEGORIES.find((c) => c.value === value)?.label || value;

export default function CommunityPage() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const filteredPosts =
    activeCategory === "ALL"
      ? SAMPLE_POSTS
      : SAMPLE_POSTS.filter((p) => p.category === activeCategory);

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

      {/* Post list */}
      <div className="space-y-2">
        {filteredPosts.map((post) => (
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
