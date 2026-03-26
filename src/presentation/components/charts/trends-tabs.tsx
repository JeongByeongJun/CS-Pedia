"use client";

import { useState, type ReactNode } from "react";

interface TrendsTabsProps {
  acceptanceRateContent: ReactNode;
  keywordTrendContent: ReactNode;
}

const tabs = [
  { id: "acceptance", label: "Acceptance Rate" },
  { id: "keyword", label: "Keyword Trends" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function TrendsTabs({
  acceptanceRateContent,
  keywordTrendContent,
}: TrendsTabsProps) {
  const [active, setActive] = useState<TabId>("acceptance");

  return (
    <div>
      <div className="inline-flex gap-1 mb-6 bg-zinc-100 rounded-[10px] p-[3px]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`px-4 py-2 text-[13px] rounded-lg border-none cursor-pointer transition-all duration-150 ${
              active === tab.id
                ? "font-semibold bg-white text-zinc-900 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                : "font-normal bg-transparent text-zinc-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={active === "acceptance" ? "block" : "hidden"}>
        {acceptanceRateContent}
      </div>
      <div className={active === "keyword" ? "block" : "hidden"}>
        {keywordTrendContent}
      </div>
    </div>
  );
}
