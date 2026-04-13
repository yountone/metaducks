"use client";

import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatPrice, formatShowDate } from "@/lib/utils";
import { ROUTES } from "@/constants";

const MY_LISTINGS = [
  {
    id: "1",
    eventTitle: "데스노트 2025 - 서울",
    showDate: "2026-04-18T14:00:00",
    section: "C구역",
    row: "10열",
    askingPrice: 80000,
    status: "ACTIVE",
    viewCount: 42,
  },
  {
    id: "7",
    eventTitle: "위키드 - 서울",
    showDate: "2026-04-25T19:00:00",
    section: "B구역",
    row: "8열",
    askingPrice: 120000,
    status: "RESERVED",
    viewCount: 28,
  },
  {
    id: "8",
    eventTitle: "시카고 - 서울",
    showDate: "2026-03-15T14:00:00",
    section: "A구역",
    row: "3열",
    askingPrice: 150000,
    status: "SOLD",
    viewCount: 95,
  },
];

const statusBadge = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return <Badge variant="verified">판매 중</Badge>;
    case "RESERVED":
      return <Badge variant="pin">예약됨</Badge>;
    case "SOLD":
      return <Badge variant="default">판매 완료</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export default function MyListingsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link href={ROUTES.MYPAGE} className="text-text-secondary hover:text-primary">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold text-text-primary">내 판매 목록</h1>
        </div>
        <Link href={ROUTES.TICKET_NEW}>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-1" />
            새 등록
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {MY_LISTINGS.map((listing) => (
          <Link key={listing.id} href={ROUTES.TICKET_DETAIL(listing.id)}>
            <Card className="hover:border-primary/30">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {statusBadge(listing.status)}
                    <span className="text-xs text-text-secondary">
                      조회 {listing.viewCount}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-text-primary mb-0.5">
                    {listing.eventTitle}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {listing.section} | {listing.row} ·{" "}
                    {formatShowDate(listing.showDate)}
                  </p>
                </div>
                <p className="text-lg font-bold text-accent-red">
                  {formatPrice(listing.askingPrice)}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
