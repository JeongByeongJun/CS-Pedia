"use client";

import { useMemo } from "react";
import { getDdayStatus, formatDday } from "@/domain/value-objects/d-day";
import { deadlineToUTC } from "@/shared/utils/date";
import { useLocale } from "@/presentation/hooks/use-locale";

interface DeadlineBadgeProps {
  ddays: number | null;
  /** 실시간 재계산용 (optional) — 전달하면 ddays 대신 클라이언트 시간 기준으로 계산 */
  deadline?: Date | string | null;
  timezone?: string;
}

export function DeadlineBadge({ ddays, deadline, timezone }: DeadlineBadgeProps) {
  const { isKorean } = useLocale();

  const resolvedDdays = useMemo(() => {
    if (deadline) {
      const utc = deadlineToUTC(deadline, timezone ?? "AoE");
      const diff = utc.getTime() - Date.now();
      if (diff <= 0) return -1;
      return Math.ceil(diff / (1000 * 60 * 60 * 24));
    }
    return ddays;
  }, [ddays, deadline, timezone]);

  if (resolvedDdays === null || resolvedDdays === undefined) return null;

  const status = getDdayStatus(resolvedDdays);
  const text = formatDday(resolvedDdays, isKorean);

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
