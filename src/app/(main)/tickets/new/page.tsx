"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { SEAT_GRADES, TRANSFER_TYPES } from "@/constants";

const STEPS = ["공연 선택", "좌석 정보", "가격/거래", "완료"];

const SAMPLE_EVENTS = [
  { id: "ev1", title: "데스노트 2025 - 서울", venue: "블루스퀘어 신한카드홀" },
  { id: "ev2", title: "위키드 - 서울", venue: "충무아트센터" },
  { id: "ev3", title: "레미제라블 - 서울", venue: "블루스퀘어 신한카드홀" },
  { id: "ev4", title: "시카고 - 서울", venue: "디큐브 아트센터" },
  { id: "ev5", title: "킹키부츠 - 서울", venue: "광림아트센터 BBCH홀" },
];

export default function TicketNewPage() {
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
      <h1 className="text-xl font-bold text-text-primary mb-6">티켓 판매 등록</h1>

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
            어떤 공연의 티켓인가요?
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
            다음
          </Button>
        </div>
      )}

      {/* Step 1: Seat info */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-base font-medium text-text-primary mb-4">
            좌석 정보를 입력해주세요
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="공연 날짜"
              type="date"
              value={formData.showDate}
              onChange={(e) =>
                setFormData({ ...formData, showDate: e.target.value })
              }
            />
            <Input
              label="공연 시간"
              type="time"
              value={formData.showTime}
              onChange={(e) =>
                setFormData({ ...formData, showTime: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="구역"
              placeholder="예: A구역"
              value={formData.section}
              onChange={(e) =>
                setFormData({ ...formData, section: e.target.value })
              }
            />
            <Input
              label="열"
              placeholder="예: 10열"
              value={formData.row}
              onChange={(e) =>
                setFormData({ ...formData, row: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="좌석 번호 (선택)"
              placeholder="예: 15번"
              value={formData.seatNumber}
              onChange={(e) =>
                setFormData({ ...formData, seatNumber: e.target.value })
              }
            />
            <Input
              label="층"
              placeholder="예: 2층(2F)"
              value={formData.floor}
              onChange={(e) =>
                setFormData({ ...formData, floor: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              등급
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
            label="캐스트 (선택)"
            placeholder="예: 고은성 김준수"
            value={formData.cast}
            onChange={(e) =>
              setFormData({ ...formData, cast: e.target.value })
            }
          />
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="lg" className="flex-1" onClick={prevStep}>
              이전
            </Button>
            <Button size="lg" className="flex-1" onClick={nextStep}>
              다음
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Price & trade */}
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-base font-medium text-text-primary mb-4">
            가격과 거래 방식을 설정해주세요
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="원래 가격 (원)"
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
              label="판매 가격 (원)"
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
                수량
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
                    {q}매
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">
                거래 방식
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
              연석입니다
            </label>
          )}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              설명 (선택)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="추가 설명을 입력해주세요"
              rows={3}
              className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-white resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="lg" className="flex-1" onClick={prevStep}>
              이전
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
                    alert(err.error || "등록에 실패했습니다");
                    return;
                  }
                  nextStep();
                } catch {
                  alert("등록 중 오류가 발생했습니다");
                }
              }}
            >
              등록하기
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Complete */}
      {step === 3 && (
        <div className="text-center py-12">
          <span className="text-6xl">🎫</span>
          <h2 className="text-2xl font-bold text-text-primary mt-4 mb-2">
            등록 완료!
          </h2>
          <p className="text-sm text-text-secondary mb-8">
            티켓이 성공적으로 등록되었습니다.
            <br />
            구매자가 나타나면 알림을 보내드릴게요.
          </p>
          <div className="flex gap-2 max-w-sm mx-auto">
            <Button variant="outline" size="lg" className="flex-1" asChild>
              <a href="/tickets">목록 보기</a>
            </Button>
            <Button size="lg" className="flex-1" asChild>
              <a href="/mypage/listings">내 판매 목록</a>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
