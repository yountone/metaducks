"use client";

import { X } from "lucide-react";
import { useCompareStore } from "@/stores/compareStore";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function CompareDrawer() {
  const { items, isOpen, setOpen, removeItem, clear } = useCompareStore();

  if (items.length === 0) return null;

  return (
    <>
      {/* Floating badge */}
      {!isOpen && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-20 right-4 md:bottom-6 z-40 bg-primary text-white px-4 py-2.5 rounded-full shadow-lg hover:bg-primary/90 transition-colors text-sm font-medium"
        >
          상품 비교 {items.length}
        </button>
      )}

      {/* Drawer */}
      {isOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border shadow-2xl rounded-t-2xl max-h-[60vh] overflow-y-auto pb-safe">
          <div className="sticky top-0 bg-white border-b border-border px-4 py-3 flex items-center justify-between">
            <h3 className="font-bold text-text-primary">
              상품 비교 ({items.length}/5)
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={clear}
                className="text-xs text-text-secondary hover:text-accent-red"
              >
                전체 삭제
              </button>
              <button
                onClick={() => setOpen(false)}
                className="p-1 hover:bg-surface rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

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
                    {item.section} | {item.row} · {item.seatGrade} ·{" "}
                    {item.floor}
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
            <Button className="w-full" size="lg">
              비교하기
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
