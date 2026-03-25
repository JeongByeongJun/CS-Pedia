"use client";

import { useState } from "react";
import { AWARD_TYPE_LABELS } from "@/domain/entities/best-paper";

interface BestPaperAccordionProps {
  papers: Array<{ title: string; year: number; awardType: string; paperUrl: string | null }>;
}

export function BestPaperAccordion({ papers }: BestPaperAccordionProps) {
  const [open, setOpen] = useState(false);
  if (papers.length === 0) return null;

  const year = papers[0].year;

  return (
    <div className="mt-3 pt-3 border-t border-zinc-100">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-xs text-indigo-600 hover:text-indigo-700 font-medium transition-colors py-2"
      >
        <span>🏆</span>
        <span>
          {year} Best Paper{papers.length > 1 ? ` (${papers.length})` : ""}
        </span>
        <svg
          className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <div className="mt-2 space-y-2">
          {papers.map((p, i) => (
            <div key={i} className="p-3 bg-indigo-50 rounded-xl text-sm">
              {papers.length > 1 && (
                <div className="text-xs text-indigo-400 font-medium mb-1">
                  {AWARD_TYPE_LABELS[p.awardType as keyof typeof AWARD_TYPE_LABELS] ?? p.awardType}
                </div>
              )}
              {p.paperUrl ? (
                <a href={p.paperUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-zinc-800 hover:text-indigo-600 transition-colors">
                  {p.title}
                </a>
              ) : (
                <div className="font-medium text-zinc-800">{p.title}</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
