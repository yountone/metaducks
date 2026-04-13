export const CATEGORIES = [
  { value: "MUSICAL", label: "뮤지컬/연극" },
] as const;

export const SEAT_GRADES = [
  { value: "VIP", label: "VIP석" },
  { value: "R", label: "R석" },
  { value: "S", label: "S석" },
  { value: "A", label: "A석" },
  { value: "B", label: "B석" },
] as const;

export const TRANSFER_TYPES = [
  { value: "PIN", label: "PIN(E-ticket)" },
  { value: "DIRECT", label: "현장" },
  { value: "BOTH", label: "PIN/현장" },
] as const;

export const POST_CATEGORIES = [
  { value: "FREE", label: "자유" },
  { value: "REVIEW", label: "후기" },
  { value: "INFO", label: "정보" },
  { value: "COMPANION", label: "동행" },
  { value: "QUESTION", label: "질문" },
] as const;

export const MEMBERSHIP_PLANS = [
  {
    plan: "BASIC" as const,
    name: "Basic",
    price: 0,
    description: "무료",
    features: ["티켓 검색", "커뮤니티 이용", "월 3건 판매 등록"],
  },
  {
    plan: "STANDARD" as const,
    name: "Standard",
    price: 9900,
    description: "₩9,900/월",
    features: [
      "Basic 혜택 전체",
      "월 무제한 판매 등록",
      "우선 알림",
      "수수료 50% 할인",
    ],
  },
  {
    plan: "PREMIUM" as const,
    name: "Premium",
    price: 19900,
    description: "₩19,900/월",
    features: [
      "Standard 혜택 전체",
      "수수료 면제",
      "프리미엄 배지",
      "전용 고객센터",
      "거래 보험",
    ],
  },
] as const;

export const PAYMENT_TOKENS = [
  { value: "XPASS", label: "XPASS", icon: "🪙" },
  { value: "USDT", label: "USDT", icon: "💲" },
  { value: "USDC", label: "USDC", icon: "💵" },
] as const;

export const BSC_CHAIN_ID = 56;
export const BSC_TESTNET_CHAIN_ID = 97;

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  ONBOARDING: "/onboarding",
  TICKETS: "/tickets",
  TICKET_DETAIL: (id: string) => `/tickets/${id}`,
  TICKET_NEW: "/tickets/new",
  COMMUNITY: "/community",
  POST_DETAIL: (id: string) => `/community/${id}`,
  POST_NEW: "/community/new",
  MEMBERSHIP: "/membership",
  MEMBERSHIP_PLANS: "/membership/plans",
  MYPAGE: "/mypage",
  MY_LISTINGS: "/mypage/listings",
  MY_WALLET: "/mypage/wallet",
  MY_SETTINGS: "/mypage/settings",
} as const;
