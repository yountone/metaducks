import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create demo user
  const user = await prisma.user.upsert({
    where: { email: "demo@metaducks.io" },
    update: {},
    create: {
      email: "demo@metaducks.io",
      name: "데모 사용자",
      nickname: "뮤덕이",
      isVerified: true,
      trustScore: 4.8,
    },
  });

  const seller2 = await prisma.user.upsert({
    where: { email: "seller2@metaducks.io" },
    update: {},
    create: {
      email: "seller2@metaducks.io",
      name: "판매자2",
      nickname: "티켓마스터",
      isVerified: true,
      trustScore: 4.5,
    },
  });

  // Create events
  const deathNote = await prisma.event.upsert({
    where: { id: "evt-deathnote-2025" },
    update: {},
    create: {
      id: "evt-deathnote-2025",
      title: "데스노트 2025 - 서울",
      category: "MUSICAL",
      venue: "블루스퀘어 신한카드홀",
      startDate: new Date("2026-03-01"),
      endDate: new Date("2026-06-30"),
      cast: ["김준수", "고은성", "한지상"],
    },
  });

  const lesMis = await prisma.event.upsert({
    where: { id: "evt-lesmis-2025" },
    update: {},
    create: {
      id: "evt-lesmis-2025",
      title: "레미제라블 - 서울",
      category: "MUSICAL",
      venue: "예술의전당 오페라극장",
      startDate: new Date("2026-04-01"),
      endDate: new Date("2026-08-31"),
      cast: ["홍광호", "양준모", "정선아"],
    },
  });

  const wicked = await prisma.event.upsert({
    where: { id: "evt-wicked-2025" },
    update: {},
    create: {
      id: "evt-wicked-2025",
      title: "위키드 - 서울",
      category: "MUSICAL",
      venue: "샤롯데씨어터",
      startDate: new Date("2026-05-01"),
      endDate: new Date("2026-09-30"),
      cast: ["옥주현", "정선아", "박혜나"],
    },
  });

  // Create sample tickets
  const ticketsData = [
    {
      sellerId: user.id,
      eventId: deathNote.id,
      title: "데스노트 4/18 오후 C구역",
      originalPrice: 80000,
      askingPrice: 80000,
      quantity: 1,
      section: "C",
      row: "10",
      floor: "2층(2F)",
      seatGrade: "A",
      showDate: new Date("2026-04-18T14:00:00"),
      cast: "김준수 고은성",
      transferType: "PIN",
      isUnderFaceValue: true,
      isVerified: true,
    },
    {
      sellerId: seller2.id,
      eventId: deathNote.id,
      title: "데스노트 4/11 A구역 10열",
      originalPrice: 80000,
      askingPrice: 100000,
      quantity: 1,
      section: "A",
      row: "10",
      floor: "2층(2F)",
      seatGrade: "A",
      position: "왼쪽",
      showDate: new Date("2026-04-11T19:00:00"),
      transferType: "PIN",
      isVerified: true,
    },
    {
      sellerId: user.id,
      eventId: deathNote.id,
      title: "데스노트 4/1 A구역 12열 연석",
      originalPrice: 80000,
      askingPrice: 110000,
      quantity: 2,
      section: "A",
      row: "12",
      floor: "2층(2F)",
      seatGrade: "A",
      showDate: new Date("2026-04-01T14:00:00"),
      cast: "고은성 김준수",
      transferType: "DIRECT",
      isConsecutive: true,
    },
    {
      sellerId: seller2.id,
      eventId: lesMis.id,
      title: "레미제라블 5/10 VIP석",
      originalPrice: 170000,
      askingPrice: 150000,
      quantity: 1,
      section: "A",
      row: "3",
      floor: "1층(1F)",
      seatGrade: "VIP",
      showDate: new Date("2026-05-10T19:30:00"),
      cast: "홍광호",
      transferType: "PIN",
      isUnderFaceValue: true,
      isVerified: true,
    },
    {
      sellerId: user.id,
      eventId: lesMis.id,
      title: "레미제라블 5/15 R석 2매",
      originalPrice: 140000,
      askingPrice: 140000,
      quantity: 2,
      section: "B",
      row: "7",
      floor: "1층(1F)",
      seatGrade: "R",
      showDate: new Date("2026-05-15T14:00:00"),
      transferType: "BOTH",
      isConsecutive: true,
      isUnderFaceValue: true,
    },
    {
      sellerId: seller2.id,
      eventId: wicked.id,
      title: "위키드 6/20 S석",
      originalPrice: 100000,
      askingPrice: 120000,
      quantity: 1,
      section: "C",
      row: "5",
      floor: "2층(2F)",
      seatGrade: "S",
      showDate: new Date("2026-06-20T19:30:00"),
      cast: "옥주현",
      transferType: "PIN",
      isVerified: true,
    },
  ];

  for (const data of ticketsData) {
    await prisma.ticket.create({ data });
  }

  // Create sample community posts
  const postsData = [
    {
      authorId: user.id,
      title: "데스노트 4월 공연 후기",
      content: "김준수 라이트 역할 정말 압도적이었습니다. 특히 2막 독백 장면은 소름이 돋을 정도로 몰입감 있었어요. 고은성 L도 완벽한 케미!",
      category: "REVIEW",
    },
    {
      authorId: seller2.id,
      title: "레미제라블 동행 구합니다 (5/10)",
      content: "5월 10일 레미제라블 같이 보실 분 구합니다. VIP석 근처로 예약했습니다. 공연 후 간단하게 후기 공유하고 싶어요!",
      category: "COMPANION",
    },
    {
      authorId: user.id,
      title: "PIN 거래 안전하게 하는 팁",
      content: "PIN 거래 시 주의할 점을 정리해봤습니다.\n1. 판매자 신뢰도 확인\n2. 입장 안심 배지 여부 확인\n3. 공연 전 여유있게 거래 완료\n4. 스크린샷 보관",
      category: "INFO",
    },
  ];

  for (const data of postsData) {
    await prisma.post.create({ data });
  }

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
