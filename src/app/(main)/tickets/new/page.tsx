"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { SEAT_GRADES, TRANSFER_TYPES } from "@/constants";
import { useTranslation } from "@/lib/i18n";

const SAMPLE_EVENTS = [
  { id: "ev1", title: "데스노트 2025 - 서울", venue: "블루스퀘어 신한카드홀" },
  { id: "ev2", title: "위키드 - 서울", venue: "충무아트센터" },
  { id: "ev3", title: "레미제라블 - 서울", venue: "블루스퀘어 신한카드홀" },
  { id: "ev4", title: "시카고 - 서울", venue: "디큐브 아트센터" },
  { id: "ev5", title: "킹키부츠 - 서울", venue: "광림아트센터 BBCH홀" },
];

export default function TicketNewPage() {
  const { t } = useTranslation();
  const STEPS = [t("ticketNew.step1"), t("ticketNew.step2"), t("ticketNew.step3"), t("ticketNew.step4")];
  const [step, setStep] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    showDate: "",
    showTime: "",
    section: "",
    row: "",
    seatNumber: "",
    floor: "",
    seatGrade: "A",
    cast: "",
    transferType: "PIN",
    quantity: 1,
    originalPrice: 0,
    askingPrice: 0,
    description: "",
    isConsecutive: false,
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-text-primary mb-6">{t("ticketNew.title")}</h1>

      {/* Progress */}
      <div className="flex items-center gap-1 mb-8">
        {STEPS.map((label, i) => (
          <div key={label} className="flex-1">
            <div
              className={`h-1 rounded-full mb-1 ${
                i <= step ? "bg-primary" : "bg-border"
              }`}
            />
            <p
              className={`text-xs text-center ${
                i <= step ? "text-primary font-medium" : "text-text-secondary"
              }`}
            >
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Step 0: Event selection */}
      {step === 0 && (
        <div className="space-y-3">
          <h2 className="text-base font-medium text-text-primary mb-4">
            {t("ticketNew.whichShow")}
          </h2>
          {SAMPLE_EVENTS.map((event) => (
            <Card
              key={event.id}
              onClick={() => setSelectedEvent(event.id)}
              className={
                selectedEvent === event.id
                  ? "border-primary bg-primary-light/30"
                  : ""
              }
            >
              <p className="font-medium text-text-primary">{event.title}</p>
              <p className="text-xs text-text-secondary">{event.venue}</p>
            </Card>
          ))}
          <Button
            className="w-full mt-4"
            size="lg"
            onClick={nextStep}
            disabled={!selectedEvent}
          >
            {t("ticketNew.next")}
          </Button>
        </div>
      )}

      {/* Step 1: Seat info */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-base font-medium text-text-primary mb-4">
            {t("ticketNew.seatInfo")}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label={t("ticketNew.showDate")}
              type="date"
              value={formData.showDate}
              onChange={(e) =>
                setFormData({ ...formData, showDate: e.target.value })
              }
            />
            <Input
              label={t("ticketNew.showTime")}
              type="time"
              value={formData.showTime}
              onChange={(e) =>
                setFormData({ ...formData, showTime: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label={t("ticketNew.section")}
              placeholder={t("ticketNew.sectionPlaceholder")}
              value={formData.section}
              onChange={(e) =>
                setFormData({ ...formData, section: e.target.value })
              }
            />
            <Input
              label={t("ticketNew.row")}
              placeholder={t("ticketNew.rowPlaceholder")}
              value={formData.row}
              onChange={(e) =>
                setFormData({ ...formData, row: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label={t("ticketNew.seatNo")}
              placeholder={t("ticketNew.seatNoPlaceholder")}
              value={formData.seatNumber}
              onChange={(e) =>
                setFormData({ ...formData, seatNumber: e.target.value })
              }
            />
            <Input
              label={t("ticketNew.floor")}
              placeholder={t("ticketNew.floorPlaceholder")}
              value={formData.floor}
              onChange={(e) =>
                setFormData({ ...formData, floor: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              {t("ticketNew.grade")}
            </label>
            <select
              value={formData.seatGrade}
              onChange={(e) =>
                setFormData({ ...formData, seatGrade: e.target.value })
              }
              className="w-full h-10 px-3 text-sm border border-border rounded-lg bg-white"
            >
              {SEAT_GRADES.map((g) => (
                <option key={g.value} value={g.value}>
                  {g.label}
                </option>
              ))}
            </select>
          </div>
          <Input
            label={t("ticketNew.cast")}
            placeholder={t("ticketNew.castPlaceholder")}
            value={formData.cast}
            onChange={(e) =>
              setFormData({ ...formData, cast: e.target.value })
            }
          />
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="lg" className="flex-1" onClick={prevStep}>
              {t("ticketNew.prev")}
            </Button>
            <Button size="lg" className="flex-1" onClick={nextStep}>
              {t("ticketNew.next")}
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Price & trade */}
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-base font-medium text-text-primary mb-4">
            {t("ticketNew.priceInfo")}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label={t("ticketNew.origPrice")}
              type="number"
              placeholder="80000"
              value={formData.originalPrice || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  originalPrice: Number(e.target.value),
                })
              }
            />
            <Input
              label={t("ticketNew.askPrice")}
              type="number"
              placeholder="80000"
              value={formData.askingPrice || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  askingPrice: Number(e.target.value),
                })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                {t("ticket.quantity")}
              </label>
              <select
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: Number(e.target.value) })
                }
                className="w-full h-10 px-3 text-sm border border-border rounded-lg bg-white"
              >
                {[1, 2, 3, 4].map((q) => (
                  <option key={q} value={q}>
                    {q}{t("ticket.unit")}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                {t("ticketNew.tradeMethod")}
              </label>
              <select
                value={formData.transferType}
                onChange={(e) =>
                  setFormData({ ...formData, transferType: e.target.value })
                }
                className="w-full h-10 px-3 text-sm border border-border rounded-lg bg-white"
              >
                {TRANSFER_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {formData.quantity > 1 && (
            <label className="flex items-center gap-2 text-sm text-text-primary cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isConsecutive}
                onChange={(e) =>
                  setFormData({ ...formData, isConsecutive: e.target.checked })
                }
                className="w-4 h-4 rounded border-border text-primary"
              />
              {t("ticketNew.isConsecutive")}
            </label>
          )}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              {t("ticketNew.desc")}
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder={t("ticketNew.descPlaceholder")}
              rows={3}
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-white resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="lg" className="flex-1" onClick={prevStep}>
              {t("ticketNew.prev")}
            </Button>
            <Button
              size="lg"
              className="flex-1"
              onClick={async () => {
                try {
                  const event = SAMPLE_EVENTS.find(
                    (e) => e.id === selectedEvent
                  );
                  const showDateISO = formData.showDate && formData.showTime
                    ? new Date(`${formData.showDate}T${formData.showTime}`).toISOString()
                    : new Date(formData.showDate).toISOString();
                  const res = await fetch("/api/tickets", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      eventId: selectedEvent,
                      title: `${event?.title || "공연"} - ${formData.section} ${formData.row}`,
                      originalPrice: formData.originalPrice,
                      askingPrice: formData.askingPrice,
                      quantity: formData.quantity,
                      section: formData.section,
                      row: formData.row,
                      seatNumber: formData.seatNumber || undefined,
                      floor: formData.floor,
                      seatGrade: formData.seatGrade,
                      showDate: showDateISO,
                      cast: formData.cast || undefined,
                      description: formData.description || undefined,
                      transferType: formData.transferType,
                      isConsecutive: formData.isConsecutive,
                    }),
                  });
                  if (!res.ok) {
                    const err = await res.json();
                    alert(err.error || t("ticketNew.submitFail"));
                    return;
                  }
                  nextStep();
                } catch {
                  alert(t("ticketNew.submitError"));
                }
              }}
            >
              {t("ticketNew.submit")}
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Complete */}
      {step === 3 && (
        <div className="text-center py-12">
          <span className="text-6xl">🎫</span>
          <h2 className="text-2xl font-bold text-text-primary mt-4 mb-2">
            {t("ticketNew.done")}
          </h2>
          <p className="text-sm text-text-secondary mb-8 whitespace-pre-line">
            {t("ticketNew.doneDesc")}
          </p>
          <div className="flex gap-2 max-w-sm mx-auto">
            <Button variant="outline" size="lg" className="flex-1" asChild>
              <a href="/tickets">{t("ticketNew.viewList")}</a>
            </Button>
            <Button size="lg" className="flex-1" asChild>
              <a href="/mypage/listings">{t("ticketNew.myListings")}</a>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
