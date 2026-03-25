"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants";
import { useTranslation } from "@/lib/i18n";

const POPULAR_KEYWORDS = [
  "데스노트",
  "위키드",
  "레미제라블",
  "시카고",
  "킹키부츠",
];

export function HeroSection() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { t } = useTranslation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`${ROUTES.TICKETS}?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="bg-white">
      <div className="max-w-3xl mx-auto px-4 pt-16 pb-12 md:pt-24 md:pb-16 text-center">
        {/* Heading */}
        <h1 className="text-3xl md:text-[42px] font-bold text-text-primary leading-tight mb-3">
          {t("hero.title.prefix")}
          <span className="text-primary">{t("hero.title.highlight")}</span>
          {t("hero.title.suffix")}
        </h1>
        <p className="text-text-secondary text-sm md:text-base mb-10">
          {t("hero.subtitle")}
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-6">
          <div className="flex items-center border border-border rounded-full overflow-hidden hover:border-text-secondary transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
            <button
              type="button"
              className="flex items-center gap-1 px-4 md:px-5 h-12 md:h-14 text-sm font-medium text-text-primary border-r border-border shrink-0 hover:bg-surface transition-colors"
            >
              {t("hero.search.category")}
              <ChevronDown className="w-3.5 h-3.5 text-text-secondary" />
            </button>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("hero.search.placeholder")}
              className="flex-1 h-12 md:h-14 px-4 text-sm md:text-base text-text-primary bg-transparent placeholder:text-text-secondary/60 focus:outline-none"
            />
            <button
              type="submit"
              className="w-10 h-10 md:w-11 md:h-11 mr-1 md:mr-1.5 flex items-center justify-center bg-primary hover:bg-primary/90 rounded-full text-white transition-colors shrink-0"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* Popular keywords */}
        <div className="flex items-center justify-center gap-x-3 gap-y-1 flex-wrap text-sm">
          <span className="text-text-secondary">{t("hero.popular")}</span>
          {POPULAR_KEYWORDS.map((keyword) => (
            <button
              key={keyword}
              onClick={() =>
                router.push(
                  `${ROUTES.TICKETS}?q=${encodeURIComponent(keyword)}`
                )
              }
              className="text-text-primary hover:text-primary transition-colors"
            >
              {keyword}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
