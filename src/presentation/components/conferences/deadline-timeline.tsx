"use client";

import { useState, useEffect } from "react";
import { deadlineToUTC } from "@/shared/utils/date";

interface DeadlineTimelineProps {
  abstractDeadline: Date | null;
  paperDeadline: Date | null;
  notificationDate: Date | null;
  timezone?: string | null;
}

/** Fixed horizon: the right edge of the bar is always this many days from today. */
const WINDOW_DAYS = 60;
const TICK_DAYS = [7, 14, 21, 28, 35, 42, 49, 56];
/** Points closer than this (in % of the bar) share one merged label. */
const MERGE_GAP_PERCENT = 25;

interface TimelinePoint {
  key: "abstract" | "paper";
  short: string;
  long: string;
  date: Date;
  ddays: number;
  percent: number;
  dotColor: string;
  textColor: string;
}

function fmtDate(d: Date): string {
  return `${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
}

/** Date-only day difference in the viewer's local calendar (same rule as the card's D-day). */
function daysFromToday(local: Date): number {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(local.getFullYear(), local.getMonth(), local.getDate());
  return Math.round((target.getTime() - today.getTime()) / 86_400_000);
}

const toPercent = (ddays: number) => Math.min((ddays / WINDOW_DAYS) * 100, 100);

function compute(abstractDeadline: Date | null, paperDeadline: Date | null, timezone: string | null) {
  const raw = [
    abstractDeadline && { key: "abstract" as const, short: "Abs", long: "Abstract", d: abstractDeadline, dotColor: "border-violet-400", textColor: "text-violet-400" },
    paperDeadline && { key: "paper" as const, short: "Paper", long: "Paper", d: paperDeadline, dotColor: "border-rose-400", textColor: "text-rose-400" },
  ].filter((x): x is NonNullable<typeof x> => Boolean(x));

  const points: TimelinePoint[] = raw
    .map(({ d, ...rest }) => {
      const date = deadlineToUTC(d, timezone);
      const ddays = daysFromToday(date);
      return { ...rest, date, ddays, percent: toPercent(ddays) };
    })
    .filter((p) => p.ddays >= 0) // passed deadlines are not shown
    .sort((a, b) => a.ddays - b.ddays);

  if (points.length === 0) return null;
  return { points, last: points[points.length - 1] };
}

function fillColor(ddays: number): string {
  if (ddays <= 14) return "#fda4af"; // rose-300 — matches card border rule
  if (ddays <= 30) return "#fdba74"; // orange-300
  return "#a5b4fc"; // indigo-300
}

function Label({ p }: { p: TimelinePoint }) {
  return (
    <span>
      <span className={`font-medium ${p.textColor}`}>{p.short}</span> {fmtDate(p.date)}
    </span>
  );
}

/** Anchor a label at `percent` without letting it spill past the bar's edges. */
function anchorStyle(percent: number, align: "auto" | "start" | "end" = "auto"): React.CSSProperties {
  const mode = align !== "auto" ? align : percent < 12 ? "start" : percent > 88 ? "end" : "center";
  const translate = mode === "start" ? "0" : mode === "end" ? "-100%" : "-50%";
  return { left: `${percent}%`, transform: `translateX(${translate})` };
}

export function DeadlineTimeline({ abstractDeadline, paperDeadline, timezone = null }: DeadlineTimelineProps) {
  const [data, setData] = useState<ReturnType<typeof compute>>(null);

  useEffect(() => {
    setData(compute(abstractDeadline, paperDeadline, timezone));
  }, [abstractDeadline, paperDeadline, timezone]);

  if (!data) return null;

  const { points, last } = data;
  const overflow = last.ddays > WINDOW_DAYS;
  const color = fillColor(last.ddays);
  const merged = points.length === 2 && points[1].percent - points[0].percent < MERGE_GAP_PERCENT;

  return (
    <div className="hidden sm:block w-[300px]">
      <div className="relative h-[12px]">
        {/* Track: today → +60 days */}
        <div className="absolute top-[5px] left-0 right-0 h-[2px] bg-zinc-100 rounded-full" />

        {/* Weekly ticks */}
        {TICK_DAYS.map((d) => (
          <div
            key={d}
            className="absolute top-[3px] w-px h-[6px] bg-zinc-200"
            style={{ left: `${(d / WINDOW_DAYS) * 100}%` }}
          />
        ))}

        {/* Remaining time until the final deadline */}
        <div
          className="absolute top-[5px] left-0 h-[2px] rounded-full"
          style={{
            width: `${last.percent}%`,
            background: overflow ? `linear-gradient(to right, ${color} 75%, transparent)` : color,
          }}
        />

        {/* Today */}
        <div className="absolute group/today" style={{ left: 0, top: "1px", transform: "translateX(-50%)" }}>
          <div className="w-[10px] h-[10px] rounded-full bg-indigo-500 border-2 border-white shadow" />
          <span className="absolute left-0 bottom-full mb-1 px-1.5 py-0.5 bg-zinc-800 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover/today:opacity-100 transition-opacity pointer-events-none z-10">
            Today {fmtDate(new Date())}
          </span>
        </div>

        {/* Deadlines */}
        {points.map((p) => (
          <div
            key={p.key}
            className="absolute group/dot"
            style={{ left: `${p.percent}%`, top: "2px", transform: "translateX(-50%)" }}
          >
            <div className={`w-[8px] h-[8px] rounded-full border-2 ${p.dotColor} bg-white shadow-sm cursor-default`} />
            <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 px-1.5 py-0.5 bg-zinc-800 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover/dot:opacity-100 transition-opacity pointer-events-none z-10">
              {p.long} {fmtDate(p.date)} · {p.ddays === 0 ? "D-Day" : `D-${p.ddays}`}
            </span>
          </div>
        ))}
      </div>

      {/* Labels */}
      <div className="relative h-[11px] text-[9px] text-zinc-400 leading-none whitespace-nowrap">
        {merged ? (
          <span
            className="absolute"
            style={
              points[0].percent > 60
                ? anchorStyle(points[1].percent, "end")
                : anchorStyle(points[0].percent, "start")
            }
          >
            <Label p={points[0]} /> · <Label p={points[1]} />
          </span>
        ) : (
          points.map((p) => (
            <span key={p.key} className="absolute" style={anchorStyle(p.percent)}>
              <Label p={p} />
              {overflow && p === last && " ›"}
            </span>
          ))
        )}
      </div>
    </div>
  );
}
