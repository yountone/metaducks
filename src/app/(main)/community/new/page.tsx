"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { POST_CATEGORIES } from "@/constants";
import { useTranslation } from "@/lib/i18n";

export default function PostNewPage() {
  const { t } = useTranslation();
  const [category, setCategory] = useState("FREE");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-text-primary mb-6">{t("communityNew.title")}</h1>

      <div className="space-y-4">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            {t("communityNew.category")}
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
          label={t("communityNew.postTitle")}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t("communityNew.titlePlaceholder")}
        />

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            {t("communityNew.content")}
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t("communityNew.contentPlaceholder")}
            rows={10}
            className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-white resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Image upload placeholder */}
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <p className="text-sm text-text-secondary">
            {t("communityNew.imageUpload")}
          </p>
          <p className="text-xs text-text-secondary mt-1">
            {t("communityNew.imageLimit")}
          </p>
        </div>

        <Button
          className="w-full"
          size="lg"
          disabled={!title.trim() || !content.trim()}
        >
          {t("communityNew.submit")}
        </Button>
      </div>
    </div>
  );
}
