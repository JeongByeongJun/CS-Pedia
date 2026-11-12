"use client";

import { useState, useMemo } from "react";
import type { BestPaperWithConference } from "@/domain/repositories/best-paper-repository";
import { BestPaperFilters } from "./best-paper-filters";
import { BestPaperList } from "./best-paper-list";
import { useLocale } from "@/presentation/hooks/use-locale";

interface BestPaperClientSectionProps {
  papers: BestPaperWithConference[];
}

export function BestPaperClientSection({ papers }: BestPaperClientSectionProps) {
  const { isKorean } = useLocale();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedConference, setSelectedConference] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [selectedAwardType, setSelectedAwardType] = useState("");

  const years = useMemo(
    () => [...new Set(papers.map((p) => p.year))].sort((a, b) => b - a),
    [papers],
  );

  const conferencesWithField = useMemo(
    () => {
      const map = new Map<string, string>();
      for (const p of papers) {
        if (!map.has(p.conferenceAcronym)) {
          map.set(p.conferenceAcronym, p.conferenceField ?? "");
        }
      }
      return [...map.entries()]
        .map(([acronym, field]) => ({ acronym, field }))
        .sort((a, b) => a.acronym.localeCompare(b.acronym));
    },
    [papers],
  );

  const conferences = useMemo(
    () => conferencesWithField.map((c) => c.acronym),
    [conferencesWithField],
  );

  const filtered = useMemo(() => {
    let result = papers;
    if (selectedYear) result = result.filter((p) => p.year === selectedYear);
    if (selectedConference) result = result.filter((p) => p.conferenceAcronym === selectedConference);
    if (selectedField) {
      const fieldConfs = new Set(conferencesWithField.filter((c) => c.field === selectedField).map((c) => c.acronym));
      result = result.filter((p) => fieldConfs.has(p.conferenceAcronym));
    }
    if (selectedAwardType) result = result.filter((p) => p.awardType === selectedAwardType);
    return result;
  }, [papers, selectedYear, selectedConference, selectedField, selectedAwardType, conferencesWithField]);

  const activeFilters = [selectedYear, selectedConference, selectedField, selectedAwardType].filter(Boolean).length;

  return (
    <>
      <div className="mb-6">
        <p className="text-[13px] text-zinc-400 mt-1">
          {isKorean
            ? `${filtered.length}개 논문 · ${conferences.length}개 학회`
            : `${filtered.length} papers · ${conferences.length} conferences`}
          {years.length > 0 && ` · ${years[years.length - 1]}–${years[0]}`}
          {activeFilters > 0 && (
            <button
              onClick={() => { setSelectedYear(null); setSelectedConference(""); setSelectedField(""); setSelectedAwardType(""); }}
              className="ml-2 text-indigo-500 hover:text-indigo-700 transition-colors"
            >
              {isKorean ? "필터 초기화" : "Clear filters"}
            </button>
          )}
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200/60 p-5 mb-6">
        <BestPaperFilters
          years={years}
          conferences={conferences}
          conferencesWithField={conferencesWithField}
          selectedYear={selectedYear}
          selectedConference={selectedConference}
          selectedField={selectedField}
          selectedAwardType={selectedAwardType}
          onYearChange={setSelectedYear}
          onConferenceChange={setSelectedConference}
          onFieldChange={setSelectedField}
          onAwardTypeChange={setSelectedAwardType}
        />
      </div>

      <BestPaperList papers={filtered} />
    </>
  );
}
