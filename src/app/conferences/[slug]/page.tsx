import { notFound } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { getConferences } from "@/infrastructure/container";
import { SiteHeader } from "@/presentation/components/layout/site-header";
import { SiteFooter } from "@/presentation/components/layout/site-footer";
import { DeadlineBadge } from "@/presentation/components/conferences/deadline-badge";
import { BookmarkButton } from "@/presentation/components/conferences/bookmark-button";
import { deadlineToUTC, formatDate, isKnownDeadlineTimezone } from "@/shared/utils/date";

const AcceptanceRateChart = dynamic(
  () => import("@/presentation/components/charts/acceptance-rate-chart").then((m) => m.AcceptanceRateChart),
  {
    loading: () => <div className={styles.chartLoading} style={{ height: 250 }} />,
  }
);

const ConferenceKeywordChart = dynamic(
  () => import("@/presentation/components/charts/conference-keyword-chart").then((m) => m.ConferenceKeywordChart),
  {
    loading: () => <div className={styles.chartLoading} style={{ height: 300 }} />,
  }
);
import { formatAuthors } from "@/shared/utils/url";
import { AWARD_TYPE_LABELS } from "@/domain/entities/best-paper";
import { InfoTooltip } from "@/presentation/components/ui/info-tooltip";
import { LocaleText } from "@/presentation/components/ui/locale-text";
import { InstitutionRatings } from "@/presentation/components/conferences/institution-ratings";
import styles from "./detail.module.css";
import { DeadlineLocalTime } from "@/presentation/components/conferences/deadline-local-time";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 86400;

export async function generateStaticParams() {
  const conferences = await getConferences();
  return conferences.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const fs = await import("fs/promises");
  const path = await import("path");
  let detail: Record<string, unknown> | null = null;
  try {
    const raw = await fs.readFile(path.join(process.cwd(), `public/data/conferences/${slug}.json`), "utf8");
    detail = JSON.parse(raw);
  } catch { /* ignore */ }
  const acronym = (detail?.acronym as string) ?? slug.toUpperCase();
  const nameEn = (detail?.nameEn as string) ?? "";
  // Prefer the edition year attached to the selected deadline.
  const deadlineYear = detail?.deadlineYear as number | null;
  const confStart = detail?.conferenceStart as string | null;
  const paperDl = detail?.nextDeadline as string | null;
  const year = deadlineYear
    ?? (confStart ? new Date(confStart).getFullYear()
    : paperDl ? new Date(paperDl).getFullYear()
    : new Date().getFullYear());
  const venue = detail?.venue as string | null;
  const descEn = detail?.descriptionEn as string | null;
  const rawTimezone = detail?.deadlineTimezone as string | null;
  const timezone = isKnownDeadlineTimezone(rawTimezone) ? rawTimezone : null;
  const deadlineText = paperDl ? new Date(paperDl).toISOString().slice(0, 10) : null;
  const city = venue ? venue.split(",")[0].trim() : null;
  const title = `${acronym} ${year} Deadline, CFP, Acceptance Rate & Ranking`;

  const venueStr = venue ? ` in ${venue}` : "";
  const description = descEn ?? `${acronym} ${year} (${nameEn})${venueStr}. ${deadlineText ? `Paper deadline: ${deadlineText}${timezone ? ` ${timezone}` : ""}. ` : ""}Check CFP details, acceptance rate history, Best Paper awards, and BK21/CORE/CCF rankings on CS-Pedia.`;

  return {
    title,
    description,
    keywords: [`${acronym} deadline`, `${acronym} ${year}`, `${acronym} acceptance rate`, `${acronym} CFP`, `${acronym} 데드라인`, `${acronym} 랭킹`, city ? `${acronym} ${city}` : ""].filter(Boolean) as string[],
    openGraph: {
      title,
      description,
      url: `https://cs-pedia.io/conferences/${slug}`,
      siteName: "CS-Pedia",
      locale: "ko_KR",
      alternateLocale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `https://cs-pedia.io/conferences/${slug}`,
    },
  };
}

