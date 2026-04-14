"use client";

import { useState, useEffect } from "react";

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
  percent: number;
}

function fmtDate(d: Date): string {
  return `${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
}

function compute(abstractDeadline: Date | null, paperDeadline: Date | null) {
  const candidates: { label: string; date: Date; dotColor: string; activeColor: string }[] = [];
  if (abstractDeadline)
    candidates.push({ label: "Abstract", date: abstractDeadline, dotColor: "border-violet-400", activeColor: "bg-violet-400" });
  if (paperDeadline)
    candidates.push({ label: "Paper", date: paperDeadline, dotColor: "border-rose-400", activeColor: "bg-rose-400" });

  if (candidates.length === 0) return null;

  const now = new Date();
  const allDates = [...candidates.map((c) => c.date.getTime()), now.getTime()];
  const minT = Math.min(...allDates);
  const maxT = Math.max(...allDates);
  const range = maxT - minT;
  if (range === 0) return null;

  candidates.sort((a, b) => a.date.getTime() - b.date.getTime());

  const points: TimelinePoint[] = candidates.map((p) => ({
    ...p,
    percent: Math.round(((p.date.getTime() - minT) / range) * 10000) / 100,
  }));

  const todayPercent = Math.round(((now.getTime() - minT) / range) * 10000) / 100;

  return { points, todayPercent };
}

export function DeadlineTimeline({
  abstractDeadline,
  paperDeadline,
}: DeadlineTimelineProps) {
  const [data, setData] = useState<{ points: TimelinePoint[]; todayPercent: number } | null>(null);

  useEffect(() => {
    setData(compute(abstractDeadline, paperDeadline));
  }, [abstractDeadline, paperDeadline]);

  if (!data) return null;

  const { points, todayPercent } = data;

  return (
    <div className="hidden sm:block w-[300px]">
      <div className="relative h-[12px]">
        {/* Track */}
        <div className="absolute top-[5px] left-0 right-0 h-[2px] bg-zinc-200 rounded-full" />

        {/* Filled track up to today */}
        <div
          className="absolute top-[5px] left-0 h-[2px] bg-indigo-300 rounded-full"
          style={{ width: `${Math.min(todayPercent, 100)}%` }}
        />

        {/* Today marker */}
        <div
          className="absolute -translate-x-1/2 group/today"
          style={{ left: `${Math.min(Math.max(todayPercent, 0), 100)}%`, top: "1px" }}
        >
          <div className="relative">
            <div className="absolute inset-0 w-[10px] h-[10px] rounded-full bg-indigo-400 animate-ping opacity-50" />
            <div className="relative w-[10px] h-[10px] rounded-full bg-indigo-500 border-2 border-white shadow" />
          </div>
          <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 px-1.5 py-0.5 bg-zinc-800 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover/today:opacity-100 transition-opacity pointer-events-none z-10">
            Today {fmtDate(new Date())}
          </span>
        </div>

        {/* Points */}
        {points.map((p) => {
          const isPast = p.percent <= todayPercent;
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
