import { format } from "date-fns";
import { ko } from "date-fns/locale";

export function formatDate(date: Date | string, pattern = "yyyy-MM-dd"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, pattern, { locale: ko });
}

export function formatDateKr(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, "yyyy년 M월 d일", { locale: ko });
}

export function parseOptionalDate(value: string | null): Date | null {
  if (!value) return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}
