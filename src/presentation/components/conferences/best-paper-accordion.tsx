"use client";

import { useState } from "react";

interface BestPaperAccordionProps {
  title: string;
  year: number;
}

export function BestPaperAccordion({ title, year }: BestPaperAccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-3 pt-3 border-t border-zinc-100">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-xs text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
      >
        <span>🏆</span>
        <span>
          {year} Best Paper
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
        <div className="mt-2 p-3 bg-indigo-50 rounded-xl text-sm">
          <div className="font-medium text-zinc-800">{title}</div>
        </div>
      )}
    </div>
  );
}
