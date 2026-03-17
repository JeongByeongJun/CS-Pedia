export default function Loading() {
  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #fafafa 0%, #f0f4ff 50%, #faf0ff 100%)" }}>
      {/* Header skeleton */}
      <div style={{ background: "linear-gradient(180deg, #111118 0%, #18181f 100%)", height: "56px" }} />

      <main className="max-w-6xl mx-auto px-4 py-6 sm:px-6">
        {/* Back link */}
        <div className="h-4 w-24 bg-zinc-100 rounded animate-pulse mb-4" />

        {/* Conference header skeleton */}
        <div className="bg-white rounded-2xl border border-zinc-200/80 p-6 mb-4">
          <div className="h-8 w-48 bg-zinc-100 rounded animate-pulse mb-2" />
          <div className="h-5 w-96 bg-zinc-50 rounded animate-pulse mb-4" />
          <div className="h-4 w-40 bg-zinc-50 rounded animate-pulse" />
        </div>

        {/* Ratings skeleton */}
        <div className="bg-white rounded-2xl border border-zinc-200/80 p-6 mb-4">
          <div className="h-6 w-32 bg-zinc-100 rounded animate-pulse mb-4" />
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-zinc-50 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>

        {/* Deadlines skeleton */}
        <div className="bg-white rounded-2xl border border-zinc-200/80 p-6 mb-4">
          <div className="h-6 w-24 bg-zinc-100 rounded animate-pulse mb-4" />
          <div className="h-14 bg-zinc-50 rounded-xl animate-pulse" />
        </div>
      </main>
    </div>
  );
}
