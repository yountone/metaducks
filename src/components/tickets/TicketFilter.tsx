"use client";

import { useFilterStore } from "@/stores/filterStore";
import { Input } from "@/components/ui/Input";
import { SEAT_GRADES, TRANSFER_TYPES } from "@/constants";
import { Search } from "lucide-react";
import type { SeatGrade, TransferType } from "@/types";

const SAMPLE_EVENTS = [
  { id: "ev1", title: "데스노트 2025 - 서울" },
  { id: "ev2", title: "위키드 - 서울" },
  { id: "ev3", title: "레미제라블 - 서울" },
  { id: "ev4", title: "시카고 - 서울" },
  { id: "ev5", title: "킹키부츠 - 서울" },
];

export function TicketFilter() {
  const {
    eventId,
    showDate,
    seatGrade,
    transferType,
    consecutiveOnly,
    underFaceValueOnly,
    searchQuery,
    setEventId,
    setShowDate,
    setSeatGrade,
    setTransferType,
    setConsecutiveOnly,
    setUnderFaceValueOnly,
    setSearchQuery,
    resetFilters,
  } = useFilterStore();

  return (
    <aside className="space-y-5">
      {/* Event selector */}
      <div>
        <h3 className="text-sm font-bold text-text-primary mb-2">공연 선택</h3>
        <select
          value={eventId || ""}
          onChange={(e) => setEventId(e.target.value || null)}
          className="w-full h-9 px-2 text-sm border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="">전체 공연</option>
          {SAMPLE_EVENTS.map((ev) => (
            <option key={ev.id} value={ev.id}>
              {ev.title}
            </option>
          ))}
        </select>
      </div>

      {/* Show date */}
      <div>
        <h3 className="text-sm font-bold text-text-primary mb-2">공연 일시</h3>
        <input
          type="date"
          value={showDate || ""}
          onChange={(e) => setShowDate(e.target.value || null)}
          className="w-full h-9 px-2 text-sm border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
          placeholder="YYYY.MM.DD"
        />
      </div>

      {/* Seat selection */}
      <div>
        <h3 className="text-sm font-bold text-text-primary mb-2">좌석 선택</h3>
        <div className="space-y-2">
          <div>
            <label className="text-xs text-text-secondary">등급</label>
            <select
              value={seatGrade || ""}
              onChange={(e) =>
                setSeatGrade((e.target.value as SeatGrade) || null)
              }
              className="w-full h-9 px-2 text-sm border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">전체</option>
              {SEAT_GRADES.map((g) => (
                <option key={g.value} value={g.value}>
                  {g.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Transfer type */}
      <div>
        <h3 className="text-sm font-bold text-text-primary mb-2">거래 방식</h3>
        <select
          value={transferType || ""}
          onChange={(e) =>
            setTransferType((e.target.value as TransferType) || null)
          }
          className="w-full h-9 px-2 text-sm border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="">전체</option>
          {TRANSFER_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {/* Checkboxes */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm text-text-primary cursor-pointer">
          <input
            type="checkbox"
            checked={consecutiveOnly}
            onChange={(e) => setConsecutiveOnly(e.target.checked)}
            className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
          />
          연석만 보기
        </label>
        <label className="flex items-center gap-2 text-sm text-text-primary cursor-pointer">
          <input
            type="checkbox"
            checked={underFaceValueOnly}
            onChange={(e) => setUnderFaceValueOnly(e.target.checked)}
            className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
          />
          정가 이하만
        </label>
      </div>

      {/* Search */}
      <div>
        <h3 className="text-sm font-bold text-text-primary mb-2">검색어</h3>
        <div className="relative">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="검색어 입력"
            className="pr-9"
          />
          <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={resetFilters}
        className="w-full py-2 text-sm text-text-secondary hover:text-primary border border-border rounded-lg hover:border-primary/20 transition-colors"
      >
        필터 초기화
      </button>
    </aside>
  );
}
