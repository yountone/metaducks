import Link from "next/link";
import { Theater, Music, Trophy, Film, Gift, Tag } from "lucide-react";
import { ROUTES } from "@/constants";

const CATEGORIES = [
  {
    icon: Theater,
    label: "뮤지컬/연극",
    href: ROUTES.TICKETS,
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50",
    active: true,
  },
  {
    icon: Music,
    label: "콘서트",
    href: "#",
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
    active: false,
  },
  {
    icon: Trophy,
    label: "스포츠",
    href: "#",
    iconColor: "text-green-600",
    bgColor: "bg-green-50",
    active: false,
  },
  {
    icon: Film,
    label: "영화/전시",
    href: "#",
    iconColor: "text-pink-600",
    bgColor: "bg-pink-50",
    active: false,
  },
  {
    icon: Gift,
    label: "상품권/쿠폰",
    href: "#",
    iconColor: "text-amber-600",
    bgColor: "bg-amber-50",
    active: false,
  },
  {
    icon: Tag,
    label: "정가 이하",
    href: "#",
    iconColor: "text-red-600",
    bgColor: "bg-red-50",
    active: false,
  },
];

export function CategoryGrid() {
  return (
    <section className="max-w-3xl mx-auto px-4 pb-10">
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
        {CATEGORIES.map(
          ({ icon: Icon, label, href, iconColor, bgColor, active }) => {
            const card = (
              <div
                className={`relative p-4 md:p-5 rounded-xl border transition-all ${
                  active
                    ? "border-border hover:border-primary/30 hover:shadow-sm cursor-pointer"
                    : "border-border/60 opacity-45 cursor-not-allowed"
                }`}
              >
                <div
                  className={`w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center ${bgColor} ${iconColor} mb-3`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-sm font-medium text-text-primary leading-tight">
                  {label}
                </p>
                {!active && (
                  <p className="text-[10px] text-text-secondary mt-0.5">
                    Coming Soon
                  </p>
                )}
              </div>
            );

            if (active) {
              return (
                <Link key={label} href={href}>
                  {card}
                </Link>
              );
            }
            return <div key={label}>{card}</div>;
          }
        )}
      </div>
    </section>
  );
}
