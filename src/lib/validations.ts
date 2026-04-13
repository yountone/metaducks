import { z } from "zod";

// Ticket
export const createTicketSchema = z.object({
  eventId: z.string().min(1, "이벤트를 선택해주세요"),
  title: z.string().min(1, "제목을 입력해주세요"),
  originalPrice: z.number().int().positive("원래 가격을 입력해주세요"),
  askingPrice: z.number().int().positive("판매 가격을 입력해주세요"),
  quantity: z.number().int().min(1).max(10),
  section: z.string().min(1, "구역을 입력해주세요"),
  row: z.string().min(1, "열을 입력해주세요"),
  seatNumber: z.string().optional(),
  floor: z.string().min(1, "층을 입력해주세요"),
  seatGrade: z.enum(["VIP", "R", "S", "A", "B"]),
  position: z.string().optional(),
  showDate: z.string().min(1, "공연 일시를 입력해주세요"),
  cast: z.string().optional(),
  description: z.string().optional(),
  imageUrls: z.array(z.string()).default([]),
  transferType: z.enum(["PIN", "DIRECT", "BOTH"]),
  isConsecutive: z.boolean().default(false),
});

export const updateTicketSchema = createTicketSchema.partial();

export const ticketFilterSchema = z.object({
  eventId: z.string().optional(),
  showDate: z.string().optional(),
  seatGrade: z.string().optional(),
  transferType: z.string().optional(),
  consecutiveOnly: z
    .string()
    .transform((v) => v === "true")
    .optional(),
  underFaceValueOnly: z
    .string()
    .transform((v) => v === "true")
    .optional(),
  query: z.string().optional(),
  sort: z.enum(["latest", "price_asc", "price_desc", "popular"]).default("latest"),
  cursor: z.string().optional(),
  limit: z.coerce.number().default(20),
});

// Transaction
export const createTransactionSchema = z.object({
  ticketId: z.string().min(1),
  paymentMethod: z.enum(["XPASS", "USDT", "USDC", "CARD"]),
  txHash: z.string().optional(),
  stripeSessionId: z.string().optional(),
});

// Community
export const createPostSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요").max(100),
  content: z.string().min(1, "내용을 입력해주세요"),
  category: z.enum(["FREE", "REVIEW", "INFO", "COMPANION", "QUESTION"]),
  imageUrls: z.array(z.string()).default([]),
});

export const createCommentSchema = z.object({
  content: z.string().min(1, "댓글을 입력해주세요"),
  parentId: z.string().optional(),
});

// Membership
export const createMembershipSchema = z.object({
  plan: z.enum(["BASIC", "STANDARD", "PREMIUM"]),
  paymentMethod: z.enum(["XPASS", "USDT", "USDC", "CARD"]).optional(),
});
