"use client";

import { useState } from "react";
import { useLocale } from "@/presentation/hooks/use-locale";

const UPDATES_KR = [
  { date: "2026.03.17", text: "마감 시간이 한국 시간(KST)으로 표시됩니다" },
  { date: "2026.03.16", text: "신규 학회 10개 추가 (LICS, VIS, RTSS, RTAS, SIGMETRICS, ICFP, CAV, VR, ISWC, ECRTS)" },
  { date: "2026.03.16", text: "154개 학회 데드라인 전수 검증 완료" },
];

const UPDATES_EN = [
  { date: "2026.03.17", text: "Deadlines now shown in your local timezone" },
  { date: "2026.03.16", text: "Added CORE / CCF / CSRankings — international conference rankings" },
  { date: "2026.03.16", text: "10 new conferences added (LICS, VIS, RTSS, RTAS, SIGMETRICS, ICFP, CAV, VR, ISWC, ECRTS)" },
];

export function UpdateBanner() {
  const { isKorean } = useLocale();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative bg-white/80 backdrop-blur-sm border border-zinc-200/60 rounded-xl px-4 py-3 mb-4 sm:mb-5">
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-2.5 right-3 text-zinc-300 hover:text-zinc-500 transition-colors text-sm leading-none"
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
