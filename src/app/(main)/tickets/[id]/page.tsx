"use client";

import { use } from "react";
import Link from "next/link";
import { Shield, Flag, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatPrice, formatShowDate } from "@/lib/utils";
import { ROUTES } from "@/constants";

const TICKET_DATA = {
  id: "1",
  productNumber: "7238906878245",
  eventTitle: "데스노트 2025 - 서울",
  category: "뮤지컬/연극",
  eventName: "데스노트",
  showDate: "2026-04-18T14:00:00",
  section: "C구역",
  row: "10열",
  seatNumber: null,
  floor: "2층(2F)",
  seatGrade: "A",
  cast: null,
  transferType: "PIN" as const,
  quantity: 1,
  originalPrice: 80000,
  askingPrice: 80000,
  isUnderFaceValue: true,
  isVerified: true,
  isConsecutive: false,
  description: "개인 사정으로 양도합니다. 연락 주시면 빠르게 답변드릴게요.",
  viewCount: 42,
  sellerNickname: "뮤덕이",
  sellerTrustScore: 4.8,
  sellerId: "user1",
  imageUrls: [],
  createdAt: "2026-03-20T10:00:00",
};

export default function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const ticket = TICKET_DATA;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-bold text-text-primary">상품 정보</h1>
        <span className="text-xs text-text-secondary">
          상품번호 {ticket.productNumber}
        </span>
      </div>

      {/* Ticket info card */}
      <Card className="mb-4">
        {/* Trust badges */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {ticket.isVerified && (
              <div className="flex items-center gap-1 text-xs text-success">
                <Shield className="w-3.5 h-3.5" />
                입장 안심 이용 가능
              </div>
            )}
            {ticket.isUnderFaceValue && (
              <Badge variant="underFaceValue">정가 이하</Badge>
            )}
          </div>
          <button className="flex items-center gap-1 text-xs text-text-secondary hover:text-accent-red">
            <Flag className="w-3 h-3" />
            신고하기
          </button>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-xs text-text-secondary mb-1">
          <span>{ticket.category}</span>
          <ChevronRight className="w-3 h-3" />
          <span>{ticket.eventName}</span>
          <ChevronRight className="w-3 h-3" />
          <span>{ticket.eventTitle}</span>
        </div>

        {/* Show date */}
        <p className="text-sm text-text-primary mb-3">
          공연 일시{" "}
          <span className="font-medium">
            {formatShowDate(ticket.showDate)}
          </span>
        </p>

        {/* Seat info */}
        <h2 className="text-2xl font-bold text-text-primary mb-1">
          {ticket.section} | {ticket.row}
        </h2>
        <p className="text-sm text-text-secondary mb-3">
          {ticket.seatGrade} | {ticket.floor}
        </p>

        {/* Cast */}
        {ticket.cast && (
          <p className="text-sm text-text-secondary mb-3">{ticket.cast}</p>
        )}

        {/* PIN gift button */}
        {ticket.transferType === "PIN" && (
          <button className="px-3 py-1.5 text-xs border border-border rounded-lg hover:bg-surface transition-colors">
            PIN 선물하기
          </button>
        )}
      </Card>

      {/* Transaction info card */}
      <Card className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Transfer type */}
          <div>
            <h3 className="text-sm font-bold text-text-primary mb-3">
              거래 방식 선택
            </h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <div className="w-4 h-4 rounded-full border-4 border-primary" />
              <span className="text-sm text-text-primary">
                {ticket.transferType === "PIN"
                  ? "PIN(E-ticket) 거래"
                  : "현장 거래"}
              </span>
            </label>
            {ticket.transferType === "PIN" && (
              <button className="mt-1 text-xs text-primary hover:underline">
                PIN(E-ticket) 거래란? &gt;
              </button>
            )}
          </div>

          {/* Right: Price info table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">티켓 보유 여부</span>
              <span className="text-sm font-medium text-text-primary">
                현재 티켓 보유 중
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">한 매 가격</span>
              <div className="text-right">
                {ticket.askingPrice !== ticket.originalPrice && (
                  <span className="text-sm text-accent-red line-through mr-1">
                    {formatPrice(ticket.originalPrice)}
                  </span>
                )}
                <span className="text-sm font-medium text-text-primary">
                  {formatPrice(ticket.askingPrice)}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">수량</span>
              <span className="text-sm font-medium text-text-primary">
                {ticket.quantity}매
              </span>
            </div>
            <div className="border-t border-border pt-3 flex items-center justify-between">
              <span className="text-sm font-medium text-text-primary">
                총 가격
              </span>
              <span className="text-2xl font-bold text-accent-red">
                {formatPrice(ticket.askingPrice * ticket.quantity)}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Description */}
      {ticket.description && (
        <Card className="mb-4">
          <h3 className="text-sm font-bold text-text-primary mb-2">
            판매자 설명
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            {ticket.description}
          </p>
        </Card>
      )}

      {/* Seller info */}
      <Card className="mb-4">
        <h3 className="text-sm font-bold text-text-primary mb-3">판매자 정보</h3>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold">
            {ticket.sellerNickname[0]}
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">
              {ticket.sellerNickname}
            </p>
            <p className="text-xs text-text-secondary">
              신뢰도 ⭐ {ticket.sellerTrustScore}
            </p>
          </div>
        </div>
      </Card>

      {/* Fixed bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 flex items-center gap-3 max-w-3xl mx-auto z-40">
        <Button variant="outline" size="lg" className="flex-shrink-0">
          + 비교담기
        </Button>
        <Button size="lg" variant="secondary" className="flex-1">
          구매하기
        </Button>
      </div>
    </div>
  );
}
