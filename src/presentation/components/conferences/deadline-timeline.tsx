"use client";

import { useMemo } from "react";

interface DeadlineTimelineProps {
  abstractDeadline: Date | null;
  paperDeadline: Date | null;
  notificationDate: Date | null;
}

interface TimelinePoint {
  label: string;
  date: Date;
  dotColor: string;
  activeColor: string;
  isToday?: boolean;
}

function fmtDate(d: Date): string {
  return `${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
}

export function DeadlineTimeline({
  abstractDeadline,
  paperDeadline,
  notificationDate,
}: DeadlineTimelineProps) {
  const { points, todayPercent } = useMemo(() => {
    const candidates: TimelinePoint[] = [];
    if (abstractDeadline)
      candidates.push({ label: "Abstract", date: abstractDeadline, dotColor: "border-violet-400", activeColor: "bg-violet-400" });
    if (paperDeadline)
      candidates.push({ label: "Paper", date: paperDeadline, dotColor: "border-rose-400", activeColor: "bg-rose-400" });
    if (notificationDate)
      candidates.push({ label: "Notification", date: notificationDate, dotColor: "border-amber-400", activeColor: "bg-amber-400" });

    // 날짜가 하나도 없으면 표시 안함
    if (candidates.length === 0) return { points: [], todayPercent: null };

    // Today를 범위 계산에 항상 포함
    const now = new Date();
    const allDates = [...candidates.map((c) => c.date.getTime()), now.getTime()];
    const minT = Math.min(...allDates);
    const maxT = Math.max(...allDates);
    const range = maxT - minT;

    if (range === 0) return { points: [], todayPercent: null };

    candidates.sort((a, b) => a.date.getTime() - b.date.getTime());

    const pts = candidates.map((p) => ({
      ...p,
      percent: ((p.date.getTime() - minT) / range) * 100,
    }));

    const tp = ((now.getTime() - minT) / range) * 100;

    return { points: pts, todayPercent: tp };
  }, [abstractDeadline, paperDeadline, notificationDate]);

  if (points.length === 0) return null;

  return (
    <div className="hidden sm:block w-[300px]">
      <div className="relative h-[12px]">
        {/* Track */}
        <div className="absolute top-[5px] left-0 right-0 h-[2px] bg-zinc-200 rounded-full" />

        {/* Filled track up to today */}
        {todayPercent !== null && (
          <div
            className="absolute top-[5px] left-0 h-[2px] bg-indigo-300 rounded-full"
            style={{ width: `${Math.min(todayPercent, 100)}%` }}
          />
        )}

        {/* Today marker — always visible */}
        {todayPercent !== null && (
          <div
            className="absolute -translate-x-1/2 group/today"
            style={{ left: `${Math.min(Math.max(todayPercent, 0), 100)}%`, top: "1px" }}
          >
            <div className="w-[10px] h-[10px] rounded-full bg-indigo-500 border-2 border-white shadow" />
            <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 px-1.5 py-0.5 bg-zinc-800 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover/today:opacity-100 transition-opacity pointer-events-none z-10">
              Today {fmtDate(new Date())}
            </span>
          </div>
        )}

        {/* Points */}
        {points.map((p) => {
          const isPast = todayPercent !== null && p.percent <= todayPercent;
          return (
            <div
              key={p.label}
              className="absolute -translate-x-1/2 group/dot"
              style={{ left: `${p.percent}%`, top: "2px" }}
            >
              <div
                className={`w-[8px] h-[8px] rounded-full border-2 ${p.dotColor} ${isPast ? p.activeColor : "bg-white"} shadow-sm cursor-default`}
              />
              <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 px-1.5 py-0.5 bg-zinc-800 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover/dot:opacity-100 transition-opacity pointer-events-none z-10">
                {p.label} {fmtDate(p.date)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Date labels */}
      <div className="relative h-[11px]">
        {points.map((p) => (
          <span
            key={p.label}
            className="absolute -translate-x-1/2 text-[9px] text-zinc-400 leading-none whitespace-nowrap"
            style={{ left: `${p.percent}%` }}
          >
            {fmtDate(p.date)}
          </span>
        ))}
      </div>
    </div>
  );
}
