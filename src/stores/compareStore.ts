import { create } from "zustand";
import type { TicketListItem } from "@/types";

interface CompareState {
  items: TicketListItem[];
  isOpen: boolean;
  addItem: (item: TicketListItem) => void;
  removeItem: (id: string) => void;
  toggleItem: (item: TicketListItem) => void;
  hasItem: (id: string) => boolean;
  clear: () => void;
  setOpen: (open: boolean) => void;
}

export const useCompareStore = create<CompareState>((set, get) => ({
  items: [],
  isOpen: false,
  addItem: (item) =>
    set((state) => {
      if (state.items.length >= 5) return state;
      if (state.items.some((i) => i.id === item.id)) return state;
      return { items: [...state.items, item] };
    }),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  toggleItem: (item) => {
    const has = get().items.some((i) => i.id === item.id);
    if (has) {
      get().removeItem(item.id);
    } else {
      get().addItem(item);
    }
  },
  hasItem: (id) => get().items.some((i) => i.id === id),
  clear: () => set({ items: [] }),
  setOpen: (open) => set({ isOpen: open }),
}));
