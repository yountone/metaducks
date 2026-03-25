"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants";
import { useTranslation, LOCALES, type Locale } from "@/lib/i18n";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const { locale, setLocale, t } = useTranslation();

  const currentLocale = LOCALES.find((l) => l.value === locale)!;

  // Close language dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const NAV_ITEMS = [
    { label: t("nav.tickets"), href: ROUTES.TICKETS },
    { label: t("nav.membership"), href: ROUTES.MEMBERSHIP },
    { label: t("nav.community"), href: ROUTES.COMMUNITY },
  ];

  const LanguageSelector = ({ mobile }: { mobile?: boolean }) => (
    <div ref={mobile ? undefined : langRef} className="relative">
      <button
        onClick={() => setLangOpen(!langOpen)}
        className={`flex items-center gap-1.5 text-sm transition-colors ${
          mobile
            ? "text-text-primary py-3"
            : "text-text-secondary hover:text-text-primary"
        }`}
      >
        <Globe className="w-4 h-4" />
        <span>{currentLocale.flag} {currentLocale.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${langOpen ? "rotate-180" : ""}`} />
      </button>

      {langOpen && (
        <div
          className={`${
            mobile
              ? "relative mt-1 border border-border rounded-lg"
              : "absolute right-0 mt-2 w-40 border border-border rounded-lg shadow-lg"
          } bg-white py-1 z-50`}
        >
          {LOCALES.map((loc) => (
            <button
              key={loc.value}
              onClick={() => {
                setLocale(loc.value);
                setLangOpen(false);
              }}
              className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-surface transition-colors ${
                locale === loc.value
                  ? "text-primary font-medium"
                  : "text-text-primary"
              }`}
            >
              <span>{loc.flag}</span>
              <span>{loc.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );

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
          <nav className="hidden md:flex items-center gap-4 shrink-0">
            <LanguageSelector />
            <Link
              href={ROUTES.LOGIN}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              {t("nav.login")}
            </Link>
            <Link href={ROUTES.TICKET_NEW}>
              <Button size="sm" variant="secondary" className="rounded-lg">
                {t("nav.sell")}
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
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setMobileMenuOpen(false)}
          />
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
            <nav className="flex-1 px-4 pt-4 overflow-y-auto">
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
              <Link
                href={ROUTES.TICKET_NEW}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-4 text-lg font-medium text-text-primary border-b border-border hover:text-primary transition-colors"
              >
                {t("nav.sell")}
              </Link>
              <Link
                href={ROUTES.MYPAGE}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-4 text-lg font-medium text-text-primary border-b border-border hover:text-primary transition-colors"
              >
                {t("nav.mypage")}
              </Link>

              {/* Language selector in mobile */}
              <div className="py-4 border-b border-border">
                <LanguageSelector mobile />
              </div>
            </nav>

            {/* Bottom CTA */}
            <div className="px-4 py-6 border-t border-border">
              <Link
                href={ROUTES.LOGIN}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button className="w-full" size="lg">
                  {t("nav.login")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
