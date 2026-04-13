"use client";

import { useEffect, useRef, useCallback } from "react";
import { TicketCard } from "@/components/tickets/TicketCard";
import { TicketFilter } from "@/components/tickets/TicketFilter";
import { CompareDrawer } from "@/components/tickets/CompareDrawer";
import { useTickets } from "@/hooks/useTickets";
import { useFilterStore, type SortBy } from "@/stores/filterStore";
import { useCompareStore } from "@/stores/compareStore";
import { Shield, Loader2 } from "lucide-react";

const SORT_OPTIONS: { value: SortBy; label: string }[] = [
  { value: "latest", label: "최신 등록순" },
  { value: "price_asc", label: "가격 낮은순" },
  { value: "price_desc", label: "가격 높은순" },
  { value: "popular", label: "인기순" },
];

export default function TicketsPage() {
  const { setSortBy, sortBy } = useFilterStore();
  const compareItems = useCompareStore((s) => s.items);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useTickets();

  // Infinite scroll
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  const tickets = data?.pages.flatMap((p) => p.items) ?? [];

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
          {/* Results count & sort */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-text-secondary">
              총{" "}
              <span className="font-medium text-text-primary">
                {tickets.length}
              </span>
              개 티켓
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="h-8 px-2 text-xs border border-border rounded-lg bg-white"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="flex justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          )}

          {/* Error */}
          {isError && (
            <div className="text-center py-12">
              <p className="text-text-secondary text-sm">
                티켓을 불러오는 중 오류가 발생했습니다
              </p>
            </div>
          )}

          {/* Empty state */}
          {!isLoading && !isError && tickets.length === 0 && (
            <div className="text-center py-12">
              <p className="text-text-secondary text-sm">
                조건에 맞는 티켓이 없습니다
              </p>
            </div>
          )}

          {/* Ticket list */}
          <div className="space-y-3">
            {tickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>

          {/* Infinite scroll trigger */}
          <div ref={loadMoreRef} className="h-4" />
          {isFetchingNextPage && (
            <div className="flex justify-center py-4">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
            </div>
          )}
        </div>

        {/* Right sidebar - desktop only */}
        <div className="hidden xl:block w-52 shrink-0 space-y-4">
          <div className="border border-border rounded-xl p-4">
            <h3 className="font-medium text-sm text-text-primary mb-2">
              상품 비교 {compareItems.length}
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
