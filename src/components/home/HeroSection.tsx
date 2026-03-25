"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants";

const POPULAR_TAGS = ["데스노트", "위키드", "레미제라블", "시카고", "킹키부츠"];

export function HeroSection() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`${ROUTES.TICKETS}?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-foreground via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,111,15,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,45,85,0.2),transparent_50%)]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 py-16 md:py-24 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-2">
          어떤 <span className="text-primary">티켓</span>을 찾으세요?
        </h1>
        <p className="text-gray-400 mb-8 text-sm md:text-base">
          안전한 뮤지컬 티켓 양도, MetaDucks에서 시작하세요
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-6">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="공연명, 가수명 등 검색"
              className="w-full h-12 md:h-14 pl-5 pr-12 text-base text-text-primary bg-white rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-primary shadow-lg"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-text-secondary hover:text-primary"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* Popular tags */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {POPULAR_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() =>
                router.push(
                  `${ROUTES.TICKETS}?q=${encodeURIComponent(tag)}`
                )
              }
              className="px-4 py-1.5 text-sm bg-white/10 hover:bg-white/20 rounded-full border border-white/20 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
