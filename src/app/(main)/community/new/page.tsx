"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { POST_CATEGORIES } from "@/constants";

export default function PostNewPage() {
  const [category, setCategory] = useState("FREE");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-text-primary mb-6">글쓰기</h1>

      <div className="space-y-4">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            카테고리
          </label>
          <div className="flex gap-2 flex-wrap">
            {POST_CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                  category === cat.value
                    ? "bg-foreground text-white"
                    : "bg-surface text-text-secondary hover:bg-border"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <Input
          label="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
        />

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            내용
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력해주세요"
            rows={10}
            className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-white resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Image upload placeholder */}
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <p className="text-sm text-text-secondary">
            이미지를 드래그하거나 클릭하여 업로드
          </p>
          <p className="text-xs text-text-secondary mt-1">
            최대 5장, 10MB 이하
          </p>
        </div>

        <Button
          className="w-full"
          size="lg"
          disabled={!title.trim() || !content.trim()}
        >
          등록하기
        </Button>
      </div>
    </div>
  );
}
