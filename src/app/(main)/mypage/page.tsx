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

const MENU_ITEMS = [
  {
    icon: Ticket,
    label: "내 판매 목록",
    href: ROUTES.MY_LISTINGS,
    count: 3,
  },
  {
    icon: Heart,
    label: "찜한 티켓",
    href: ROUTES.MYPAGE,
    count: 5,
  },
  {
    icon: History,
    label: "거래 내역",
    href: ROUTES.MYPAGE,
    count: 12,
  },
  {
    icon: Star,
    label: "받은 후기",
    href: ROUTES.MYPAGE,
    count: 8,
  },
  {
    icon: Wallet,
    label: "지갑 관리",
    href: ROUTES.MY_WALLET,
    badge: "BSC",
  },
  {
    icon: Crown,
    label: "멤버십",
    href: ROUTES.MEMBERSHIP,
    badge: "Basic",
  },
  {
    icon: Settings,
    label: "설정",
    href: ROUTES.MY_SETTINGS,
  },
];

export default function MyPage() {
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
              <Badge variant="verified">인증됨</Badge>
              <span className="text-xs text-text-secondary">
                신뢰도 ⭐ 4.8
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
