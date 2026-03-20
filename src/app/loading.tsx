export default function Loading() {
  return (
    <div className="min-h-screen bg-page-gradient">
      {/* Header skeleton */}
      <div className="bg-header-gradient h-[200px]" />

      <main className="max-w-6xl mx-auto px-4 py-4 sm:px-6 sm:py-6">
        {/* Search skeleton */}
        <div className="bg-white rounded-2xl border border-zinc-200/80 p-5 mb-5">
          <div className="h-10 bg-zinc-100 rounded-xl animate-pulse" />
        </div>

        {/* Card skeletons */}
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-zinc-200/80 p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="h-6 w-32 bg-zinc-100 rounded animate-pulse mb-2" />
                  <div className="h-4 w-64 bg-zinc-50 rounded animate-pulse mb-3" />
                  <div className="h-3 w-48 bg-zinc-50 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
