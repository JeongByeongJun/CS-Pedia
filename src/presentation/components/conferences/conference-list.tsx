import type { ConferenceWithRelations } from "@/domain/repositories/conference-repository";
import { ConferenceCard } from "./conference-card";

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
  if (conferences.length === 0) {
    return (
      <div className="text-center py-16 text-zinc-400">
        <div className="text-4xl mb-3">🔍</div>
        <div className="text-sm">검색 결과가 없습니다</div>
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
