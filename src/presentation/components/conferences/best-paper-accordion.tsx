"use client";

import { useId, useState } from "react";
import { AWARD_TYPE_LABELS } from "@/domain/entities/best-paper";

import styles from "./conference-index.module.css";

interface BestPaperAccordionProps {
  papers: Array<{ title: string; year: number; awardType: string; paperUrl: string | null }>;
}

export function BestPaperAccordion({ papers }: BestPaperAccordionProps) {
  const [open, setOpen] = useState(false);
  const contentId = useId();
  if (papers.length === 0) return null;

  const year = papers[0].year;

  return (
    <div className={styles.paperAccordion}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={contentId}
        className={styles.paperToggle}
      >
        <span>
          {year} Best Paper{papers.length > 1 ? ` (${papers.length})` : ""}
        </span>
        <svg
          className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div id={contentId} hidden={!open} className={styles.paperContent}>
          {papers.map((p, i) => (
            <div key={i} className={styles.paperEntry}>
              {papers.length > 1 && (
                <div className={styles.paperAward}>
                  {AWARD_TYPE_LABELS[p.awardType as keyof typeof AWARD_TYPE_LABELS] ?? p.awardType}
                </div>
              )}
              {p.paperUrl ? (
                <a href={p.paperUrl} target="_blank" rel="noopener noreferrer" className={styles.paperTitle}>
                  {p.title}
                </a>
              ) : (
                <div className={styles.paperTitle}>{p.title}</div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
