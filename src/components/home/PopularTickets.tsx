import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { formatPrice, formatShowDate } from "@/lib/utils";
import { ROUTES } from "@/constants";

const SAMPLE_TICKETS = [
  {
    id: "1",
    eventTitle: "데스노트 2025 - 서울",
    showDate: "2026-04-18T14:00:00",
    section: "C구역",
    row: "10열",
    floor: "2층(2F)",
    seatGrade: "A",
    transferType: "PIN",
    quantity: 1,
    originalPrice: 80000,
    askingPrice: 80000,
    isUnderFaceValue: true,
  },
  {
    id: "2",
    eventTitle: "위키드 - 서울",
    showDate: "2026-04-20T19:00:00",
    section: "A구역",
    row: "5열",
    floor: "1층(1F)",
    seatGrade: "R",
    transferType: "PIN",
    quantity: 2,
    originalPrice: 140000,
    askingPrice: 130000,
    isUnderFaceValue: true,
  },
  {
    id: "3",
    eventTitle: "레미제라블 - 서울",
    showDate: "2026-05-01T14:00:00",
    section: "B구역",
    row: "3열",
    floor: "1층(1F)",
    seatGrade: "S",
    transferType: "DIRECT",
    quantity: 1,
    originalPrice: 120000,
    askingPrice: 110000,
    isUnderFaceValue: true,
  },
  {
    id: "4",
    eventTitle: "시카고 - 서울",
    showDate: "2026-04-25T19:30:00",
    section: "VIP구역",
    row: "2열",
    floor: "1층(1F)",
    seatGrade: "VIP",
    transferType: "PIN",
    quantity: 1,
    originalPrice: 170000,
    askingPrice: 180000,
    isUnderFaceValue: false,
  },
];

export function PopularTickets() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold text-text-primary mb-1">
        오늘의 <span className="text-primary">인기 티켓</span>
      </h2>
      <p className="text-sm text-text-secondary mb-6">
        지금 가장 많이 찾는 뮤지컬 티켓
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {SAMPLE_TICKETS.map((ticket) => (
          <Link
            key={ticket.id}
            href={ROUTES.TICKET_DETAIL(ticket.id)}
            className="flex items-start gap-4 p-4 bg-white border border-border rounded-xl hover:border-primary/30 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-primary font-medium">
                  공연 일시 {formatShowDate(ticket.showDate)}
                </span>
                {ticket.isUnderFaceValue && (
                  <Badge variant="underFaceValue">정가 이하</Badge>
                )}
              </div>

              <h3 className="font-bold text-text-primary mb-0.5">
                {ticket.section} | {ticket.row}
              </h3>
              <p className="text-xs text-text-secondary mb-2">
                {ticket.seatGrade} | {ticket.floor}
              </p>

              <div className="flex items-center gap-2">
                <Badge variant={ticket.transferType === "PIN" ? "pin" : "direct"}>
                  {ticket.transferType === "PIN" ? "PIN" : "현장"}
                </Badge>
                <span className="text-xs text-text-secondary">
                  수량 {ticket.quantity}매
                  {ticket.quantity > 1 && "(연석)"}
                </span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <p className="text-xs text-text-secondary">한 매</p>
              <p className="text-lg font-bold text-accent-red">
                {formatPrice(ticket.askingPrice)}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center mt-6">
        <Link
          href={ROUTES.TICKETS}
          className="inline-flex items-center text-sm text-primary font-medium hover:underline"
        >
          모든 티켓 보기 →
        </Link>
      </div>
    </section>
  );
}
