export default function CommunityLoading() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="h-7 w-24 bg-surface rounded animate-pulse mb-6" />
      <div className="flex gap-2 mb-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-8 w-16 bg-surface rounded-full animate-pulse"
          />
        ))}
      </div>
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-20 bg-surface rounded-xl animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
