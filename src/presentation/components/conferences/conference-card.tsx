"use client";

import Link from "next/link";
import type { ConferenceWithRelations } from "@/domain/repositories/conference-repository";
import { DeadlineBadge } from "./deadline-badge";
import { FieldBadge } from "./field-badge";
import { InstitutionBadges } from "./institution-badges";
import { BestPaperAccordion } from "./best-paper-accordion";
import { DeadlineTimeline } from "./deadline-timeline";
import { DeadlineLocalTime } from "./deadline-local-time";
import { BookmarkButton } from "./bookmark-button";
import { useMemo, useSyncExternalStore } from "react";
import { deadlineToUTC, formatDate, formatDeadlineLocal, isKnownDeadlineTimezone } from "@/shared/utils/date";
import { conferenceUrl } from "@/shared/utils/url";
import { useLocale } from "@/presentation/hooks/use-locale";
import styles from "./conference-index.module.css";

interface ConferenceCardProps {
  conference: ConferenceWithRelations;
  isBookmarked: boolean;
  isLoggedIn: boolean;
}

export function ConferenceCard({ conference, isBookmarked, isLoggedIn }: ConferenceCardProps) {
  const { isKorean } = useLocale();
  // 클라이언트 실시간 D-day 재계산 (ISR 캐시와 무관하게 정확한 값)
  const ddays = useMemo(() => {
    if (!conference.nextDeadline) return conference.daysUntilDeadline;
    const utc = deadlineToUTC(conference.nextDeadline, conference.deadlineTimezone);
    const deadlineDate = new Date(utc.getFullYear(), utc.getMonth(), utc.getDate());
    const now = new Date();
    const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.round((deadlineDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24));
  }, [conference.nextDeadline, conference.deadlineTimezone, conference.daysUntilDeadline]);

  const editionYear =
    conference.deadlineYear ??
    conference.conferenceStart?.getFullYear() ??
    conference.nextDeadline?.getFullYear() ??
    null;


  const completed = ddays !== null && ddays < 0 && conference.conferenceEnd && new Date(conference.conferenceEnd) < new Date();

  return (
    <article className={styles.conferenceRow} aria-label={conference.acronym}>
      <div className={styles.rowGrid}>
        <div className={styles.identity}>
          <div className={styles.identityTop}>
            <Link href={conferenceUrl(conference.slug)} className={styles.acronym}>{conference.acronym}</Link>
            {editionYear && <span className={styles.edition}>{editionYear}</span>}
            <FieldBadge field={conference.field} />
          </div>
          <p className={styles.conferenceName}>{conference.nameEn}</p>
          <div className={styles.eventMeta}>
            {conference.conferenceStart && <span>{isKorean ? "개최" : "Event"} {formatDate(conference.conferenceStart)}</span>}
            {conference.venue && <span>{conference.venue}</span>}
          </div>
        </div>
        <div className={styles.deadlineColumn}>
          <span className={styles.mobileColumnLabel}>{isKorean ? "논문 제출 마감" : "Submission deadline"}</span>
          {completed ? (
            <p className={styles.unannounced}>{isKorean ? "다음 일정 미발표" : "Next edition TBA"}</p>
          ) : conference.nextDeadline ? (
            <>
              <DeadlineTime deadline={conference.nextDeadline} timezone={conference.deadlineTimezone} critical={ddays !== null && ddays >= 0 && ddays <= 3} />
              <DeadlineBadge ddays={ddays} />
            </>
          ) : (
            <p className={styles.unannounced}>{isKorean ? "CFP 미발표" : "CFP to be announced"}</p>
          )}
        </div>
        <div className={styles.ratingsColumn}>
          <InstitutionBadges ratings={conference.institutionRatings} isKorean={isKorean} />
        </div>
        <div className={styles.bookmark}>
          <BookmarkButton conferenceId={conference.id} initialBookmarked={isBookmarked} isLoggedIn={isLoggedIn} />
        </div>
      </div>
      <div className={styles.rowExtras}>
        {conference.latestBestPapers.length > 0 && <BestPaperAccordion papers={conference.latestBestPapers} />}
        {(conference.nextDeadline || conference.abstractDeadline) && (
          <details className={styles.schedule}>
            <summary>{isKorean ? "주요 일정" : "Key dates"}</summary>
            <div className={styles.scheduleContent}>
              <DeadlineTimeline abstractDeadline={conference.abstractDeadline} paperDeadline={conference.nextDeadline} notificationDate={conference.notificationDate} />
              <dl className={styles.scheduleDates}>
                {conference.abstractDeadline && (
                  <div>
                    <dt>{isKorean ? "초록 제출" : "Abstract"}</dt>
                    <dd><DeadlineLocalTime deadline={conference.abstractDeadline} timezone={conference.deadlineTimezone} /></dd>
                  </div>
                )}
                {conference.nextDeadline && (
                  <div>
                    <dt>{isKorean ? "논문 제출" : "Paper"}</dt>
                    <dd><DeadlineLocalTime deadline={conference.nextDeadline} timezone={conference.deadlineTimezone} /></dd>
                  </div>
                )}
                {conference.notificationDate && (
                  <div>
                    <dt>{isKorean ? "결과 통보" : "Notification"}</dt>
                    <dd>{formatDate(conference.notificationDate)}</dd>
                  </div>
                )}
              </dl>
            </div>
          </details>
        )}
      </div>
    </article>
  );
}

function DeadlineTime({ deadline, timezone, critical = false }: { deadline: Date; timezone: string | null; critical?: boolean }) {
  const { isKorean } = useLocale();
  const isHydrated = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const hasKnownTimezone = isKnownDeadlineTimezone(timezone);
  const local = isHydrated && hasKnownTimezone ? formatDeadlineLocal(deadline, timezone) : null;
  const [date, time] = local ? local.dateTime.split(" ") : [formatDate(deadline), null];

  return (
    <div className={styles.deadlineTime}>
      <span className={`${styles.deadlineDate} ${critical ? styles.deadlineDateCritical : ""}`}>{date}</span>
      <span className={styles.deadlineZone}>
        {local ? `${time} ${local.tzAbbr}` : hasKnownTimezone ? (isKorean ? "현지 시간으로 변환 중" : "Converting to local time") : (isKorean ? "시간대 미공개" : "Timezone TBA")}
      </span>
    </div>
  );
}

function subscribeToHydration() {
  return () => {};
}
