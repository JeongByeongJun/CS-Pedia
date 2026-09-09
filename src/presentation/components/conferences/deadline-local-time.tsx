"use client";

import { useSyncExternalStore } from "react";
import { formatDeadlineLocal, isKnownDeadlineTimezone } from "@/shared/utils/date";
import { useLocale } from "@/presentation/hooks/use-locale";

export function DeadlineLocalTime({ deadline, timezone }: { deadline: Date | string; timezone: string | null }) {
  const { isKorean } = useLocale();
  const isHydrated = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const hasKnownTimezone = isKnownDeadlineTimezone(timezone);
  const local = isHydrated && hasKnownTimezone ? formatDeadlineLocal(deadline, timezone) : null;

  if (!hasKnownTimezone) {
    const d = typeof deadline === "string" ? new Date(deadline) : deadline;
    return <span>{d.toISOString().split("T")[0]} ({isKorean ? "시간대 미공개" : "timezone TBA"})</span>;
  }

  if (!local) {
    const d = typeof deadline === "string" ? new Date(deadline) : deadline;
    return <span>{d.toISOString().split("T")[0]}</span>;
  }

  return (
    <span>
      {local.dateTime} <span className="font-bold">{local.tzAbbr}</span>
    </span>
  );
}

function subscribeToHydration() {
  return () => {};
}