export default async function ConferenceDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Read from static JSON — no Supabase query
  const fs = await import("fs/promises");
  const path = await import("path");
  const filePath = path.join(process.cwd(), `public/data/conferences/${slug}.json`);
  let detail: Record<string, unknown>;
  try {
    const raw = await fs.readFile(filePath, "utf8");
    detail = JSON.parse(raw);
  } catch {
    notFound();
  }

  const conference = {
    id: detail.id as string,
    slug: detail.slug as string,
    nameEn: detail.nameEn as string,
    acronym: detail.acronym as string,
    field: detail.field as string,
    subField: detail.subField as string,
    dblpKey: detail.dblpKey as string,
    websiteUrl: detail.websiteUrl as string | null,
    description: detail.description as string | null,
    descriptionKo: detail.descriptionKo as string | null,
    descriptionEn: detail.descriptionEn as string | null,
    nextDeadline: detail.nextDeadline ? new Date(detail.nextDeadline as string) : null,
    daysUntilDeadline: (() => {
      if (!detail.nextDeadline) return null;
      const d = new Date(detail.nextDeadline as string);
      const timezone = detail.deadlineTimezone as string | null;
      const utc = deadlineToUTC(d, timezone);
      const deadlineDate = new Date(utc.getFullYear(), utc.getMonth(), utc.getDate());
      const now = new Date();
      const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      return Math.round((deadlineDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24));
    })(),
    deadlineTimezone: detail.deadlineTimezone as string | null,
    venue: detail.venue as string | null,
    conferenceStart: detail.conferenceStart ? new Date(detail.conferenceStart as string) : null,
    conferenceEnd: detail.conferenceEnd ? new Date(detail.conferenceEnd as string) : null,
  };
  const deadlines = (detail.deadlines as Array<Record<string, unknown>> ?? []).map((d) => ({
    year: d.year as number,
    cycle: d.cycle as string,
    abstractDeadline: d.abstractDeadline ? new Date(d.abstractDeadline as string) : null,
    paperDeadline: d.paperDeadline ? new Date(d.paperDeadline as string) : null,
    notificationDate: d.notificationDate ? new Date(d.notificationDate as string) : null,
    conferenceStart: d.conferenceStart ? new Date(d.conferenceStart as string) : null,
    conferenceEnd: d.conferenceEnd ? new Date(d.conferenceEnd as string) : null,
    venue: d.venue as string | null,
    timezone: d.timezone as string | null,
  }));
  const bestPapers = (detail.bestPapers as Array<Record<string, unknown>> ?? []).map((bp) => ({
    year: bp.year as number,
    paperTitle: bp.paperTitle as string,
    authors: bp.authors as string,
    awardType: bp.awardType as string,
    tags: bp.tags as string[],
    paperUrl: bp.paperUrl as string | null,
  }));
  const ratings = detail.institutionRatings as Array<{ institution: string; tier: string | null }>;
  const acceptanceRates = (detail.acceptanceRates as Array<Record<string, unknown>> ?? []).map((ar) => ({
    year: ar.year as number,
    accepted: ar.accepted as number | null,
    submitted: ar.submitted as number | null,
    rate: ar.rate as number | null,
  }));
  const keywordTrends = (detail.keywordTrends as Array<Record<string, unknown>> ?? []).map((kw, i) => ({
    id: `kw-${i}`,
    conferenceId: detail.id as string,
    year: kw.year as number,
    keyword: kw.keyword as string,
    count: kw.count as number,
  }));

  const upcomingDeadline = deadlines.find((d) => d.conferenceStart);
  const resolvedStartDate =
    conference.conferenceStart ??
    upcomingDeadline?.conferenceStart ??
    null;
  const resolvedVenue =
    conference.venue ??
    upcomingDeadline?.venue ??
    null;

  const jsonLd = resolvedStartDate
    ? {
        "@context": "https://schema.org",
        "@type": "Event",
        name: `${conference.acronym} - ${conference.nameEn}`,
        description: conference.description ?? `${conference.acronym} computer science conference`,
        url: conference.websiteUrl ?? `https://cs-pedia.io/conferences/${slug}`,
        startDate: resolvedStartDate.toISOString().split("T")[0],
        ...(conference.conferenceEnd && {
          endDate: conference.conferenceEnd.toISOString().split("T")[0],
        }),
        location: resolvedVenue
          ? { "@type": "Place", name: resolvedVenue }
          : { "@type": "VirtualLocation", url: conference.websiteUrl ?? `https://cs-pedia.io/conferences/${slug}` },
      }
    : null;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "CS-Pedia",
        item: "https://cs-pedia.io",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: conference.acronym,
        item: `https://cs-pedia.io/conferences/${slug}`,
      },
    ],
  };

  const rateRows = (detail.acceptanceRates as Array<{ year: number; rate: number | null; accepted: number | null; submitted: number | null }>) ?? [];
  const latestRate = rateRows.filter((r) => r.rate != null && r.submitted != null).sort((a, b) => b.year - a.year)[0] ?? null;
  const trendRows = (detail.keywordTrends as Array<{ year: number; keyword: string; count: number }>) ?? [];
  const latestTrendYear = trendRows.length > 0 ? Math.max(...trendRows.map((t) => t.year)) : 0;
  const topKeywords = trendRows.filter((t) => t.year === latestTrendYear).sort((a, b) => b.count - a.count).slice(0, 5);
  const acceptanceTooltip = (
    <InfoTooltip
      text="DBLP / OpenAlex에서 수집한 채택 논문 수 기반으로 산출합니다. 채택률 = 채택 수 ÷ 제출 수이며, 제출 수가 없는 경우 채택 수만 표시됩니다."
      textEn="Calculated from accepted paper counts collected from DBLP / OpenAlex. Rate = accepted ÷ submitted. If submission count is unavailable, only accepted count is shown."
    />
  );

  return (
    <div className="desk-page">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SiteHeader />

      <main id="main-content" className="desk-container">
        <div className={styles.detail}>
          <Link href="/" className={styles.back}>
            <LocaleText ko="← 학회 목록으로" en="← Back to list" />
          </Link>

          {/* 학회 헤더 */}
          <header className={styles.head}>
            <div className={styles.headMain}>
              <p className="desk-kicker">
                {conference.field}
                {conference.subField && conference.subField !== conference.field ? ` · ${conference.subField}` : ""}
              </p>
              <div className={styles.titleRow}>
                <h1 className={styles.title}>{conference.acronym}</h1>
                <DeadlineBadge ddays={conference.daysUntilDeadline} deadline={conference.nextDeadline} timezone={conference.deadlineTimezone} />
              </div>
              <p className={styles.name}>{conference.nameEn}</p>
              {(resolvedVenue || resolvedStartDate) && (
                <p className={styles.meta}>
                  {resolvedStartDate && (
                    <span>
                      {formatDate(resolvedStartDate)}
                      {conference.conferenceEnd && ` ~ ${formatDate(conference.conferenceEnd).replace(/^\d{4}\.\s*/, "")}`}
                    </span>
                  )}
                  {resolvedVenue && <span>{resolvedVenue}</span>}
                </p>
              )}
              <div className={styles.actions}>
                {conference.websiteUrl && (
                  <a href={conference.websiteUrl} target="_blank" rel="noopener noreferrer" className={`${styles.action} ${styles.actionPrimary}`}>
                    <LocaleText ko="공식 웹사이트 ↗" en="Official website ↗" />
                  </a>
                )}
                {conference.dblpKey && (
                  <a href={`https://dblp.org/db/${conference.dblpKey}/`} target="_blank" rel="noopener noreferrer" className={styles.action}>
                    DBLP ↗
                  </a>
                )}
                <a
                  href={`https://mail.google.com/mail/?view=cm&to=contact@cs-pedia.io&su=${encodeURIComponent(`[Error Report] ${conference.acronym}`)}&body=${encodeURIComponent(`Conference: ${conference.acronym} (${conference.nameEn})\nPage: https://cs-pedia.io/conferences/${slug}\n\nError details:\n`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.report}
                >
                  <LocaleText ko="정보 오류 신고" en="Report an error" />
                </a>
              </div>
            </div>
            <div className={styles.bookmark}>
              <BookmarkButton conferenceId={conference.id} initialBookmarked={false} isLoggedIn={false} />
            </div>
          </header>

          {(latestRate || topKeywords.length > 0) && (
            <dl className={styles.facts}>
              {latestRate && (
                <div className={styles.fact}>
                  <dt><LocaleText ko="채택률" en="Acceptance" /></dt>
                  <dd>
                    {latestRate.rate}%
                    <span className={styles.factNote}>
                      {latestRate.year} · {latestRate.accepted?.toLocaleString()} / {latestRate.submitted?.toLocaleString()}
                    </span>
                  </dd>
                </div>
              )}
              {topKeywords.length > 0 && (
                <div className={styles.fact}>
                  <dt><LocaleText ko="키워드" en="Topics" /></dt>
                  <dd>{topKeywords.map((k) => k.keyword).join(" / ")}</dd>
                </div>
              )}
            </dl>
          )}

          {/* 기관 인정 현황 / Rankings */}
          <InstitutionRatings ratings={ratings} />

          {/* 데드라인 이력 */}
          {deadlines.length > 0 && (
            <Section title={<LocaleText ko="데드라인" en="Deadlines" />}>
              <div className={styles.deadlines}>
                {[...deadlines].sort((a, b) => b.year - a.year || (a.paperDeadline?.getTime() ?? Infinity) - (b.paperDeadline?.getTime() ?? Infinity)).map((d) => (
                  <div key={`${d.year}-${d.cycle}`} className={styles.deadline}>
                    <div>
                      <div className={styles.edition}>
                        {d.year}
                        {d.cycle && d.cycle !== "main" && <span className={styles.cycle}>{d.cycle}</span>}
                      </div>
                      {d.venue && <div className={styles.venue}>{d.venue}</div>}
                    </div>
                    <dl className={styles.dates}>
                      {d.abstractDeadline && (
                        <div>
                          <dt><LocaleText ko="초록 제출" en="Abstract" /></dt>
                          <dd><DeadlineLocalTime deadline={d.abstractDeadline} timezone={d.timezone} /></dd>
                        </div>
                      )}
                      {d.paperDeadline ? (
                        <div>
                          <dt><LocaleText ko="논문 제출" en="Paper" /></dt>
                          <dd><DeadlineLocalTime deadline={d.paperDeadline} timezone={d.timezone} /></dd>
                        </div>
                      ) : (
                        <div>
                          <dt><LocaleText ko="논문 제출" en="Paper" /></dt>
                          <dd className={styles.pending}><LocaleText ko="CFP 미발표" en="CFP to be announced" /></dd>
                        </div>
                      )}
                      {d.notificationDate && (
                        <div>
                          <dt><LocaleText ko="결과 통보" en="Notification" /></dt>
                          <dd>{formatDate(d.notificationDate)}</dd>
                        </div>
                      )}
                      {d.conferenceStart && (
                        <div>
                          <dt><LocaleText ko="학회 일정" en="Conference" /></dt>
                          <dd>
                            {formatDate(d.conferenceStart)}
                            {d.conferenceEnd && ` ~ ${formatDate(d.conferenceEnd).replace(/^\d{4}\.\s*/, "")}`}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>
                ))}
              </div>
              <p className={styles.note}>
                <LocaleText
                  ko="데드라인은 변경될 수 있습니다. 제출 전 공식 웹사이트에서 최종 일정을 확인하세요."
                  en="Deadlines may change. Always verify on the official website before submitting."
                />
              </p>
            </Section>
          )}

          {/* Acceptance Rate */}
          {acceptanceRates.length === 0 && (
            <Section title={<><LocaleText ko="채택률" en="Acceptance rate" />{acceptanceTooltip}</>}>
              <p className={styles.emptyNote}><LocaleText ko="채택률 데이터가 없습니다." en="No acceptance rate data available." /></p>
            </Section>
          )}
          {acceptanceRates.length > 0 && (
            <Section title={<><LocaleText ko="채택률" en="Acceptance rate" />{acceptanceTooltip}</>}>
              <AcceptanceRateChart data={acceptanceRates} />
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th><LocaleText ko="연도" en="Year" /></th>
                      <th className={styles.num}><LocaleText ko="제출" en="Submitted" /></th>
                      <th className={styles.num}><LocaleText ko="채택" en="Accepted" /></th>
                      <th className={styles.num}><LocaleText ko="채택률" en="Rate" /></th>
                      <th className={styles.barCell} aria-hidden="true"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {acceptanceRates.map((ar) => {
                      const computedRate = ar.rate ?? (ar.submitted && ar.accepted ? Math.round((ar.accepted / ar.submitted) * 100 * 10) / 10 : null);
                      return (
                        <tr key={ar.year}>
                          <td>{ar.year}</td>
                          <td className={styles.num}>{ar.submitted?.toLocaleString() ?? "—"}</td>
                          <td className={styles.num}>{ar.accepted?.toLocaleString() ?? "—"}</td>
                          <td className={styles.rate}>{computedRate != null ? `${computedRate}%` : "—"}</td>
                          <td className={styles.barCell} aria-hidden="true">
                            {computedRate != null && (
                              <div className={styles.bar}>
                                <div className={styles.barFill} style={{ width: `${Math.min(computedRate, 100)}%` }} />
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Section>
          )}

          {/* Research Trend */}
          {keywordTrends.length > 0 && (
            <Section title={<><LocaleText ko="연구 트렌드" en="Research trend" /><InfoTooltip text="Semantic Scholar에서 수집한 채택 논문 제목 기반으로 CS 키워드 빈도를 분석합니다. 2년 이상 데이터가 있을 경우 연도별 추이를 확인할 수 있습니다." textEn="Analyzes CS keyword frequency from accepted paper titles collected via Semantic Scholar. Year-over-year trends are shown when data spans 2+ years." /></>}>
              <ConferenceKeywordChart data={keywordTrends} />
            </Section>
          )}

          {/* Best Papers */}
          {bestPapers.length > 0 && (
            <Section title="Best Papers">
              <ol className={styles.papers}>
                {[...bestPapers].sort((a, b) => b.year - a.year).map((bp) => (
                  <li key={`${bp.year}-${bp.awardType}-${bp.paperTitle}`} className={styles.paper}>
                    <div className={styles.paperHead}>
                      <div className={styles.paperYear}>{bp.year}</div>
                      <div className={styles.paperAward}>
                        {AWARD_TYPE_LABELS[bp.awardType as keyof typeof AWARD_TYPE_LABELS] ?? bp.awardType}
                      </div>
                    </div>
                    <div>
                      {bp.paperUrl ? (
                        <a href={bp.paperUrl} target="_blank" rel="noopener noreferrer" className={styles.paperTitle}>
                          {bp.paperTitle}
                        </a>
                      ) : (
                        <div className={styles.paperTitle}>{bp.paperTitle}</div>
                      )}
                      {bp.authors && <div className={styles.paperAuthors}>{formatAuthors(bp.authors)}</div>}
                      {bp.tags.length > 0 && <div className={styles.paperTags}>{bp.tags.join(" / ")}</div>}
                    </div>
                  </li>
                ))}
              </ol>
            </Section>
          )}
        </div>

        <SiteFooter />
      </main>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {children}
    </section>
  );
}
