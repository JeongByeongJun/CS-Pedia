"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useLocale } from "@/presentation/hooks/use-locale";

const FIELDS = ["AI/ML", "NLP", "CV", "Systems", "Security", "SE", "DB", "HCI", "Theory", "Networks", "Architecture", "Graphics", "PL", "Robotics"];

const AWARD_TABS = [
  { id: "", labelKr: "전체", labelEn: "All" },
  { id: "best_paper", labelKr: "Best Paper", labelEn: "Best Paper" },
  { id: "distinguished_paper", labelKr: "Distinguished", labelEn: "Distinguished" },
  { id: "honorable_mention", labelKr: "Honorable Mention", labelEn: "Honorable Mention" },
  { id: "best_student_paper", labelKr: "Student Paper", labelEn: "Student Paper" },
  { id: "test_of_time", labelKr: "Test of Time", labelEn: "Test of Time" },
];

interface BestPaperFiltersProps {
  years: number[];
  conferences: string[];
  conferencesWithField: Array<{ acronym: string; field: string }>;
  selectedYear: number | null;
  selectedConference: string;
  selectedField: string;
  selectedAwardType: string;
  onYearChange: (year: number | null) => void;
  onConferenceChange: (conference: string) => void;
  onFieldChange: (field: string) => void;
  onAwardTypeChange: (awardType: string) => void;
}

export function BestPaperFilters({
  years,
  conferences,
  conferencesWithField,
  selectedYear,
  selectedConference,
  selectedField,
  selectedAwardType,
  onYearChange,
  onConferenceChange,
  onFieldChange,
  onAwardTypeChange,
}: BestPaperFiltersProps) {
  const { isKorean } = useLocale();
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter conferences by field and search
  const filteredConferences = useMemo(() => {
    let list = conferencesWithField;
    if (selectedField) list = list.filter((c) => c.field === selectedField);
    if (search) list = list.filter((c) => c.acronym.toLowerCase().includes(search.toLowerCase()));
    return list.map((c) => c.acronym);
  }, [conferencesWithField, selectedField, search]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: PointerEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("pointerdown", handleClick);
    return () => document.removeEventListener("pointerdown", handleClick);
  }, []);

  return (
    <div className="space-y-4">
      {/* 수상 유형 */}
      <div>
        <div className="flex gap-1 overflow-x-auto pb-1 -mb-1 scrollbar-hide">
          {AWARD_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onAwardTypeChange(tab.id)}
              className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedAwardType === tab.id
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {isKorean ? tab.labelKr : tab.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* 연도 */}
      <div>
        <div className="text-xs text-zinc-400 mb-2 font-medium">{isKorean ? "연도" : "Year"}</div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onYearChange(null)}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
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
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
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

      {/* 분야 */}
      <div>
        <div className="text-xs text-zinc-400 mb-2 font-medium">{isKorean ? "분야" : "Field"}</div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => { onFieldChange(""); onConferenceChange(""); }}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              !selectedField
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
          >
            {isKorean ? "전체" : "All"}
          </button>
          {FIELDS.map((f) => (
            <button
              key={f}
              onClick={() => { onFieldChange(f); onConferenceChange(""); }}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                selectedField === f
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* 학회 검색 */}
      <div ref={dropdownRef} className="relative">
        <div className="text-xs text-zinc-400 mb-2 font-medium">{isKorean ? "학회" : "Conference"}</div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={selectedConference || search}
              onChange={(e) => {
                setSearch(e.target.value);
                onConferenceChange("");
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              placeholder={isKorean ? "학회 검색 (예: NeurIPS, CHI...)" : "Search conference (e.g. NeurIPS, CHI...)"}
              className="w-full px-3 py-2 rounded-lg border border-zinc-200 text-base sm:text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 bg-zinc-50 transition-all"
            />
            {(selectedConference || search) && (
              <button
                onClick={() => { onConferenceChange(""); setSearch(""); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-300 hover:text-zinc-500 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Dropdown */}
        {showDropdown && !selectedConference && (
          <div className="absolute z-10 mt-1 w-full max-h-48 overflow-y-auto bg-white rounded-xl border border-zinc-200 shadow-lg">
            {filteredConferences.length === 0 ? (
              <div className="p-3 text-xs text-zinc-400 text-center">
                {isKorean ? "결과 없음" : "No results"}
              </div>
            ) : (
              filteredConferences.map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    onConferenceChange(c);
                    setSearch("");
                    setShowDropdown(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-zinc-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                >
                  {c}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
