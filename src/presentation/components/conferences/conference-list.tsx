"use client";

import { useState, useCallback } from "react";
import type { ConferenceWithRelations } from "@/domain/repositories/conference-repository";
import { ConferenceCard } from "./conference-card";
import { useLocale } from "@/presentation/hooks/use-locale";

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

  const showMore = useCallback(() => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  }, []);

  if (conferences.length === 0) {
    return (
      <div className="text-center py-16 text-zinc-400">
        <div className="text-4xl mb-3">🔍</div>
        <div className="text-sm">{isKorean ? "검색 결과가 없습니다" : "No results found"}</div>
      </div>
    );
  }

  const visible = conferences.slice(0, visibleCount);
  const hasMore = visibleCount < conferences.length;

  return (
    <div className="space-y-3">
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
          className="w-full py-3 text-sm font-medium text-zinc-500 hover:text-zinc-700 bg-zinc-50 hover:bg-zinc-100 rounded-xl transition-colors"
        >
          {isKorean
            ? `더보기 (${conferences.length - visibleCount}개 남음)`
            : `Show more (${conferences.length - visibleCount} remaining)`}
        </button>
      )}
    </div>
  );
}
