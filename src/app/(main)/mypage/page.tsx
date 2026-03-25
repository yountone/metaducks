"use client";

import Link from "next/link";
import {
  Ticket,
  Heart,
  Wallet,
  Crown,
  Settings,
  ChevronRight,
  Star,
  History,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ROUTES } from "@/constants";
import { useTranslation } from "@/lib/i18n";

const MENU_ITEMS_CONFIG = [
  {
    icon: Ticket,
    labelKey: "mypage.listings",
    href: ROUTES.MY_LISTINGS,
    count: 3,
  },
  {
    icon: Heart,
    labelKey: "mypage.favorites",
    href: ROUTES.MYPAGE,
    count: 5,
  },
  {
    icon: History,
    labelKey: "mypage.transactions",
    href: ROUTES.MYPAGE,
    count: 12,
  },
  {
    icon: Star,
    labelKey: "mypage.reviews",
    href: ROUTES.MYPAGE,
    count: 8,
  },
  {
    icon: Wallet,
    labelKey: "mypage.wallet",
    href: ROUTES.MY_WALLET,
    badge: "BSC",
  },
  {
    icon: Crown,
    labelKey: "mypage.membership",
    href: ROUTES.MEMBERSHIP,
    badge: "Basic",
  },
  {
    icon: Settings,
    labelKey: "mypage.settings",
    href: ROUTES.MY_SETTINGS,
  },
];

export default function MyPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Profile */}
      <Card className="mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center text-primary text-2xl font-bold">
            M
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-text-primary">뮤덕이</h1>
            <p className="text-sm text-text-secondary">museum@metaducks.io</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="verified">{t("mypage.verified")}</Badge>
              <span className="text-xs text-text-secondary">
                {t("mypage.trust")} ⭐ 4.8
              </span>
            </div>
          </div>
          <Link
            href={ROUTES.MY_SETTINGS}
            className="text-text-secondary hover:text-primary"
          >
            <Settings className="w-5 h-5" />
          </Link>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-surface rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-text-primary">3</p>
          <p className="text-xs text-text-secondary">판매 중</p>
        </div>
        <div className="bg-surface rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-text-primary">12</p>
          <p className="text-xs text-text-secondary">거래 완료</p>
        </div>
        <div className="bg-surface rounded-xl p-3 text-center">
          <p className="text-xl font-bold text-primary">4.8</p>
          <p className="text-xs text-text-secondary">평균 평점</p>
        </div>
      </div>

      {/* Menu */}
      <div className="space-y-1">
        {MENU_ITEMS.map(({ icon: Icon, label, href, count, badge }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface transition-colors"
          >
            <Icon className="w-5 h-5 text-text-secondary" />
            <span className="flex-1 text-sm text-text-primary">{label}</span>
            {count !== undefined && (
              <span className="text-xs text-text-secondary">{count}</span>
            )}
            {badge && <Badge variant="default">{badge}</Badge>}
            <ChevronRight className="w-4 h-4 text-text-secondary" />
          </Link>
        ))}
      </div>
    </div>
  );
}
