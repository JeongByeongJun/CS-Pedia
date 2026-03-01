"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useTransition } from "react";
import { FIELDS } from "@/shared/constants/fields";
import { INSTITUTIONS } from "@/shared/constants/institutions";

interface ConferenceFiltersProps {
  selectedField?: string;
  selectedInstitution?: string;
  selectedSort?: string;
}

export function ConferenceFilters({
  selectedField,
  selectedInstitution,
  selectedSort = "deadline",
}: ConferenceFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const updateParams = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "전체") {
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
      {/* 분야 필터 */}
      <div className="mb-3">
        <div className="text-xs text-zinc-500 mb-2 font-medium">분야</div>
        <div className="flex flex-wrap gap-1.5">
          {FIELDS.map((f) => (
            <button
              key={f}
              onClick={() => updateParams("field", f === "전체" ? null : f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                (f === "전체" && !selectedField) || selectedField === f
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* 기관 필터 */}
      <div className="mb-3">
        <div className="text-xs text-zinc-500 mb-2 font-medium">
          기관 인정 학회만 보기
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => updateParams("institution", null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              !selectedInstitution
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
          >
            전체
          </button>
          {INSTITUTIONS.map((inst) => (
            <button
              key={inst}
              onClick={() => updateParams("institution", inst)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedInstitution === inst
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {inst}
            </button>
          ))}
        </div>
      </div>

      {/* 정렬 탭 */}
      <div className="flex gap-1 bg-zinc-100 rounded-xl p-1 w-fit">
        {[
          { id: "deadline", label: "⏰ 데드라인순" },
          { id: "alphabetical", label: "🔤 이름순" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => updateParams("sort", tab.id)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              (tab.id === "deadline" && !selectedSort) ||
              selectedSort === tab.id
                ? "bg-white text-zinc-900 shadow-sm"
                : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
