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
      <div className="flex gap-1 mb-6" style={{ background: "#f4f4f5", borderRadius: 10, padding: 3, display: "inline-flex" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            style={{
              padding: "7px 16px",
              fontSize: 13,
              fontWeight: active === tab.id ? 600 : 400,
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              transition: "all 0.15s",
              background: active === tab.id ? "white" : "transparent",
              color: active === tab.id ? "#18181b" : "#71717a",
              boxShadow: active === tab.id ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ display: active === "acceptance" ? "block" : "none" }}>
        {acceptanceRateContent}
      </div>
      <div style={{ display: active === "keyword" ? "block" : "none" }}>
        {keywordTrendContent}
      </div>
    </div>
  );
}
