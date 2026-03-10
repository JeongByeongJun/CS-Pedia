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

  const years = useMemo(
    () => [...new Set(papers.map((p) => p.year))].sort((a, b) => b - a),
    [papers],
  );
  const conferences = useMemo(
    () => [...new Set(papers.map((p) => p.conferenceAcronym))].sort(),
    [papers],
  );

  const filtered = useMemo(() => {
    let result = papers;
    if (selectedYear) result = result.filter((p) => p.year === selectedYear);
    if (selectedConference) result = result.filter((p) => p.conferenceAcronym === selectedConference);
    return result;
  }, [papers, selectedYear, selectedConference]);

  return (
    <>
      <div className="mb-6">
        <p style={{ fontSize: "13px", color: "#a1a1aa", marginTop: "4px" }}>
          {isKorean
            ? `${filtered.length}개 논문 · ${conferences.length}개 학회`
            : `${filtered.length} papers · ${conferences.length} conferences`}
          {years.length > 0 && ` · ${years[years.length - 1]}–${years[0]}`}
        </p>
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "16px",
          border: "1px solid rgba(0,0,0,0.06)",
          padding: "20px",
          marginBottom: "24px",
        }}
      >
        <BestPaperFilters
          years={years}
          conferences={conferences}
          selectedYear={selectedYear}
          selectedConference={selectedConference}
          onYearChange={setSelectedYear}
          onConferenceChange={setSelectedConference}
        />
      </div>

      <BestPaperList papers={filtered} />
    </>
  );
}
