"use client";

import { Button } from "@/components/ui/Button";

export default function TicketsError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <span className="text-5xl">😢</span>
      <h2 className="text-lg font-bold text-text-primary mt-4 mb-2">
        오류가 발생했습니다
      </h2>
      <p className="text-sm text-text-secondary mb-6">
        티켓 목록을 불러오는 중 문제가 생겼습니다
      </p>
      <Button onClick={reset}>다시 시도</Button>
    </div>
  );
}
