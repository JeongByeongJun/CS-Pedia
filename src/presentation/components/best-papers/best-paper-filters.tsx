"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useTransition } from "react";

interface BestPaperFiltersProps {
  years: number[];
  conferences: string[];
  selectedYear?: string;
  selectedConference?: string;
}

export function BestPaperFilters({
  years,
  conferences,
  selectedYear,
  selectedConference,
}: BestPaperFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const updateParams = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [router, pathname, searchParams, startTransition],
  );

  return (
    <div className={isPending ? "opacity-70 transition-opacity" : ""}>
      {/* 연도 필터 */}
      <div className="mb-3">
        <div className="text-xs text-zinc-500 mb-2 font-medium">연도</div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => updateParams("year", null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              !selectedYear
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
          >
            전체
          </button>
          {years.map((y) => (
            <button
              key={y}
              onClick={() => updateParams("year", y.toString())}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedYear === y.toString()
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
        <div className="text-xs text-zinc-500 mb-2 font-medium">학회</div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => updateParams("conference", null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              !selectedConference
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
          >
            전체
          </button>
          {conferences.map((c) => (
            <button
              key={c}
              onClick={() => updateParams("conference", c)}
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
