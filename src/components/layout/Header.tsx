"use client";

import Link from "next/link";
import { Search, Wallet } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function Header() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`${ROUTES.TICKETS}?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      {/* Top announcement bar */}
      <div className="bg-foreground text-white text-xs text-center py-1.5 px-4">
        MetaDucks는 국내 최대 뮤지컬 티켓 양도 플랫폼입니다. 구매자 수수료 없음!
      </div>

      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
        {/* Logo */}
        <Link href={ROUTES.HOME} className="flex items-center gap-1.5 shrink-0">
          <span className="text-xl font-bold text-primary">🦆</span>
          <span className="text-lg font-bold text-foreground hidden sm:inline">
            METADUCKS
          </span>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-lg mx-auto">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="공연명, 가수명 등 검색"
              className="w-full h-9 pl-3 pr-9 text-sm border border-border rounded-full bg-surface placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-text-secondary hover:text-primary"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Right nav */}
        <nav className="flex items-center gap-2 shrink-0">
          <Link
            href={ROUTES.LOGIN}
            className="text-sm text-text-secondary hover:text-text-primary hidden sm:inline"
          >
            로그인
          </Link>
          <button className="text-text-secondary hover:text-primary p-1.5">
            <Wallet className="w-5 h-5" />
          </button>
          <Link href={ROUTES.TICKET_NEW}>
            <Button size="sm" variant="secondary" className="rounded-full">
              판매등록
            </Button>
          </Link>
        </nav>
      </div>

      {/* Category nav */}
      <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
        <nav className="flex items-center gap-6 h-10 text-sm whitespace-nowrap">
          <Link
            href={ROUTES.TICKETS}
            className="text-text-primary font-medium hover:text-primary transition-colors"
          >
            뮤지컬/연극
          </Link>
          <Link
            href={ROUTES.COMMUNITY}
            className="text-text-secondary hover:text-primary transition-colors"
          >
            커뮤니티
          </Link>
          <Link
            href={ROUTES.MEMBERSHIP}
            className="text-text-secondary hover:text-primary transition-colors"
          >
            멤버십
          </Link>
          <span className="text-text-secondary/50 cursor-not-allowed">
            콘서트
          </span>
          <span className="text-text-secondary/50 cursor-not-allowed">
            스포츠
          </span>
          <span className="text-text-secondary/50 cursor-not-allowed">
            정가 이하
          </span>
        </nav>
      </div>
    </header>
  );
}
