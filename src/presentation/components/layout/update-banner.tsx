"use client";

import { useState } from "react";
import { useLocale } from "@/presentation/hooks/use-locale";

const UPDATES_KR = [
  { date: "2026.11.25", text: "기관 인정 등급 전면 재검토 — 공식 목록과 대조해 오류 수정, CORE는 ICORE2026·CCF는 제7판(2026)으로 갱신" },
  { date: "2026.11.25", text: "우수학회 목록 출처 페이지 추가 — BK21·KIISE·KAIST·POSTECH 원본 파일 제공" },
  { date: "2026.11.25", text: "카드의 데드라인 바가 60일 기준으로 남은 기간을 보여줍니다" },
];

const UPDATES_EN = [
  { date: "2026.11.25", text: "All rankings re-checked against official lists — CORE updated to ICORE2026, CCF to the 7th edition (2026)" },
  { date: "2026.11.25", text: "New sources page with the original ranking documents" },
  { date: "2026.11.25", text: "Card deadline bars now show time remaining on a fixed 60-day scale" },
];

export function UpdateBanner() {
  const { isKorean } = useLocale();
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("cs-pedia-banner-dismissed") === "1";
  });

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("cs-pedia-banner-dismissed", "1");
  };

  return (
    <div className="relative bg-white/80 backdrop-blur-sm border border-zinc-200/60 rounded-xl px-4 py-3 mb-4 sm:mb-5">
      <button
        onClick={handleDismiss}
        className="absolute top-1 right-1 text-zinc-300 hover:text-zinc-500 transition-colors text-sm leading-none w-9 h-9 flex items-center justify-center"
        aria-label="Close"
      >
        ✕
      </button>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-[10px] font-semibold tracking-wider uppercase text-indigo-500" style={{ fontFamily: "var(--font-geist-mono), monospace" }}>
          {isKorean ? "최근 업데이트" : "What's New"}
        </span>
      </div>
      <ul className="space-y-0.5 pr-6">
        {(isKorean ? UPDATES_KR : UPDATES_EN).map((u, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-zinc-500 leading-relaxed">
            <span className="text-zinc-300 shrink-0">{u.date}</span>
            <span>{u.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
