"use client";

import { use, useState } from "react";
import Link from "next/link";
import { Shield, Flag, ChevronRight, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PaymentModal } from "@/components/payment/PaymentModal";
import { formatPrice, formatShowDate } from "@/lib/utils";
import { useTicketDetail } from "@/hooks/useTickets";
import { useCompareStore } from "@/stores/compareStore";
import { ROUTES } from "@/constants";
import { useTranslation } from "@/lib/i18n";

export default function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: ticket, isLoading, isError } = useTicketDetail(id);
  const [showPayment, setShowPayment] = useState(false);
  const { toggleItem, hasItem } = useCompareStore();
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !ticket) {
    return (
      <div className="text-center py-20">
        <p className="text-text-secondary">{t("ticket.notFound")}</p>
        <Link href={ROUTES.TICKETS} className="text-primary text-sm mt-2 inline-block">
          {t("ticket.backToList")}
        </Link>
      </div>
    );
  }

  const isInCompare = hasItem(ticket.id);

  const handleCompare = () => {
    toggleItem({
      id: ticket.id,
      eventTitle: ticket.eventTitle,
      showDate: ticket.showDate,
      section: ticket.section,
      row: ticket.row,
      floor: ticket.floor,
      seatGrade: ticket.seatGrade as "VIP" | "R" | "S" | "A" | "B",
      position: ticket.position,
      cast: ticket.cast,
      transferType: ticket.transferType as "PIN" | "DIRECT" | "BOTH",
      quantity: ticket.quantity,
      isConsecutive: ticket.isConsecutive,
      originalPrice: ticket.originalPrice,
      askingPrice: ticket.askingPrice,
      isUnderFaceValue: ticket.isUnderFaceValue,
      isVerified: ticket.isVerified,
      sellerNickname: ticket.sellerNickname,
      sellerTrustScore: ticket.sellerTrustScore,
      createdAt: ticket.createdAt,
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-bold text-text-primary">{t("ticket.productInfo")}</h1>
        <span className="text-xs text-text-secondary">
          {t("ticket.productNo")} {ticket.id}
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
                {t("ticket.safeEntry")}
              </div>
            )}
            {ticket.isUnderFaceValue && (
              <Badge variant="underFaceValue">{t("ticket.underFace")}</Badge>
            )}
          </div>
          <button className="flex items-center gap-1 text-xs text-text-secondary hover:text-accent-red">
            <Flag className="w-3 h-3" />
            {t("ticket.report")}
          </button>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-xs text-text-secondary mb-1">
          <span>{t("tickets.title")}</span>
          <ChevronRight className="w-3 h-3" />
          <span>{ticket.eventTitle}</span>
        </div>

        {/* Show date */}
        <p className="text-sm text-text-primary mb-3">
          {t("ticket.showDate")}{" "}
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
          {ticket.position && ` | ${ticket.position}`}
        </p>

        {/* Cast */}
        {ticket.cast && (
          <p className="text-sm text-text-secondary mb-3">{ticket.cast}</p>
        )}

        {/* PIN gift button */}
        {ticket.transferType === "PIN" && (
          <button className="px-3 py-1.5 text-xs border border-border rounded-lg hover:bg-surface transition-colors">
            {t("ticket.pinGift")}
          </button>
        )}
      </Card>

      {/* Transaction info card */}
      <Card className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Transfer type */}
          <div>
            <h3 className="text-sm font-bold text-text-primary mb-3">
              {t("ticket.tradeMethod")}
            </h3>
            <label className="flex items-center gap-2 cursor-pointer">
              <div className="w-4 h-4 rounded-full border-4 border-primary" />
              <span className="text-sm text-text-primary">
                {ticket.transferType === "PIN"
                  ? t("ticket.pin")
                  : ticket.transferType === "DIRECT"
                    ? t("ticket.direct")
                    : t("ticket.pinDirect")}
              </span>
            </label>
            {ticket.transferType === "PIN" && (
              <button className="mt-1 text-xs text-primary hover:underline">
                {t("ticket.pinInfo")}
              </button>
            )}
          </div>

          {/* Right: Price info table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">{t("ticket.hasTicket")}</span>
              <span className="text-sm font-medium text-text-primary">
                {t("ticket.inPossession")}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">{t("ticket.pricePerTicket")}</span>
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
              <span className="text-sm text-text-secondary">{t("ticket.quantity")}</span>
              <span className="text-sm font-medium text-text-primary">
                {ticket.quantity}{t("ticket.unit")}
                {ticket.isConsecutive && `(${t("popular.consecutive")})`}
              </span>
            </div>
            <div className="border-t border-border pt-3 flex items-center justify-between">
              <span className="text-sm font-medium text-text-primary">
                {t("ticket.totalPrice")}
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
            {t("ticket.sellerDesc")}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed">
            {ticket.description}
          </p>
        </Card>
      )}

      {/* Seller info */}
      <Card className="mb-4">
        <h3 className="text-sm font-bold text-text-primary mb-3">{t("ticket.sellerInfo")}</h3>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-primary font-bold">
            {ticket.sellerNickname[0]}
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">
              {ticket.sellerNickname}
            </p>
            <p className="text-xs text-text-secondary">
              {t("ticket.trust")} ⭐ {ticket.sellerTrustScore}
            </p>
          </div>
        </div>
      </Card>

      {/* View count */}
      <div className="text-right mb-4">
        <span className="text-xs text-text-secondary">
          {t("ticket.views")} {ticket.viewCount}
        </span>
      </div>

      {/* Fixed bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 flex items-center gap-3 max-w-3xl mx-auto z-40">
        <Button
          variant="outline"
          size="lg"
          className="flex-shrink-0"
          onClick={handleCompare}
        >
          {isInCompare ? t("ticket.comparing") : t("ticket.addCompare")}
        </Button>
        <Button
          size="lg"
          variant="secondary"
          className="flex-1"
          onClick={() => setShowPayment(true)}
        >
          {t("ticket.buy")}
        </Button>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        amount={ticket.askingPrice * ticket.quantity}
        title={`${ticket.eventTitle} - ${ticket.section} ${ticket.row}`}
        onPaymentSuccess={(txHash, method) => {
          // Create transaction via API
          fetch("/api/transactions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ticketId: ticket.id,
              paymentMethod: method,
              txHash,
            }),
          });
        }}
      />
    </div>
  );
}
