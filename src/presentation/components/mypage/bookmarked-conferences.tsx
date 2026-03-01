import Link from "next/link";
import type { ConferenceWithRelations } from "@/domain/repositories/conference-repository";
import { FieldBadge } from "@/presentation/components/conferences/field-badge";
import { DeadlineBadge } from "@/presentation/components/conferences/deadline-badge";

interface BookmarkedConferencesProps {
  conferences: ConferenceWithRelations[];
}

export function BookmarkedConferences({
  conferences,
}: BookmarkedConferencesProps) {
  if (conferences.length === 0) {
    return (
      <div className="text-center py-8 text-zinc-400">
        <div className="text-3xl mb-2">📌</div>
        <div className="text-sm">북마크한 학회가 없습니다</div>
        <Link
          href="/"
          className="inline-block mt-3 text-sm text-indigo-600 hover:underline"
        >
          학회 둘러보기 →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {conferences.map((conf) => (
        <Link
          key={conf.id}
          href={`/conferences/${conf.slug}`}
          className="block p-4 rounded-xl border border-zinc-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-zinc-900">
                {conf.acronym}
              </span>
              <FieldBadge field={conf.field} />
              <DeadlineBadge ddays={conf.daysUntilDeadline} />
            </div>
            <span className="text-xs text-zinc-400">→</span>
          </div>
          <div className="text-sm text-zinc-500 mt-1">{conf.nameEn}</div>
          {conf.venue && (
            <div className="text-xs text-zinc-400 mt-1">📍 {conf.venue}</div>
          )}
        </Link>
      ))}
    </div>
  );
}
