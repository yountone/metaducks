"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants";

const NAV_ITEMS = [
  { label: "티켓", href: ROUTES.TICKETS },
  { label: "멤버십", href: ROUTES.MEMBERSHIP },
  { label: "커뮤니티", href: ROUTES.COMMUNITY },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center">
          {/* Logo */}
          <Link
            href={ROUTES.HOME}
            className="flex items-center gap-1.5 shrink-0"
          >
            <span className="text-xl font-bold text-primary">🦆</span>
            <span className="text-lg font-bold text-foreground">
              METADUCKS
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 ml-10 text-sm">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-text-secondary hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Desktop right nav */}
          <nav className="hidden md:flex items-center gap-3 shrink-0">
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

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 text-text-primary"
            aria-label="메뉴 열기"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu panel */}
          <div className="absolute inset-0 bg-white flex flex-col">
            {/* Header */}
            <div className="px-4 h-14 flex items-center justify-between border-b border-border">
              <Link
                href={ROUTES.HOME}
                className="flex items-center gap-1.5"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-xl font-bold text-primary">🦆</span>
                <span className="text-lg font-bold text-foreground">
                  METADUCKS
                </span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-text-primary"
                aria-label="메뉴 닫기"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-4 pt-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-4 text-lg font-medium text-text-primary border-b border-border hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}

              {/* Additional links */}
              <Link
                href={ROUTES.TICKET_NEW}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-4 text-lg font-medium text-text-primary border-b border-border hover:text-primary transition-colors"
              >
                판매등록
              </Link>
              <Link
                href={ROUTES.MYPAGE}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-4 text-lg font-medium text-text-primary border-b border-border hover:text-primary transition-colors"
              >
                마이페이지
              </Link>
            </nav>

            {/* Bottom CTA */}
            <div className="px-4 py-6 border-t border-border">
              <Link
                href={ROUTES.LOGIN}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button className="w-full" size="lg">
                  로그인 / 회원가입
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
