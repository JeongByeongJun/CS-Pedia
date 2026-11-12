"use client";

import { useState } from "react";
import Link from "next/link";
import type { BestPaperWithConference } from "@/domain/repositories/best-paper-repository";
import { AWARD_TYPE_LABELS } from "@/domain/entities/best-paper";
import { conferenceUrl, formatAuthors } from "@/shared/utils/url";
import { useLocale } from "@/presentation/hooks/use-locale";
import styles from "./paper-archive.module.css";

const INITIAL_YEARS = 3;

interface BestPaperListProps {
  papers: BestPaperWithConference[];
}

export function BestPaperList({ papers }: BestPaperListProps) {
  const { isKorean } = useLocale();
  const [visibleYears, setVisibleYears] = useState(INITIAL_YEARS);

  if (papers.length === 0) return (
    <div className={styles.empty}>
      <h2>{isKorean ? "조건에 맞는 논문이 없습니다." : "No papers match these filters."}</h2>
      <p>{isKorean ? "연도나 분야를 바꾸거나 필터를 초기화해 주세요." : "Try another year or field, or clear your filters."}</p>
    </div>
  );

  const grouped = papers.reduce((acc, paper) => {
    if (!acc[paper.year]) acc[paper.year] = [];
    acc[paper.year].push(paper);
    return acc;
  }, {} as Record<number, BestPaperWithConference[]>);
  const sortedYears = Object.keys(grouped).map(Number).sort((a, b) => b - a);

  return (
    <div className={styles.archive}>
      {sortedYears.slice(0, visibleYears).map((year) => (
        <section key={year} className={styles.yearSection} aria-labelledby={`paper-year-${year}`}>
          <header className={styles.yearHeading}>
            <h2 id={`paper-year-${year}`}>{year}</h2>
            <span>{grouped[year].length}{isKorean ? "편" : " papers"}</span>
          </header>
          <ol className={styles.paperList}>
            {grouped[year].map((paper) => (
              <li key={paper.id ?? JSON.stringify([paper.conferenceSlug, paper.year, paper.awardType, paper.paperTitle])} className={styles.paper}>
                <div className={styles.attribution}>
                  <Link href={conferenceUrl(paper.conferenceSlug)} className={styles.conference}>{paper.conferenceAcronym}</Link>
                  <span className={styles.award}>{AWARD_TYPE_LABELS[paper.awardType as keyof typeof AWARD_TYPE_LABELS] ?? paper.awardType}</span>
                </div>
                <article className={styles.paperContent}>
                  <h3 className={styles.paperTitle}>
                    {paper.paperUrl
                      ? <a href={paper.paperUrl} target="_blank" rel="noopener noreferrer">{paper.paperTitle}{"\u00A0"}<span className={styles.external} aria-label={isKorean ? "새 탭에서 열기" : "Opens in a new tab"}>↗</span></a>
                      : paper.paperTitle}
                  </h3>
                  {paper.authors && <p className={styles.authors}>{formatAuthors(paper.authors)}</p>}
                  {paper.tags.length > 0 && <p className={styles.tags}>{paper.tags.join(" / ")}</p>}
                </article>
              </li>
            ))}
          </ol>
        </section>
      ))}
      {visibleYears < sortedYears.length && <button
        type="button"
        onClick={() => setVisibleYears((previous) => previous + INITIAL_YEARS)}
        className={styles.showMore}
      >{isKorean ? `이전 연도 더 보기 · ${sortedYears.length - visibleYears}년 남음` : `Earlier years · ${sortedYears.length - visibleYears} years remaining`}<span aria-hidden="true">↓</span></button>}
    </div>
  );
}
