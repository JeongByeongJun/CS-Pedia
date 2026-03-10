"use client";

import type { ConferenceWithRelations } from "@/domain/repositories/conference-repository";
import { ConferenceCard } from "./conference-card";
import { useLocale } from "@/presentation/hooks/use-locale";

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

  if (conferences.length === 0) {
    return (
      <div className="text-center py-16 text-zinc-400">
        <div className="text-4xl mb-3">🔍</div>
        <div className="text-sm">{isKorean ? "검색 결과가 없습니다" : "No results found"}</div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {conferences.map((conf) => (
        <ConferenceCard
          key={conf.id}
          conference={conf}
          isBookmarked={bookmarkedIds.includes(conf.id)}
          isLoggedIn={isLoggedIn}
        />
      ))}
    </div>
  );
}
