"use client";

import { useState, useMemo } from "react";
import type { BestPaperWithConference } from "@/domain/repositories/best-paper-repository";
import { BestPaperFilters } from "./best-paper-filters";
import { BestPaperList } from "./best-paper-list";
import { useLocale } from "@/presentation/hooks/use-locale";
import styles from "./paper-archive.module.css";

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
      <header className={styles.heading}>
        <p className="desk-kicker">The paper archive</p>
        <h1 className="desk-title">Best Papers</h1>
        <p className="desk-intro">
          {isKorean
            ? `209개 주요 CS 학회의 수상 논문 ${papers.length.toLocaleString("en-US")}편. 분야와 연도를 넘나들며 좋은 연구를 찾아보세요.`
            : `${papers.length.toLocaleString("en-US")} award-winning papers from leading CS conferences. Explore research across fields and years.`}
        </p>
      </header>

      <BestPaperFilters
        years={years}
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

      <div className={styles.resultsBar}>
        <p role="status" aria-live="polite">
          {isKorean
            ? `${filtered.length.toLocaleString("en-US")}편 · 전체 ${conferences.length}개 학회`
            : `${filtered.length.toLocaleString("en-US")} papers · ${conferences.length} conferences in archive`}
          {years.length > 0 && ` · ${years[years.length - 1]}–${years[0]}`}
        </p>
        {activeFilters > 0 && (
          <button
            type="button"
            onClick={() => { setSelectedYear(null); setSelectedConference(""); setSelectedField(""); setSelectedAwardType(""); }}
            className={styles.clearFilters}
          >
            {isKorean ? "필터 초기화" : "Clear filters"}
          </button>
        )}
      </div>

      <BestPaperList key={`${selectedYear}-${selectedConference}-${selectedField}-${selectedAwardType}`} papers={filtered} />
    </>
  );
}
