export default function AnimeCardSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-zinc-900 animate-pulse">
      <div className="relative h-64 overflow-hidden bg-zinc-800" />
      <div className="relative p-4 space-y-3">
        <div className="h-4 bg-zinc-800 rounded w-3/4" />
        <div className="h-4 bg-zinc-800 rounded w-1/2" />
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 bg-zinc-800 rounded w-16" />
          <div className="h-6 bg-zinc-800 rounded w-12" />
        </div>
      </div>
    </div>
  );
}
