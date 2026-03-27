import { notFound } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { getConferences } from "@/infrastructure/container";
import { SiteHeader } from "@/presentation/components/layout/site-header";
import { SiteFooter } from "@/presentation/components/layout/site-footer";
import { FieldBadge } from "@/presentation/components/conferences/field-badge";
import { DeadlineBadge } from "@/presentation/components/conferences/deadline-badge";
import { BookmarkButton } from "@/presentation/components/conferences/bookmark-button";
import { formatDate } from "@/shared/utils/date";

const AcceptanceRateChart = dynamic(
  () => import("@/presentation/components/charts/acceptance-rate-chart").then((m) => m.AcceptanceRateChart),
  {
    loading: () => <div className="w-full h-[250px] bg-zinc-50 rounded-xl animate-pulse" />,
  }
);

const ConferenceKeywordChart = dynamic(
  () => import("@/presentation/components/charts/conference-keyword-chart").then((m) => m.ConferenceKeywordChart),
  {
    loading: () => <div className="w-full h-[300px] bg-zinc-50 rounded-xl animate-pulse" />,
  }
);
import { formatAuthors } from "@/shared/utils/url";
import { AWARD_TYPE_LABELS } from "@/domain/entities/best-paper";
import { InfoTooltip } from "@/presentation/components/ui/info-tooltip";
import { LocaleText } from "@/presentation/components/ui/locale-text";
import { InstitutionRatings } from "@/presentation/components/conferences/institution-ratings";
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
  const acronym = slug.toUpperCase();
  const year = new Date().getFullYear();
  const title = `${acronym} ${year} - Deadline, Acceptance Rate, Best Paper`;
  const description = `${acronym} ${year} deadline, acceptance rate, best paper awards. CORE/CCF rankings included.`;
  // TODO: metadata is English-only for now. Consider making locale-aware
  // once headers() usage is resolved for performance (see PERF-004 / I18N-004).
  return {
    title,
    description,
    keywords: [`${acronym} deadline`, `${acronym} ${year} deadline`, `${acronym} acceptance rate`, `${acronym} best paper`, `${acronym} CFP`, `${acronym} 데드라인`, `${acronym} 채택률`],
    openGraph: {
      title,
      description,
      url: `https://cs-pedia.io/conferences/${slug}`,
      siteName: "CS-Pedia",
      locale: "en_US",
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
    nextDeadline: detail.nextDeadline ? new Date(detail.nextDeadline as string) : null,
    daysUntilDeadline: (() => {
      if (!detail.nextDeadline) return null;
      const d = new Date(detail.nextDeadline as string);
      const TZ: Record<string, number> = { AoE: -12, HST: -10, PST: -8, PT: -8, PDT: -7, EST: -5, EDT: -4, UTC: 0, GMT: 0, CET: 1 };
      const offset = TZ[(detail.deadlineTimezone as string) ?? "AoE"] ?? -12;
      const utc = new Date(d.getTime() - offset * 60 * 60 * 1000);
      return Math.ceil((utc.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    })(),
    deadlineTimezone: detail.deadlineTimezone as string,
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
    timezone: d.timezone as string,
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

  return (
    <div
      className="min-h-screen bg-page-gradient"
    >
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

      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6">
        {/* 뒤로가기 */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700 mb-6"
        >
          <LocaleText ko="← 학회 목록으로" en="← Back to list" />
        </Link>

        {/* 학회 헤더 */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200/80 p-6 mb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">
                  {conference.acronym}
                </h1>
                <FieldBadge field={conference.field} />
                <DeadlineBadge ddays={conference.daysUntilDeadline} />
              </div>
              <p className="text-zinc-500 mb-3">{conference.nameEn}</p>
              <div className="flex items-center gap-3 flex-wrap">
                {conference.websiteUrl && (
                  <a
                    href={conference.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs px-3 py-2 rounded-lg border border-indigo-200 text-indigo-500 hover:text-indigo-700 hover:border-indigo-300 hover:bg-indigo-50 transition-all"
                  >
                    <LocaleText ko="공식 웹사이트" en="Official Website" />
                  </a>
                )}
                <a
                  href={`https://mail.google.com/mail/?view=cm&to=contact@cs-pedia.io&su=${encodeURIComponent(`[Error Report] ${conference.acronym}`)}&body=${encodeURIComponent(`Conference: ${conference.acronym} (${conference.nameEn})\nPage: https://cs-pedia.io/conferences/${slug}\n\nError details:\n`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs px-3 py-2 rounded-lg border border-red-200 text-red-400 hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-all"
                >
                  <LocaleText ko="정보 오류 신고" en="Report Error" />
                </a>
              </div>
            </div>
            <BookmarkButton
              conferenceId={conference.id}
              initialBookmarked={false}
              isLoggedIn={false}
            />
          </div>
        </div>

        {/* 기관 인정 현황 / Rankings */}
        <InstitutionRatings ratings={ratings} />

        {/* 데드라인 이력 */}
        {deadlines.length > 0 && (
          <Section title={<LocaleText ko="데드라인" en="Deadlines" />}>
            <div className="space-y-3">
              {deadlines.map((d) => (
                <div
                  key={`${d.year}-${d.cycle}`}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-0 p-3 rounded-xl bg-zinc-50 border border-zinc-100"
                >
                  <div>
                    <div className="text-sm font-medium text-zinc-800">
                      {d.year} {d.cycle && `(${d.cycle})`}
                    </div>
                    <div className="text-xs text-zinc-400 mt-0.5">
                      {d.venue && `📍 ${d.venue}`}
                    </div>
                  </div>
                  <div className="text-xs text-zinc-500 sm:text-right">
                    {(d.paperDeadline || d.conferenceStart) && (
                      <>
                        <div>📝 <LocaleText ko="마감" en="Deadline" />: {d.paperDeadline ? <DeadlineLocalTime deadline={d.paperDeadline} timezone={d.timezone} /> : "TBD"}</div>
                        <div>📅 <LocaleText ko="학회" en="Conference" />: {d.conferenceStart ? formatDate(d.conferenceStart) : "TBD"}</div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-zinc-400">
              <LocaleText
                ko="데드라인은 변경될 수 있습니다. 제출 전 공식 웹사이트에서 최종 일정을 확인하세요."
                en="Deadlines may change. Always verify on the official website before submitting."
              />
            </p>
          </Section>
        )}

        {/* Acceptance Rate */}
        {acceptanceRates.length === 0 && (
          <Section title={<>Acceptance Rate<InfoTooltip text="DBLP / OpenAlex에서 수집한 채택 논문 수 기반으로 산출합니다. 채택률 = 채택 수 ÷ 제출 수이며, 제출 수가 없는 경우 채택 수만 표시됩니다." textEn="Calculated from accepted paper counts collected from DBLP / OpenAlex. Rate = accepted ÷ submitted. If submission count is unavailable, only accepted count is shown." /></>}>
            <p className="text-sm text-zinc-400"><LocaleText ko="채택률 데이터가 없습니다." en="No acceptance rate data available." /></p>
          </Section>
        )}
        {acceptanceRates.length > 0 && (
          <Section title={<>Acceptance Rate<InfoTooltip text="DBLP / OpenAlex에서 수집한 채택 논문 수 기반으로 산출합니다. 채택률 = 채택 수 ÷ 제출 수이며, 제출 수가 없는 경우 채택 수만 표시됩니다." textEn="Calculated from accepted paper counts collected from DBLP / OpenAlex. Rate = accepted ÷ submitted. If submission count is unavailable, only accepted count is shown." /></>}>
            <AcceptanceRateChart data={acceptanceRates} />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-zinc-500 border-b border-zinc-100">
                    <th className="pb-2 font-medium"><LocaleText ko="연도" en="Year" /></th>
                    <th className="pb-2 font-medium text-right"><LocaleText ko="제출" en="Submitted" /></th>
                    <th className="pb-2 font-medium text-right"><LocaleText ko="채택" en="Accepted" /></th>
                    <th className="pb-2 font-medium text-right"><LocaleText ko="채택률" en="Rate" /></th>
                    <th className="pb-2 font-medium" style={{ width: "40%" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {acceptanceRates.map((ar) => {
                    const computedRate = ar.rate ?? (ar.submitted && ar.accepted ? Math.round((ar.accepted / ar.submitted) * 100 * 10) / 10 : null);
                    return (
                    <tr key={ar.year} className="border-b border-zinc-50">
                      <td className="py-2.5 font-medium text-zinc-800">{ar.year}</td>
                      <td className="py-2.5 text-right text-zinc-600">
                        {ar.submitted?.toLocaleString() ?? "—"}
                      </td>
                      <td className="py-2.5 text-right text-zinc-600">
                        {ar.accepted?.toLocaleString() ?? "—"}
                      </td>
                      <td className="py-2.5 text-right font-medium text-indigo-600">
                        {computedRate != null ? `${computedRate}%` : "—"}
                      </td>
                      <td className="py-2.5 pl-3">
                        {computedRate != null && (
                          <div className="w-full bg-zinc-100 rounded-full h-2">
                            <div
                              className="bg-indigo-500 h-2 rounded-full transition-all"
                              style={{ width: `${Math.min(computedRate, 100)}%` }}
                            />
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
          <Section title={<>Research Trend<InfoTooltip text="Semantic Scholar에서 수집한 채택 논문 제목 기반으로 CS 키워드 빈도를 분석합니다. 2년 이상 데이터가 있을 경우 연도별 추이를 확인할 수 있습니다." textEn="Analyzes CS keyword frequency from accepted paper titles collected via Semantic Scholar. Year-over-year trends are shown when data spans 2+ years." /></>}>
            <ConferenceKeywordChart data={keywordTrends} />
          </Section>
        )}

        {/* Best Papers */}
        {bestPapers.length > 0 && (
          <Section title="Best Papers">
            <div className="space-y-3">
              {[...bestPapers].sort((a, b) => b.year - a.year).map((bp) => (
                <div
                  key={`${bp.year}-${bp.paperTitle.slice(0, 20)}`}
                  className="p-4 rounded-xl bg-indigo-50 border border-indigo-100"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-indigo-600">
                      🏆 {bp.year}
                    </span>
                    <span className="text-xs text-zinc-400">
                      {AWARD_TYPE_LABELS[bp.awardType as keyof typeof AWARD_TYPE_LABELS] ?? bp.awardType}
                    </span>
                  </div>
                  {bp.paperUrl ? (
                    <a
                      href={bp.paperUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-zinc-800 hover:text-indigo-600 transition-colors"
                    >
                      {bp.paperTitle}
                    </a>
                  ) : (
                    <div className="font-medium text-zinc-800">
                      {bp.paperTitle}
                    </div>
                  )}
                  {bp.authors && (
                    <div className="text-sm text-zinc-500 mt-1">
                      {formatAuthors(bp.authors)}
                    </div>
                  )}
                  {bp.tags.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {bp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 bg-white rounded-md text-zinc-500 border border-zinc-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

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
    <div className="bg-white rounded-2xl shadow-sm border border-zinc-200/80 p-6 mb-6">
      <h2 className="text-lg font-bold text-zinc-900 mb-4 flex items-center">{title}</h2>
      {children}
    </div>
  );
}
