import { Loader2 } from "lucide-react";

export default function TicketsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="h-7 w-32 bg-surface rounded animate-pulse mb-6" />
      <div className="flex gap-6">
        <div className="hidden lg:block w-56 shrink-0 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-10 bg-surface rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="flex-1 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-32 bg-surface rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
