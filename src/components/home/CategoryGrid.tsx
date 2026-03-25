import Link from "next/link";
import { Theater, Music, Trophy, Film, Gift, Tag } from "lucide-react";
import { ROUTES } from "@/constants";

const CATEGORIES = [
  {
    icon: Theater,
    label: "뮤지컬/연극",
    href: ROUTES.TICKETS,
    color: "bg-purple-50 text-purple-600",
    active: true,
  },
  {
    icon: Music,
    label: "콘서트",
    href: "#",
    color: "bg-blue-50 text-blue-600",
    active: false,
  },
  {
    icon: Trophy,
    label: "스포츠",
    href: "#",
    color: "bg-green-50 text-green-600",
    active: false,
  },
  {
    icon: Film,
    label: "영화/전시",
    href: "#",
    color: "bg-pink-50 text-pink-600",
    active: false,
  },
  {
    icon: Gift,
    label: "상품권/쿠폰",
    href: "#",
    color: "bg-amber-50 text-amber-600",
    active: false,
  },
  {
    icon: Tag,
    label: "정가 이하",
    href: "#",
    color: "bg-red-50 text-red-600",
    active: false,
  },
];

export function CategoryGrid() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {CATEGORIES.map(({ icon: Icon, label, href, color, active }) => {
          const content = (
            <div
              className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-colors ${
                active
                  ? "hover:bg-surface cursor-pointer"
                  : "opacity-40 cursor-not-allowed"
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-text-primary">
                {label}
              </span>
              {!active && (
                <span className="text-[10px] text-text-secondary">
                  Coming Soon
                </span>
              )}
            </div>
          );

          if (active) {
            return (
              <Link key={label} href={href}>
                {content}
              </Link>
            );
          }
          return <div key={label}>{content}</div>;
        })}
      </div>
    </section>
  );
}
