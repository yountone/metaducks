"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { formatPrice, formatShowDate } from "@/lib/utils";
import { useCompareStore } from "@/stores/compareStore";
import { ROUTES } from "@/constants";
import type { TicketListItem } from "@/types";

interface TicketCardProps {
  ticket: TicketListItem;
}

export function TicketCard({ ticket }: TicketCardProps) {
  const { toggleItem, hasItem } = useCompareStore();
  const isCompared = hasItem(ticket.id);

  return (
    <div className="border border-border rounded-xl p-4 hover:border-primary/30 transition-colors bg-white">
      <Link href={ROUTES.TICKET_DETAIL(ticket.id)}>
        {/* Show date */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-primary font-medium">
            공연 일시 {formatShowDate(ticket.showDate)}
          </span>
          <div className="flex items-center gap-1.5">
            {ticket.isUnderFaceValue && (
              <Badge variant="underFaceValue">정가 이하</Badge>
            )}
          </div>
        </div>

        {/* Seat info */}
        <h3 className="text-lg font-bold text-text-primary">
          {ticket.section} | {ticket.row}
        </h3>
        <p className="text-xs text-text-secondary mb-1">
          {ticket.seatGrade} | {ticket.floor}
          {ticket.position && ` | ${ticket.position}`}
        </p>

        {/* Cast */}
        {ticket.cast && (
          <p className="text-xs text-text-secondary mb-2">{ticket.cast}</p>
        )}

        {/* Badges & quantity */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1.5">
            <Badge
              variant={ticket.transferType === "PIN" ? "pin" : ticket.transferType === "DIRECT" ? "direct" : "default"}
            >
              {ticket.transferType === "PIN"
                ? "PIN"
                : ticket.transferType === "DIRECT"
                ? "현장"
                : "PIN/현장"}
            </Badge>
            {ticket.isVerified && (
              <Badge variant="verified">입장안심</Badge>
            )}
          </div>

          <div className="text-right">
            <span className="text-xs text-text-secondary">
              수량 {ticket.quantity}매
              {ticket.isConsecutive && ticket.quantity > 1 && "(연석)"}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between mt-2 pt-2 border-t border-border/50">
          <span className="text-xs text-text-secondary">한 매</span>
          <div className="text-right">
            {ticket.askingPrice !== ticket.originalPrice && (
              <span className="text-xs text-text-secondary line-through mr-1">
                {formatPrice(ticket.originalPrice)}
              </span>
            )}
            <span className="text-xl font-bold text-accent-red">
              {formatPrice(ticket.askingPrice)}
            </span>
          </div>
        </div>
      </Link>

      {/* Compare button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleItem(ticket);
        }}
        className={`mt-2 w-full flex items-center justify-center gap-1 py-1.5 text-xs rounded-lg border transition-colors ${
          isCompared
            ? "bg-primary/5 text-primary border-primary/20"
            : "text-text-secondary border-border hover:border-primary/20"
        }`}
      >
        <Check className="w-3 h-3" />
        비교담기
      </button>
    </div>
  );
}
