import { format } from "date-fns";
import { ko } from "date-fns/locale";

// 날짜를 UTC 기준으로 포맷 (deadlines.json에 AoE = UTC로 저장되어 있음)
function toUTCDate(date: Date | string): Date {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Date(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
}

export function formatDate(date: Date | string, pattern = "yyyy-MM-dd"): string {
  return format(toUTCDate(date), pattern, { locale: ko });
}

export function formatDateKr(date: Date | string): string {
  return format(toUTCDate(date), "yyyy년 M월 d일", { locale: ko });
}

export function parseOptionalDate(value: string | null): Date | null {
  if (!value) return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}
