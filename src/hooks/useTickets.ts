"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useFilterStore } from "@/stores/filterStore";
import type { TicketListItem, TicketDetail } from "@/types";

interface TicketListResponse {
  items: TicketListItem[];
  nextCursor?: string;
}

export function useTickets() {
  const {
    eventId,
    showDate,
    seatGrade,
    transferType,
    consecutiveOnly,
    underFaceValueOnly,
    searchQuery,
    sortBy,
  } = useFilterStore();

  return useInfiniteQuery<TicketListResponse>({
    queryKey: [
      "tickets",
      eventId,
      showDate,
      seatGrade,
      transferType,
      consecutiveOnly,
      underFaceValueOnly,
      searchQuery,
      sortBy,
    ],
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams();
      if (eventId) params.set("eventId", eventId);
      if (showDate) params.set("showDate", showDate);
      if (seatGrade) params.set("seatGrade", seatGrade);
      if (transferType) params.set("transferType", transferType);
      if (consecutiveOnly) params.set("consecutiveOnly", "true");
      if (underFaceValueOnly) params.set("underFaceValueOnly", "true");
      if (searchQuery) params.set("query", searchQuery);
      if (sortBy) params.set("sort", sortBy);
      if (pageParam) params.set("cursor", pageParam as string);

      const res = await fetch(`/api/tickets?${params}`);
      if (!res.ok) throw new Error("티켓 목록을 불러올 수 없습니다");
      return res.json();
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

export function useTicketDetail(id: string) {
  return useQuery<TicketDetail>({
    queryKey: ["ticket", id],
    queryFn: async () => {
      const res = await fetch(`/api/tickets/${id}`);
      if (!res.ok) throw new Error("티켓을 찾을 수 없습니다");
      return res.json();
    },
    enabled: !!id,
  });
}
