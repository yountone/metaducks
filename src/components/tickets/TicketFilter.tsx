"use client";

import { useFilterStore } from "@/stores/filterStore";
import { Input } from "@/components/ui/Input";
import { SEAT_GRADES, TRANSFER_TYPES } from "@/constants";
import { Search } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import type { SeatGrade, TransferType } from "@/types";

const SAMPLE_EVENTS = [
  { id: "ev1", title: "데스노트 2025 - 서울" },
  { id: "ev2", title: "위키드 - 서울" },
  { id: "ev3", title: "레미제라블 - 서울" },
  { id: "ev4", title: "시카고 - 서울" },
  { id: "ev5", title: "킹키부츠 - 서울" },
];

export function TicketFilter() {
  const { t } = useTranslation();
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
        <h3 className="text-sm font-bold text-text-primary mb-2">{t("filter.eventSelect")}</h3>
        <select
          value={eventId || ""}
          onChange={(e) => setEventId(e.target.value || null)}
          className="w-full h-9 px-2 text-sm border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="">{t("filter.allEvents")}</option>
          {SAMPLE_EVENTS.map((ev) => (
            <option key={ev.id} value={ev.id}>
              {ev.title}
            </option>
          ))}
        </select>
      </div>

      {/* Show date */}
      <div>
        <h3 className="text-sm font-bold text-text-primary mb-2">{t("filter.showDate")}</h3>
        <input
          type="date"
          value={showDate || ""}
          onChange={(e) => setShowDate(e.target.value || null)}
          className="w-full h-9 px-2 text-sm border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
          placeholder={t("filter.datePlaceholder")}
        />
      </div>

      {/* Seat selection */}
      <div>
        <h3 className="text-sm font-bold text-text-primary mb-2">{t("filter.seatSelect")}</h3>
        <div className="space-y-2">
          <div>
            <label className="text-xs text-text-secondary">{t("filter.grade")}</label>
            <select
              value={seatGrade || ""}
              onChange={(e) =>
                setSeatGrade((e.target.value as SeatGrade) || null)
              }
              className="w-full h-9 px-2 text-sm border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">{t("filter.all")}</option>
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
        <h3 className="text-sm font-bold text-text-primary mb-2">{t("filter.tradeMethod")}</h3>
        <select
          value={transferType || ""}
          onChange={(e) =>
            setTransferType((e.target.value as TransferType) || null)
          }
          className="w-full h-9 px-2 text-sm border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="">{t("filter.all")}</option>
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
          {t("filter.consecutiveOnly")}
        </label>
        <label className="flex items-center gap-2 text-sm text-text-primary cursor-pointer">
          <input
            type="checkbox"
            checked={underFaceValueOnly}
            onChange={(e) => setUnderFaceValueOnly(e.target.checked)}
            className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
          />
          {t("filter.underFaceOnly")}
        </label>
      </div>

      {/* Search */}
      <div>
        <h3 className="text-sm font-bold text-text-primary mb-2">{t("filter.keyword")}</h3>
        <div className="relative">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("filter.keywordPlaceholder")}
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
        {t("filter.reset")}
      </button>
    </aside>
  );
}
