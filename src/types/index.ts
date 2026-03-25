export type EventCategory = "MUSICAL";

export type TicketStatus = "ACTIVE" | "RESERVED" | "SOLD" | "EXPIRED";

export type TransferType = "PIN" | "DIRECT" | "BOTH";

export type SeatGrade = "VIP" | "R" | "S" | "A" | "B";

export type PaymentMethod = "XPASS" | "USDT" | "USDC" | "CARD";

export type TransactionStatus =
  | "PENDING"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED";

export type MembershipPlan = "BASIC" | "STANDARD" | "PREMIUM";

export type PostCategory =
  | "FREE"
  | "REVIEW"
  | "INFO"
  | "COMPANION"
  | "QUESTION";

export interface TicketListItem {
  id: string;
  eventTitle: string;
  showDate: string;
  section: string;
  row: string;
  floor: string;
  seatGrade: SeatGrade;
  position?: string;
  cast?: string;
  transferType: TransferType;
  quantity: number;
  isConsecutive: boolean;
  originalPrice: number;
  askingPrice: number;
  isUnderFaceValue: boolean;
  isVerified: boolean;
  sellerNickname: string;
  sellerTrustScore: number;
  createdAt: string;
}

export interface TicketDetail extends TicketListItem {
  seatNumber?: string;
  description?: string;
  imageUrls: string[];
  viewCount: number;
  sellerId: string;
  eventId: string;
}

export interface EventInfo {
  id: string;
  title: string;
  venue: string;
  startDate: string;
  endDate: string;
  imageUrl?: string;
  cast: string[];
}

export interface MembershipInfo {
  plan: MembershipPlan;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface PostListItem {
  id: string;
  title: string;
  category: PostCategory;
  authorNickname: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  imageUrl?: string;
}
