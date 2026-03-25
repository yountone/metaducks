"use client";

import { use } from "react";
import { Heart, MessageSquare, Eye, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatRelativeTime } from "@/lib/utils";
import { ROUTES } from "@/constants";
import { useTranslation } from "@/lib/i18n";

const POST = {
  id: "p1",
  title: "데스노트 4/18 마티네 후기 🎵",
  category: "REVIEW",
  content: `오늘 데스노트 마티네 다녀왔습니다!

고은성 L / 김준수 라이트 조합이었는데 정말 최고였어요.
특히 2막 대결 장면에서의 긴장감이 대단했습니다.

C구역 10열에서 봤는데 시야도 괜찮았고,
음향도 나쁘지 않았어요.

다음에 또 보고 싶은 조합입니다!
다들 꼭 보세요 추천합니다 👍`,
  authorNickname: "뮤덕이",
  viewCount: 234,
  likeCount: 15,
  createdAt: "2026-03-24T14:00:00",
};

const COMMENTS = [
  {
    id: "c1",
    content: "저도 이 조합 봤는데 진짜 최고죠!",
    authorNickname: "뮤지컬러버",
    createdAt: "2026-03-24T15:00:00",
    replies: [
      {
        id: "c1-1",
        content: "맞아요 ㅠㅠ 다시 보고싶어요",
        authorNickname: "뮤덕이",
        createdAt: "2026-03-24T15:30:00",
      },
    ],
  },
  {
    id: "c2",
    content: "C구역 시야 어땠어요? 저도 같은 구역 티켓 있는데 궁금합니다",
    authorNickname: "데스노트팬",
    createdAt: "2026-03-24T16:00:00",
    replies: [],
  },
  {
    id: "c3",
    content: "김준수 라이트 정말 기대되네요!! 후기 감사합니다",
    authorNickname: "행복한덕후",
    createdAt: "2026-03-24T18:00:00",
    replies: [],
  },
];

export default function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Back */}
      <Link
        href={ROUTES.COMMUNITY}
        className="flex items-center gap-1 text-sm text-text-secondary hover:text-primary mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        {t("community.backToList")}
      </Link>

      {/* Post */}
      <Card className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-primary font-medium">[후기]</span>
          <h1 className="text-lg font-bold text-text-primary">{POST.title}</h1>
        </div>

        <div className="flex items-center gap-3 text-xs text-text-secondary mb-4 pb-4 border-b border-border">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-primary-light flex items-center justify-center text-primary text-xs font-bold">
              {POST.authorNickname[0]}
            </div>
            <span className="font-medium text-text-primary">
              {POST.authorNickname}
            </span>
          </div>
          <span>{formatRelativeTime(POST.createdAt)}</span>
          <span className="flex items-center gap-0.5">
            <Eye className="w-3 h-3" />
            {POST.viewCount}
          </span>
        </div>

        <div className="text-sm text-text-primary leading-relaxed whitespace-pre-line">
          {POST.content}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 mt-6 pt-4 border-t border-border">
          <button className="flex items-center gap-1 text-sm text-text-secondary hover:text-accent-red transition-colors">
            <Heart className="w-4 h-4" />
            {POST.likeCount}
          </button>
          <button className="flex items-center gap-1 text-sm text-text-secondary hover:text-primary transition-colors">
            <Share2 className="w-4 h-4" />
            공유
          </button>
        </div>
      </Card>

      {/* Comments */}
      <div className="mb-4">
        <h3 className="text-sm font-bold text-text-primary mb-3">
          {t("community.comments")} {COMMENTS.length}
        </h3>

        <div className="space-y-3">
          {COMMENTS.map((comment) => (
            <div key={comment.id}>
              <Card>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-surface flex items-center justify-center text-text-secondary text-xs font-bold">
                    {comment.authorNickname[0]}
                  </div>
                  <span className="text-xs font-medium text-text-primary">
                    {comment.authorNickname}
                  </span>
                  <span className="text-xs text-text-secondary">
                    {formatRelativeTime(comment.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-text-primary">{comment.content}</p>
                <button className="mt-2 text-xs text-text-secondary hover:text-primary">
                  {t("community.reply")}
                </button>
              </Card>

              {/* Replies */}
              {comment.replies.map((reply) => (
                <div key={reply.id} className="ml-8 mt-2">
                  <Card className="bg-surface/50">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-5 h-5 rounded-full bg-primary-light flex items-center justify-center text-primary text-[10px] font-bold">
                        {reply.authorNickname[0]}
                      </div>
                      <span className="text-xs font-medium text-text-primary">
                        {reply.authorNickname}
                      </span>
                      <span className="text-xs text-text-secondary">
                        {formatRelativeTime(reply.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-text-primary">{reply.content}</p>
                  </Card>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Comment input */}
      <div className="sticky bottom-16 md:bottom-0 bg-white border-t border-border p-4 -mx-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder={t("community.commentPlaceholder")}
            className="flex-1 h-10 px-3 text-sm border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <Button size="md">{t("community.submit")}</Button>
        </div>
      </div>
    </div>
  );
}
