"use client";

import { TicketCard } from "@/components/tickets/TicketCard";
import { TicketFilter } from "@/components/tickets/TicketFilter";
import { CompareDrawer } from "@/components/tickets/CompareDrawer";
import { Badge } from "@/components/ui/Badge";
import { Shield } from "lucide-react";
import type { TicketListItem } from "@/types";

const SAMPLE_TICKETS: TicketListItem[] = [
  {
    id: "1",
    eventTitle: "데스노트 2025 - 서울",
    showDate: "2026-04-18T14:00:00",
    section: "C구역",
    row: "10열",
    floor: "2층(2F)",
    seatGrade: "A",
    transferType: "PIN",
    quantity: 1,
    isConsecutive: false,
    originalPrice: 80000,
    askingPrice: 80000,
    isUnderFaceValue: true,
    isVerified: true,
    sellerNickname: "뮤덕이",
    sellerTrustScore: 4.8,
    createdAt: "2026-03-20T10:00:00",
  },
  {
    id: "2",
    eventTitle: "데스노트 2025 - 서울",
    showDate: "2026-04-11T00:00:00",
    section: "A구역",
    row: "10열",
    floor: "2층(2F)",
    seatGrade: "A",
    position: "왼쪽",
    transferType: "PIN",
    quantity: 1,
    isConsecutive: false,
    originalPrice: 80000,
    askingPrice: 100000,
    isUnderFaceValue: false,
    isVerified: true,
    sellerNickname: "티켓마스터",
    sellerTrustScore: 4.5,
    createdAt: "2026-03-19T15:00:00",
  },
  {
    id: "3",
    eventTitle: "데스노트 2025 - 서울",
    showDate: "2026-04-01T14:00:00",
    section: "A구역",
    row: "12열",
    floor: "2층(2F)",
    seatGrade: "A",
    cast: "고은성 김준수",
    transferType: "DIRECT",
    quantity: 2,
    isConsecutive: true,
    originalPrice: 80000,
    askingPrice: 110000,
    isUnderFaceValue: false,
    isVerified: false,
    sellerNickname: "뮤지컬러버",
    sellerTrustScore: 4.2,
    createdAt: "2026-03-18T09:00:00",
  },
  {
    id: "4",
    eventTitle: "데스노트 2025 - 서울",
    showDate: "2026-04-11T14:00:00",
    section: "A구역",
    row: "11열",
    floor: "2층(2F)",
    seatGrade: "A",
    cast: "김준수 고은성",
    transferType: "PIN",
    quantity: 1,
    isConsecutive: false,
    originalPrice: 80000,
    askingPrice: 95000,
    isUnderFaceValue: false,
    isVerified: true,
    sellerNickname: "행복한덕후",
    sellerTrustScore: 4.9,
    createdAt: "2026-03-17T20:00:00",
  },
  {
    id: "5",
    eventTitle: "위키드 - 서울",
    showDate: "2026-04-20T19:00:00",
    section: "A구역",
    row: "5열",
    floor: "1층(1F)",
    seatGrade: "R",
    transferType: "PIN",
    quantity: 2,
    isConsecutive: true,
    originalPrice: 140000,
    askingPrice: 130000,
    isUnderFaceValue: true,
    isVerified: true,
    sellerNickname: "위키드팬",
    sellerTrustScore: 4.7,
    createdAt: "2026-03-16T11:00:00",
  },
  {
    id: "6",
    eventTitle: "레미제라블 - 서울",
    showDate: "2026-05-01T14:00:00",
    section: "B구역",
    row: "3열",
    floor: "1층(1F)",
    seatGrade: "S",
    transferType: "DIRECT",
    quantity: 1,
    isConsecutive: false,
    originalPrice: 120000,
    askingPrice: 110000,
    isUnderFaceValue: true,
    isVerified: false,
    sellerNickname: "레미팬",
    sellerTrustScore: 4.3,
    createdAt: "2026-03-15T14:00:00",
  },
];

export default function TicketsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-text-primary">뮤지컬/연극</h1>
      </div>

      {/* Info banner */}
      <div className="flex items-center gap-2 mb-4 p-3 bg-surface rounded-lg">
        <Shield className="w-4 h-4 text-success shrink-0" />
        <span className="text-xs text-text-secondary">
          입장 안심 이용 가능 - MetaDucks가 검증한 안전한 티켓만 표시됩니다
        </span>
      </div>

      <div className="flex gap-6">
        {/* Left sidebar - desktop only */}
        <div className="hidden lg:block w-56 shrink-0">
          <TicketFilter />
        </div>

        {/* Main content */}
        <div className="flex-1">
          {/* Results count */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-text-secondary">
              총 <span className="font-medium text-text-primary">{SAMPLE_TICKETS.length}</span>개 티켓
            </p>
            <select className="h-8 px-2 text-xs border border-border rounded-lg bg-white">
              <option>최신 등록순</option>
              <option>가격 낮은순</option>
              <option>가격 높은순</option>
              <option>공연일 가까운순</option>
            </select>
          </div>

          {/* Ticket list */}
          <div className="space-y-3">
            {SAMPLE_TICKETS.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        </div>

        {/* Right sidebar - desktop only */}
        <div className="hidden xl:block w-52 shrink-0 space-y-4">
          <div className="border border-border rounded-xl p-4">
            <h3 className="font-medium text-sm text-text-primary mb-2">
              상품 비교 0
            </h3>
            <p className="text-xs text-text-secondary">
              비교담기를 눌러 티켓을 비교해보세요
            </p>
          </div>
          <div className="border border-border rounded-xl p-4">
            <h3 className="font-medium text-sm text-text-primary mb-2">
              최근 본 상품 0
            </h3>
            <button className="text-xs text-primary hover:underline">
              더보기
            </button>
          </div>
          <div className="border border-primary/20 rounded-xl p-4 bg-primary-light">
            <h3 className="font-bold text-sm text-primary mb-1">
              상품 등록 알림
            </h3>
            <p className="text-xs text-text-secondary">
              찾는 티켓이 없다면 빠르게 알려드려요!
            </p>
          </div>
        </div>
      </div>

      <CompareDrawer />
    </div>
  );
}
