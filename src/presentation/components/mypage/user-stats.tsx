import type { ConferenceWithRelations } from "@/domain/repositories/conference-repository";

interface UserStatsProps {
  bookmarkedConferences: ConferenceWithRelations[];
}

export function UserStats({ bookmarkedConferences }: UserStatsProps) {
  const totalBookmarks = bookmarkedConferences.length;
  const upcomingDeadlines = bookmarkedConferences.filter(
    (c) => c.daysUntilDeadline != null && c.daysUntilDeadline >= 0,
  ).length;

  // Most common field
  const fieldCounts = new Map<string, number>();
  for (const c of bookmarkedConferences) {
    fieldCounts.set(c.field, (fieldCounts.get(c.field) ?? 0) + 1);
  }
  const topField =
    [...fieldCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";

  return (
    <div className="grid grid-cols-3 gap-3">
      <StatCard value={totalBookmarks} label="북마크 학회" />
      <StatCard value={upcomingDeadlines} label="다가오는 마감" />
      <StatCard value={topField} label="주요 관심 분야" />
    </div>
  );
}

function StatCard({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-100 text-center">
      <div className="text-xl font-bold text-zinc-900">{value}</div>
      <div className="text-xs text-zinc-500 mt-1">{label}</div>
    </div>
  );
}
