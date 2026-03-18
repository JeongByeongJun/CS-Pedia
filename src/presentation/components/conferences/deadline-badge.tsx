"use client";

import { getDdayStatus, formatDday } from "@/domain/value-objects/d-day";
import { useLocale } from "@/presentation/hooks/use-locale";

export function DeadlineBadge({ ddays }: { ddays: number | null }) {
  const { isKorean } = useLocale();
  if (ddays === null) return null;

  const status = getDdayStatus(ddays);
  const text = formatDday(ddays, isKorean);

  const styles: Record<string, string> = {
    passed: "bg-zinc-100 text-zinc-400 border border-zinc-200",
    urgent: "bg-rose-100 text-rose-700 border border-rose-200",
    soon: "bg-orange-100 text-orange-700 border border-orange-200",
    upcoming: "bg-sky-100 text-sky-700 border border-sky-200",
    far: "bg-zinc-50 text-zinc-500 border border-zinc-200",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${styles[status]}`}
    >
      {text}
    </span>
  );
}
