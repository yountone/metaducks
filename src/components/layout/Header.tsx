"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center">
        {/* Logo */}
        <Link
          href={ROUTES.HOME}
          className="flex items-center gap-1.5 shrink-0"
        >
          <span className="text-xl font-bold text-primary">🦆</span>
          <span className="text-lg font-bold text-foreground hidden sm:inline">
            METADUCKS
          </span>
        </Link>

        {/* Center nav */}
        <nav className="flex items-center gap-6 ml-10 text-sm">
          <Link
            href={ROUTES.TICKETS}
            className="text-text-primary font-medium hover:text-primary transition-colors"
          >
            티켓
          </Link>
          <Link
            href={ROUTES.MEMBERSHIP}
            className="text-text-secondary hover:text-primary transition-colors"
          >
            멤버십
          </Link>
          <Link
            href={ROUTES.COMMUNITY}
            className="text-text-secondary hover:text-primary transition-colors"
          >
            커뮤니티
          </Link>
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right nav */}
        <nav className="flex items-center gap-3 shrink-0">
          <Link
            href={ROUTES.LOGIN}
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            로그인 / 회원가입
          </Link>
          <Link href={ROUTES.TICKET_NEW}>
            <Button size="sm" variant="secondary" className="rounded-lg">
              판매등록
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
