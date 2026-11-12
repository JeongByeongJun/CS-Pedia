"use client";

import { useState, useCallback } from "react";
import type { ConferenceWithRelations } from "@/domain/repositories/conference-repository";
import { ConferenceCard } from "./conference-card";
import { useLocale } from "@/presentation/hooks/use-locale";

import styles from "./conference-index.module.css";

const PAGE_SIZE = 30;

interface ConferenceListProps {
  conferences: ConferenceWithRelations[];
  bookmarkedIds: string[];
  isLoggedIn: boolean;
}

export function ConferenceList({
  conferences,
  bookmarkedIds,
  isLoggedIn,
}: ConferenceListProps) {
  const { isKorean } = useLocale();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [prevConferences, setPrevConferences] = useState(conferences);

  if (conferences !== prevConferences) {
    setPrevConferences(conferences);
    setVisibleCount(PAGE_SIZE);
  }

  const showMore = useCallback(() => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  }, []);

  if (conferences.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>{isKorean ? "일치하는 학회가 없습니다." : "No matching conferences."}</h2>
        <p>{isKorean ? "검색어를 바꾸거나 분야·평가 기관 필터를 전체로 설정해 보세요." : "Try another search or set the field and ranking filters to All."}</p>
      </div>
    );
  }

  const visible = conferences.slice(0, visibleCount);
  const hasMore = visibleCount < conferences.length;

  return (
    <div className={styles.list}>
      <div className={styles.columnHead} aria-hidden="true">
        <span>{isKorean ? "학회 / 연구 분야" : "Conference / field"}</span>
        <span>{isKorean ? "논문 제출 마감" : "Submission deadline"}</span>
        <span>{isKorean ? "기관별 평가" : "Venue rankings"}</span>
      </div>
      {visible.map((conf) => (
        <ConferenceCard
          key={conf.id}
          conference={conf}
          isBookmarked={bookmarkedIds.includes(conf.id)}
          isLoggedIn={isLoggedIn}
        />
      ))}
      {hasMore && (
        <button
          onClick={showMore}
          className={styles.showMore}
        >
          {isKorean
            ? `더보기 (${conferences.length - visibleCount}개 남음)`
            : `Show more (${conferences.length - visibleCount} remaining)`}
        </button>
      )}
    </div>
  );
}
