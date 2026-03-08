"use client";

import { FIELDS } from "@/shared/constants/fields";
import { INSTITUTIONS } from "@/shared/constants/institutions";

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
  return (
    <div>
      {/* 분야 필터 */}
      <div className="mb-3">
        <div className="text-xs text-zinc-500 mb-2 font-medium">분야</div>
        <div className="flex flex-wrap gap-1.5">
          {FIELDS.map((f) => (
            <button
              key={f}
              onClick={() => onFieldChange(f === "전체" ? "" : f)}
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
            onClick={() => onInstitutionChange("")}
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
              onClick={() => onInstitutionChange(inst)}
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
          { id: "bk21", label: "⭐ BK21순" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => onSortChange(tab.id)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
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
