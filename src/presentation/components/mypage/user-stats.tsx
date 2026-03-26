import type { ConferenceWithRelations } from "@/domain/repositories/conference-repository";

interface UserStatsProps {
  bookmarkedConferences: ConferenceWithRelations[];
  isKorean?: boolean;
}

export function UserStats({ bookmarkedConferences, isKorean = true }: UserStatsProps) {
  const totalBookmarks = bookmarkedConferences.length;
  const upcomingDeadlines = bookmarkedConferences.filter(
    (c) => c.daysUntilDeadline != null && c.daysUntilDeadline >= 0,
  ).length;

  const fieldCounts = new Map<string, number>();
  for (const c of bookmarkedConferences) {
    fieldCounts.set(c.field, (fieldCounts.get(c.field) ?? 0) + 1);
  }
  const topField =
    [...fieldCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—";

  return (
    <div className="grid grid-cols-3 gap-3">
      <StatCard
        value={totalBookmarks}
        label={isKorean ? "북마크" : "Bookmarked"}
        accentColor="#818cf8"
      />
      <StatCard
        value={upcomingDeadlines}
        label={isKorean ? "다가오는 마감" : "Upcoming"}
        accentColor="#f59e0b"
      />
      <StatCard
        value={topField}
        label={isKorean ? "주요 분야" : "Top Field"}
        accentColor="#a78bfa"
      />
    </div>
  );
}

function StatCard({
  value,
  label,
  accentColor,
}: {
  value: number | string;
  label: string;
  accentColor: string;
}) {
  return (
    <div
      style={{
        padding: "16px 20px",
        borderRadius: "14px",
        background: "white",
        border: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <div
        className="font-bold"
        style={{
          fontSize: typeof value === "number" ? "26px" : "16px",
          lineHeight: 1.2,
          color: "#18181b",
          fontFamily: "var(--font-geist-mono), monospace",
          letterSpacing: "-0.03em",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </div>
      <div
        className="flex items-center"
        style={{
          marginTop: "8px",
          gap: "6px",
          fontSize: "11px",
          color: "#a1a1aa",
          fontFamily: "var(--font-geist-mono), monospace",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: accentColor,
          }}
        />
        {label}
      </div>
    </div>
  );
}
