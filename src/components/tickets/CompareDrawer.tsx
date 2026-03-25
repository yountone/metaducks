"use client";

import { useState } from "react";
import { X, ArrowLeft } from "lucide-react";
import { useCompareStore } from "@/stores/compareStore";
import { formatPrice, formatShowDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SEAT_GRADES, TRANSFER_TYPES } from "@/constants";
import { useTranslation } from "@/lib/i18n";

const gradeLabel = (v: string) =>
  SEAT_GRADES.find((g) => g.value === v)?.label || v;
const transferLabel = (v: string) =>
  TRANSFER_TYPES.find((t) => t.value === v)?.label || v;

export function CompareDrawer() {
  const { t } = useTranslation();
  const { items, isOpen, setOpen, removeItem, clear } = useCompareStore();
  const [showTable, setShowTable] = useState(false);

  if (items.length === 0) return null;

  return (
    <>
      {/* Floating badge */}
      {!isOpen && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-20 right-4 md:bottom-6 z-40 bg-primary text-white px-4 py-2.5 rounded-full shadow-lg hover:bg-primary/90 transition-colors text-sm font-medium"
        >
          {t("compare.title")} {items.length}
        </button>
      )}

      {/* Drawer */}
      {isOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border shadow-2xl rounded-t-2xl max-h-[70vh] overflow-y-auto pb-safe">
          <div className="sticky top-0 bg-white border-b border-border px-4 py-3 flex items-center justify-between z-10">
            {showTable ? (
              <button
                onClick={() => setShowTable(false)}
                className="flex items-center gap-1 text-sm text-text-primary hover:text-primary"
              >
                <ArrowLeft className="w-4 h-4" />
                {t("compare.back")}
              </button>
            ) : (
              <h3 className="font-bold text-text-primary">
                {t("compare.title")} ({items.length}/5)
              </h3>
            )}
            <div className="flex items-center gap-2">
              <button
                onClick={clear}
                className="text-xs text-text-secondary hover:text-accent-red"
              >
                {t("compare.clearAll")}
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  setShowTable(false);
                }}
                className="p-1 hover:bg-surface rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!showTable ? (
            <>
              {/* Item list */}
              <div className="p-4 space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 border border-border rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary truncate">
                        {item.eventTitle}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {item.section} | {item.row} · {gradeLabel(item.seatGrade)}{" "}
                        · {item.floor}
                      </p>
                    </div>
                    <div className="text-right ml-3">
                      <p className="text-sm font-bold text-accent-red">
                        {formatPrice(item.askingPrice)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-2 p-1 text-text-secondary hover:text-accent-red"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="sticky bottom-0 bg-white border-t border-border p-4">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => setShowTable(true)}
                  disabled={items.length < 2}
                >
                  {items.length < 2
                    ? t("compare.minTwo")
                    : `${items.length}${t("compare.compareN")}`}
                </Button>
              </div>
            </>
          ) : (
            /* Comparison Table */
            <div className="overflow-x-auto">
              <table className="w-full min-w-[400px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="p-3 text-left text-xs font-medium text-text-secondary w-24">
                      {t("compare.item")}
                    </th>
                    {items.map((item) => (
                      <th
                        key={item.id}
                        className="p-3 text-center text-xs font-medium text-text-primary"
                      >
                        <div className="flex items-center justify-center gap-1">
                          <span className="truncate max-w-[120px]">
                            {item.section} {item.row}
                          </span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-text-secondary hover:text-accent-red shrink-0"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-border">
                    <td className="p-3 text-xs text-text-secondary">{t("compare.show")}</td>
                    {items.map((item) => (
                      <td
                        key={item.id}
                        className="p-3 text-center text-xs text-text-primary"
                      >
                        {item.eventTitle}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-xs text-text-secondary">{t("compare.showDate")}</td>
                    {items.map((item) => (
                      <td
                        key={item.id}
                        className="p-3 text-center text-xs text-text-primary"
                      >
                        {formatShowDate(item.showDate)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-xs text-text-secondary">{t("compare.seat")}</td>
                    {items.map((item) => (
                      <td
                        key={item.id}
                        className="p-3 text-center text-xs font-medium text-text-primary"
                      >
                        {item.section} | {item.row}
                        <br />
                        <span className="text-text-secondary font-normal">
                          {item.floor}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-xs text-text-secondary">{t("compare.grade")}</td>
                    {items.map((item) => (
                      <td
                        key={item.id}
                        className="p-3 text-center text-xs text-text-primary"
                      >
                        {gradeLabel(item.seatGrade)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-xs text-text-secondary">{t("compare.tradeMethod")}</td>
                    {items.map((item) => (
                      <td key={item.id} className="p-3 text-center">
                        <Badge
                          variant={
                            item.transferType === "PIN" ? "pin" : "direct"
                          }
                        >
                          {transferLabel(item.transferType)}
                        </Badge>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 text-xs text-text-secondary">{t("compare.quantity")}</td>
                    {items.map((item) => (
                      <td
                        key={item.id}
                        className="p-3 text-center text-xs text-text-primary"
                      >
                        {item.quantity}{t("common.tickets")}
                        {item.isConsecutive && ` (${t("popular.consecutive")})`}
                      </td>
                    ))}
                  </tr>
                  {items.some((item) => item.cast) && (
                    <tr className="border-b border-border">
                      <td className="p-3 text-xs text-text-secondary">{t("compare.cast")}</td>
                      {items.map((item) => (
                        <td
                          key={item.id}
                          className="p-3 text-center text-xs text-text-primary"
                        >
                          {item.cast || "-"}
                        </td>
                      ))}
                    </tr>
                  )}
                  <tr className="border-b border-border bg-primary-light/20">
                    <td className="p-3 text-xs font-medium text-text-primary">
                      {t("compare.pricePerTicket")}
                    </td>
                    {items.map((item) => (
                      <td
                        key={item.id}
                        className="p-3 text-center font-bold text-accent-red"
                      >
                        {formatPrice(item.askingPrice)}
                        {item.isUnderFaceValue && (
                          <Badge variant="underFaceValue" className="ml-1">
                            {t("ticket.underFace")}
                          </Badge>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 text-xs text-text-secondary">{t("compare.seller")}</td>
                    {items.map((item) => (
                      <td
                        key={item.id}
                        className="p-3 text-center text-xs text-text-primary"
                      >
                        {item.sellerNickname}
                        <br />⭐ {item.sellerTrustScore}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </>
  );
}
