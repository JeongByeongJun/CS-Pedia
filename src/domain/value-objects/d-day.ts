import { differenceInDays } from "date-fns";

export type DdayStatus = "passed" | "urgent" | "soon" | "upcoming" | "far";

export function calculateDday(
  deadline: Date,
  now: Date = new Date(),
): number {
  return differenceInDays(deadline, now);
}

export function getDdayStatus(ddays: number): DdayStatus {
  if (ddays < 0) return "passed";
  if (ddays <= 7) return "urgent";
  if (ddays <= 30) return "soon";
  if (ddays <= 90) return "upcoming";
  return "far";
}

export function formatDday(ddays: number): string {
  if (ddays < 0) return "마감";
  return `D-${ddays}`;
}
