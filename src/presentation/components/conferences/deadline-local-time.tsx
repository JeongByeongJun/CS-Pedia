"use client";

import { useState, useEffect } from "react";
import { formatDeadlineLocal } from "@/shared/utils/date";

export function DeadlineLocalTime({ deadline, timezone }: { deadline: Date | string; timezone: string }) {
  const [local, setLocal] = useState<{ dateTime: string; tzAbbr: string } | null>(null);

  useEffect(() => {
    setLocal(formatDeadlineLocal(deadline, timezone));
  }, [deadline, timezone]);

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
