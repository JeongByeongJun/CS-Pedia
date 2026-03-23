"use client";

import Link from "next/link";
import type { ConferenceWithRelations } from "@/domain/repositories/conference-repository";
import { DeadlineBadge } from "./deadline-badge";
import { FieldBadge } from "./field-badge";
import { InstitutionBadges } from "./institution-badges";
import { BestPaperAccordion } from "./best-paper-accordion";
import { BookmarkButton } from "./bookmark-button";
import { useState, useEffect } from "react";
import { formatDate, formatDeadlineLocal } from "@/shared/utils/date";
import { conferenceUrl } from "@/shared/utils/url";
import { useLocale } from "@/presentation/hooks/use-locale";

interface ConferenceCardProps {
  conference: ConferenceWithRelations;
  isBookmarked: boolean;
  isLoggedIn: boolean;
}

export function ConferenceCard({
  conference,
  isBookmarked,
  isLoggedIn,
}: ConferenceCardProps) {
  const { isKorean } = useLocale();
  const ddays = conference.daysUntilDeadline;

  const editionYear =
    conference.conferenceStart?.getFullYear() ??
    conference.nextDeadline?.getFullYear() ??
    null;

  let borderClass = "border-zinc-200/80";
  if (ddays !== null && ddays >= 0 && ddays <= 14) {
    borderClass = "border-rose-200 shadow-sm shadow-rose-100";
  } else if (ddays !== null && ddays >= 0 && ddays <= 30) {
    borderClass = "border-orange-200";
  }

  return (
    <div
      className={`bg-white rounded-2xl border transition-all hover:shadow-md ${borderClass}`}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          {/* 왼쪽 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <Link
                href={conferenceUrl(conference.slug)}
                className="text-lg font-bold text-zinc-900 hover:text-indigo-600 transition-colors whitespace-nowrap"
              >
                {conference.acronym}
              </Link>
              <FieldBadge field={conference.field} />
              {editionYear && (
                <span className="text-xs px-1.5 py-0.5 bg-indigo-50 text-indigo-400 rounded font-medium">
                  {editionYear}
                </span>
              )}
              {conference.nextDeadline === null && (
                <span className="text-xs px-1.5 py-0.5 bg-zinc-100 text-zinc-400 rounded font-medium border border-zinc-200">
                  {isKorean ? "CFP 미발표" : "CFP TBA"}
                </span>
              )}
              {!(ddays !== null && ddays < 0 && conference.conferenceEnd && new Date(conference.conferenceEnd) < new Date()) && (
                <DeadlineBadge ddays={ddays} />
              )}
            </div>
            <div className="text-sm text-zinc-500 mb-2 truncate">
              {conference.nameEn}
            </div>
            <div className="flex items-center gap-4 text-xs text-zinc-400 flex-wrap">
              {ddays !== null && ddays < 0 && conference.conferenceEnd && new Date(conference.conferenceEnd) < new Date() ? (
                <span className="text-zinc-400">
                  {isKorean ? "다음 일정이 공개되지 않았습니다." : "Next schedule not announced."}
                </span>
              ) : conference.nextDeadline ? (
                <>
                  {conference.conferenceStart && (
                    <span className="whitespace-nowrap">
                      📅 {formatDate(conference.conferenceStart)}
                    </span>
                  )}
                  {conference.venue && <span className="truncate max-w-[200px] sm:max-w-none sm:whitespace-nowrap">📍 {conference.venue}</span>}
                  <DeadlineTime deadline={conference.nextDeadline!} timezone={conference.deadlineTimezone} />
                </>
              ) : (
                <span className="text-zinc-400">
                  {isKorean ? "다음 일정이 공개되지 않았습니다." : "Next schedule not announced."}
                </span>
              )}
            </div>
          </div>

          {/* 오른쪽 - 기관 인정 뱃지(데스크탑) + 북마크 */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="hidden sm:block">
              <InstitutionBadges ratings={conference.institutionRatings} isKorean={isKorean} />
            </div>
            <BookmarkButton
              conferenceId={conference.id}
              initialBookmarked={isBookmarked}
              isLoggedIn={isLoggedIn}
            />
          </div>
        </div>

        {/* Best Paper */}
        {conference.latestBestPapers.length > 0 && (
          <BestPaperAccordion papers={conference.latestBestPapers} />
        )}
      </div>
    </div>
  );
}

function DeadlineTime({ deadline, timezone }: { deadline: Date; timezone: string }) {
  const [local, setLocal] = useState<{ dateTime: string; tzAbbr: string } | null>(null);

  useEffect(() => {
    setLocal(formatDeadlineLocal(deadline, timezone));
  }, [deadline, timezone]);

  if (!local) {
    // SSR fallback: show date only
    return <span className="whitespace-nowrap">⏰ {formatDate(deadline)}</span>;
  }

  return (
    <span className="whitespace-nowrap">
      ⏰ {local.dateTime} <span className="font-bold">{local.tzAbbr}</span>
    </span>
  );
}
