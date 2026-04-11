"use client";

import { FIELDS } from "@/shared/constants/fields";
import { INSTITUTIONS_KR, INSTITUTIONS_INTL } from "@/shared/constants/institutions";
import { useLocale } from "@/presentation/hooks/use-locale";

interface ConferenceFiltersProps {
  selectedField: string;
  selectedInstitution: string;
  selectedSort: string;
  onFieldChange: (field: string) => void;
  onInstitutionChange: (institution: string) => void;
  onSortChange: (sort: string) => void;
}

export function ConferenceFilters({
  selectedField,
  selectedInstitution,
  selectedSort,
  onFieldChange,
  onInstitutionChange,
  onSortChange,
}: ConferenceFiltersProps) {
  const { isKorean } = useLocale();

  const sortOptions = isKorean
    ? [
        { id: "deadline", label: "데드라인순" },
        { id: "alphabetical", label: "이름순" },
        { id: "bk21", label: "BK21순" },
      ]
    : [
        { id: "deadline", label: "By Deadline" },
        { id: "alphabetical", label: "Alphabetical" },
        { id: "bk21", label: "CORE Rank" },
      ];

  return (
    <div className="space-y-3">
      {/* 분야 */}
      <div className="flex flex-wrap gap-1.5">
        {FIELDS.map((f) => (
          <button
            key={f}
            onClick={() => onFieldChange(f === "전체" ? "" : f)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              (f === "전체" && !selectedField) || selectedField === f
                ? "bg-indigo-600 text-white"
                : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
            }`}
          >
            {f === "전체" ? (isKorean ? "전체" : "All") : f}
          </button>
        ))}
      </div>

      {/* 기관 */}
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => onInstitutionChange("")}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            !selectedInstitution
              ? "bg-indigo-600 text-white"
              : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
          }`}
        >
          {isKorean ? "전체" : "All"}
        </button>
        {(isKorean ? INSTITUTIONS_KR : INSTITUTIONS_INTL).map((inst) => (
          <button
            key={inst}
            onClick={() => onInstitutionChange(inst)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              selectedInstitution === inst
                ? "bg-indigo-600 text-white"
                : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
            }`}
          >
            {inst}
          </button>
        ))}
      </div>

      {/* 정렬 */}
      <div className="flex gap-0.5 bg-zinc-100 rounded-lg p-0.5 w-fit">
        {sortOptions.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onSortChange(tab.id)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              selectedSort === tab.id
                ? "bg-white text-zinc-900 shadow-sm"
                : "text-zinc-400 hover:text-zinc-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
