"use client";

import { useLocale } from "@/presentation/hooks/use-locale";

interface BestPaperFiltersProps {
  years: number[];
  conferences: string[];
  selectedYear: number | null;
  selectedConference: string;
  onYearChange: (year: number | null) => void;
  onConferenceChange: (conference: string) => void;
}

export function BestPaperFilters({
  years,
  conferences,
  selectedYear,
  selectedConference,
  onYearChange,
  onConferenceChange,
}: BestPaperFiltersProps) {
  const { isKorean } = useLocale();

  return (
    <div>
      {/* 연도 필터 */}
      <div className="mb-3">
        <div className="text-xs text-zinc-500 mb-2 font-medium">{isKorean ? "연도" : "Year"}</div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onYearChange(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              !selectedYear
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
          >
            {isKorean ? "전체" : "All"}
          </button>
          {years.map((y) => (
            <button
              key={y}
              onClick={() => onYearChange(y)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedYear === y
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      {/* 학회 필터 */}
      <div>
        <div className="text-xs text-zinc-500 mb-2 font-medium">{isKorean ? "학회" : "Conference"}</div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onConferenceChange("")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              !selectedConference
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
          >
            {isKorean ? "전체" : "All"}
          </button>
          {conferences.map((c) => (
            <button
              key={c}
              onClick={() => onConferenceChange(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedConference === c
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
