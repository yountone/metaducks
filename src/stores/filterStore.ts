import { create } from "zustand";
import type { SeatGrade, TransferType } from "@/types";

export type SortBy = "latest" | "price_asc" | "price_desc" | "popular";

interface FilterState {
  eventId: string | null;
  showDate: string | null;
  seatGrade: SeatGrade | null;
  position: string | null;
  transferType: TransferType | null;
  quantity: number | null;
  consecutiveOnly: boolean;
  underFaceValueOnly: boolean;
  searchQuery: string;
  sortBy: SortBy;
  setEventId: (id: string | null) => void;
  setShowDate: (date: string | null) => void;
  setSeatGrade: (grade: SeatGrade | null) => void;
  setPosition: (position: string | null) => void;
  setTransferType: (type: TransferType | null) => void;
  setQuantity: (qty: number | null) => void;
  setConsecutiveOnly: (v: boolean) => void;
  setUnderFaceValueOnly: (v: boolean) => void;
  setSearchQuery: (q: string) => void;
  setSortBy: (sort: SortBy) => void;
  resetFilters: () => void;
}

const initialState = {
  eventId: null,
  showDate: null,
  seatGrade: null,
  position: null,
  transferType: null,
  quantity: null,
  consecutiveOnly: false,
  underFaceValueOnly: false,
  searchQuery: "",
  sortBy: "latest" as SortBy,
};

export const useFilterStore = create<FilterState>((set) => ({
  ...initialState,
  setEventId: (id) => set({ eventId: id }),
  setShowDate: (date) => set({ showDate: date }),
  setSeatGrade: (grade) => set({ seatGrade: grade }),
  setPosition: (position) => set({ position }),
  setTransferType: (type) => set({ transferType: type }),
  setQuantity: (qty) => set({ quantity: qty }),
  setConsecutiveOnly: (v) => set({ consecutiveOnly: v }),
  setUnderFaceValueOnly: (v) => set({ underFaceValueOnly: v }),
  setSearchQuery: (q) => set({ searchQuery: q }),
  setSortBy: (sort) => set({ sortBy: sort }),
  resetFilters: () => set(initialState),
}));
