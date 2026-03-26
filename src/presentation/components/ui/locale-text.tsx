"use client";

import { useLocale } from "@/presentation/hooks/use-locale";

/**
 * Renders Korean or English text based on client-side locale detection.
 * Use this in server components that need locale-dependent text without calling headers().
 */
export function LocaleText({ ko, en }: { ko: React.ReactNode; en: React.ReactNode }) {
  const { isKorean } = useLocale();
  return <>{isKorean ? ko : en}</>;
}
