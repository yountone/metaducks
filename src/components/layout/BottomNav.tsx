"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Ticket, MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants";

const NAV_ITEMS = [
  { href: ROUTES.HOME, label: "홈", icon: Home },
  { href: ROUTES.TICKETS, label: "티켓", icon: Ticket },
  { href: ROUTES.COMMUNITY, label: "커뮤니티", icon: MessageSquare },
  { href: ROUTES.MYPAGE, label: "마이", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border md:hidden pb-safe">
      <div className="flex items-center justify-around h-14">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 py-1 px-3 text-xs transition-colors",
                isActive ? "text-primary" : "text-text-secondary"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
