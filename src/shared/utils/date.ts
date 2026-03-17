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

// Timezone abbreviation → UTC offset in hours
const TZ_OFFSETS: Record<string, number> = {
  "AoE": -12,
  "HST": -10,
  "PST": -8,
  "PT": -8,    // Pacific Time (standard)
  "PDT": -7,
  "MST": -7,
  "MDT": -6,
  "CST": -6,   // US Central
  "CDT": -5,
  "EST": -5,
  "EDT": -4,
  "UTC": 0,
  "GMT": 0,
  "CET": 1,
  "CEST": 2,
};

/**
 * DB의 deadline (timezone의 로컬 시간으로 저장됨)을 실제 UTC Date로 변환.
 * 예: "2026-03-16T23:59:00Z" + timezone="AoE"(UTC-12) → UTC 2026-03-17T11:59:00Z
 */
export function deadlineToUTC(deadline: Date | string, timezone: string): Date {
  const d = typeof deadline === "string" ? new Date(deadline) : new Date(deadline.getTime());
  const offset = TZ_OFFSETS[timezone] ?? -12; // default AoE
  // DB stores local time as if UTC → subtract offset to get real UTC
  return new Date(d.getTime() - offset * 60 * 60 * 1000);
}

/**
 * deadline을 사용자 로컬 시간 문자열로 변환.
 * 서버에서는 KST(UTC+9) 기준, 클라이언트에서는 브라우저 로컬 시간.
 */
export function formatDeadlineLocal(deadline: Date | string, timezone: string): string {
  const utcDate = deadlineToUTC(deadline, timezone);
  // format in user's local timezone
  return new Intl.DateTimeFormat("ko-KR", {
    month: "numeric",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(utcDate);
}

export function formatDeadlineLocalEn(deadline: Date | string, timezone: string): string {
  const utcDate = deadlineToUTC(deadline, timezone);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(utcDate);
}
