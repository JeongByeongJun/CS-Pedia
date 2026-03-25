"use client";

import { useState } from "react";
import { useLocale } from "@/presentation/hooks/use-locale";

const UPDATES_KR = [
  { date: "2026.03.25", text: "BK21 학회 55개 추가 — 총 209개 학회 (PODC, ECOOP, IPDPS, TACAS 등)" },
  { date: "2026.03.25", text: "Best Paper 논문 제목 클릭 시 원문 링크 연결 (1,500+ 논문)" },
  { date: "2026.03.17", text: "마감 시간이 한국 시간(KST)으로 표시됩니다" },
];

const UPDATES_EN = [
  { date: "2026.03.25", text: "55 new BK21 conferences added — now tracking 209 venues (PODC, ECOOP, IPDPS, TACAS, etc.)" },
  { date: "2026.03.25", text: "Best Paper titles now link to the original paper (1,500+ papers)" },
  { date: "2026.03.17", text: "Deadlines now shown in your local timezone" },
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
