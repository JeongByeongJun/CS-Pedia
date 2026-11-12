"use client";

import { useMemo } from "react";
import { getDdayStatus, formatDday } from "@/domain/value-objects/d-day";
import { deadlineToUTC } from "@/shared/utils/date";
import { useLocale } from "@/presentation/hooks/use-locale";

import styles from "./conference-index.module.css";

interface DeadlineBadgeProps {
  ddays: number | null;
  /** 실시간 재계산용 (optional) — 전달하면 ddays 대신 클라이언트 시간 기준으로 계산 */
  deadline?: Date | string | null;
  timezone?: string | null;
}

export function DeadlineBadge({ ddays, deadline, timezone }: DeadlineBadgeProps) {
  const { isKorean } = useLocale();

  const resolvedDdays = useMemo(() => {
    if (deadline) {
      const utc = deadlineToUTC(deadline, timezone ?? null);
      // 날짜(일) 단위로만 비교 — 시간 무시
      const deadlineDate = new Date(utc.getFullYear(), utc.getMonth(), utc.getDate());
      const now = new Date();
      const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const diff = deadlineDate.getTime() - todayDate.getTime();
      return Math.round(diff / (1000 * 60 * 60 * 24));
    }
    return ddays;
  }, [ddays, deadline, timezone]);

  if (resolvedDdays === null || resolvedDdays === undefined) return null;

  const status = getDdayStatus(resolvedDdays);
  const text = formatDday(resolvedDdays, isKorean);


  return (
    <span
      className={`${styles.dday} ${resolvedDdays >= 0 && resolvedDdays <= 3 ? styles.ddayCritical : status === "urgent" || status === "soon" ? styles.ddayUrgent : ""} ${status === "passed" ? styles.ddayPassed : ""}`}
    >
      {text}
    </span>
  );
}
