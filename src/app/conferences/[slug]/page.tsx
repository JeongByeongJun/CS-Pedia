import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { getConferenceDetail, getKeywordTrendsByConference } from "@/infrastructure/container";
import { createSupabaseServerClient } from "@/infrastructure/supabase/server";
import { getBookmarkStatus } from "@/app/actions/bookmark";
import { SiteHeader } from "@/presentation/components/layout/site-header";
import { SiteFooter } from "@/presentation/components/layout/site-footer";
import { FieldBadge } from "@/presentation/components/conferences/field-badge";
import { DeadlineBadge } from "@/presentation/components/conferences/deadline-badge";
import { BookmarkButton } from "@/presentation/components/conferences/bookmark-button";
import { AcceptanceRateChart } from "@/presentation/components/charts/acceptance-rate-chart";
import { ConferenceKeywordChart } from "@/presentation/components/charts/conference-keyword-chart";
import { formatDate } from "@/shared/utils/date";
import { formatAuthors } from "@/shared/utils/url";
import { AWARD_TYPE_LABELS } from "@/domain/entities/best-paper";
import { INSTITUTIONS } from "@/shared/constants/institutions";
import { InfoTooltip } from "@/presentation/components/ui/info-tooltip";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 86400;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const country = (await headers()).get("x-vercel-ip-country");
  const isKorean = !country || country === "KR";
  const acronym = slug.toUpperCase();
  const year = new Date().getFullYear();
  return {
    title: isKorean
      ? `${acronym} ${year} - 데드라인, 채택률, Best Paper`
      : `${acronym} ${year} - Deadline, Acceptance Rate, Best Paper`,
    description: isKorean
      ? `${acronym} ${year} 데드라인, 채택률, Best Paper 수상작. BK21/KIISE 인정 여부 포함.`
      : `${acronym} ${year} deadline, acceptance rate, best paper awards. Includes BK21/KIISE recognition.`,
    keywords: isKorean
      ? [`${acronym} 데드라인`, `${acronym} ${year} 마감`, `${acronym} 채택률`, `${acronym} best paper`, `${acronym} CFP`]
      : [`${acronym} deadline`, `${acronym} ${year} deadline`, `${acronym} acceptance rate`, `${acronym} best paper`, `${acronym} CFP`],
  };
}

export default async function ConferenceDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let result;
  try {
    result = await getConferenceDetail(slug);
  } catch {
    notFound();
  }
  if (!result) notFound();

  const { conference, deadlines, bestPapers, ratings, acceptanceRates } = result;

  const country = (await headers()).get("x-vercel-ip-country");
  const isKorean = !country || country === "KR";

  const [keywordTrends, supabase] = await Promise.all([
    getKeywordTrendsByConference(conference.id).catch(() => []),
    createSupabaseServerClient(),
  ]);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isBookmarked = await getBookmarkStatus(conference.id);

  const authUser = user
    ? {
        email: user.email!,
        name: user.user_metadata?.full_name ?? user.user_metadata?.name,
        avatarUrl: user.user_metadata?.avatar_url,
      }
    : null;

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
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #fafafa 0%, #f0f4ff 50%, #faf0ff 100%)",
      }}
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
      <SiteHeader user={authUser} />

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* 뒤로가기 */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700 mb-6"
        >
          {isKorean ? "← 학회 목록으로" : "← Back to list"}
        </Link>

        {/* 학회 헤더 */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200/80 p-6 mb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-zinc-900">
                  {conference.acronym}
                </h1>
                <FieldBadge field={conference.field} />
                <DeadlineBadge ddays={conference.daysUntilDeadline} />
              </div>
              <p className="text-zinc-500 mb-3">{conference.nameEn}</p>
              <div className="flex items-center gap-4">
                {conference.websiteUrl && (
                  <a
                    href={conference.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    {isKorean ? "🌐 공식 웹사이트" : "🌐 Official Website"}
                  </a>
                )}
                <a
                  href={`mailto:contact@cs-pedia.io?subject=${encodeURIComponent(`[오류 신고] ${conference.acronym}`)}&body=${encodeURIComponent(`학회: ${conference.acronym} (${conference.nameEn})\n페이지: https://cs-pedia.io/conferences/${slug}\n\n오류 내용:\n`)}`}
                  className="text-sm text-zinc-400 hover:text-zinc-600"
                >
                  {isKorean ? "⚠️ 정보 오류 신고" : "⚠️ Report an error"}
                </a>
              </div>
            </div>
            <BookmarkButton
              conferenceId={conference.id}
              initialBookmarked={isBookmarked}
              isLoggedIn={!!user}
            />
          </div>
        </div>

        {/* 기관 인정 현황 — KR only */}
        {isKorean && <Section title={<>기관 인정 현황<InfoTooltip text="BK21: 2018년 BK21플러스 점수 기준 (1~4점) · KIISE: 2024년 한국정보과학회 기준 (최우수/우수) · POSTECH: 2026년 기준 (최우수/우수) · KAIST: 2022년 인정 기준 · SNU: 2024년 인정 기준. 기준이 개정될 수 있으니 중요한 사항은 소속 기관에 직접 확인하세요." /></>}>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {INSTITUTIONS.map((inst) => {
              const rating = ratings.find((r) => r.institution === inst);
              const displayTier = rating
                ? inst === "BK21" && rating.tier
                  ? `${rating.tier}점`
                  : rating.tier ?? "✓"
                : "—";
              return (
                <div
                  key={inst}
                  className={`rounded-xl p-3 text-center border ${
                    rating
                      ? "bg-emerald-50 border-emerald-200"
                      : "bg-zinc-50 border-zinc-200"
                  }`}
                >
                  <div className="text-xs text-zinc-500 mb-1">{inst}</div>
                  <div
                    className={`text-lg font-bold ${rating ? "text-emerald-700" : "text-zinc-300"}`}
                  >
                    {displayTier}
                  </div>
                </div>
              );
            })}
          </div>
        </Section>}

        {/* 데드라인 이력 */}
        {deadlines.length > 0 && (
          <Section title={isKorean ? "데드라인" : "Deadlines"}>
            <div className="space-y-3">
              {deadlines.map((d) => (
                <div
                  key={d.id}
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
                        <div>📝 {isKorean ? "마감" : "Deadline"}: {d.paperDeadline ? formatDate(d.paperDeadline) : "TBD"}</div>
                        <div>📅 {isKorean ? "학회" : "Conference"}: {d.conferenceStart ? formatDate(d.conferenceStart) : "TBD"}</div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-zinc-400">
              {isKorean
                ? "데드라인은 변경될 수 있습니다. 제출 전 공식 웹사이트에서 최종 일정을 확인하세요."
                : "Deadlines may change. Always verify on the official website before submitting."}
            </p>
          </Section>
        )}

        {/* Acceptance Rate */}
        {acceptanceRates.length === 0 && (
          <Section title={<>Acceptance Rate<InfoTooltip text={isKorean ? "DBLP / OpenAlex에서 수집한 채택 논문 수 기반으로 산출합니다. 채택률 = 채택 수 ÷ 제출 수이며, 제출 수가 없는 경우 채택 수만 표시됩니다." : "Calculated from accepted paper counts collected from DBLP / OpenAlex. Rate = accepted ÷ submitted. If submission count is unavailable, only accepted count is shown."} /></>}>
            <p className="text-sm text-zinc-400">{isKorean ? "채택률 데이터가 없습니다." : "No acceptance rate data available."}</p>
          </Section>
        )}
        {acceptanceRates.length > 0 && (
          <Section title={<>Acceptance Rate<InfoTooltip text={isKorean ? "DBLP / OpenAlex에서 수집한 채택 논문 수 기반으로 산출합니다. 채택률 = 채택 수 ÷ 제출 수이며, 제출 수가 없는 경우 채택 수만 표시됩니다." : "Calculated from accepted paper counts collected from DBLP / OpenAlex. Rate = accepted ÷ submitted. If submission count is unavailable, only accepted count is shown."} /></>}>
            <AcceptanceRateChart data={acceptanceRates} />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-zinc-500 border-b border-zinc-100">
                    <th className="pb-2 font-medium">{isKorean ? "연도" : "Year"}</th>
                    <th className="pb-2 font-medium text-right">{isKorean ? "제출" : "Submitted"}</th>
                    <th className="pb-2 font-medium text-right">{isKorean ? "채택" : "Accepted"}</th>
                    <th className="pb-2 font-medium text-right">{isKorean ? "채택률" : "Rate"}</th>
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
          <Section title={<>Research Trend<InfoTooltip text={isKorean ? "Semantic Scholar에서 수집한 채택 논문 제목 기반으로 CS 키워드 빈도를 분석합니다. 2년 이상 데이터가 있을 경우 연도별 추이를 확인할 수 있습니다." : "Analyzes CS keyword frequency from accepted paper titles collected via Semantic Scholar. Year-over-year trends are shown when data spans 2+ years."} /></>}>
            <ConferenceKeywordChart data={keywordTrends} />
          </Section>
        )}

        {/* Best Papers */}
        {bestPapers.length > 0 && (
          <Section title="Best Papers">
            <div className="space-y-3">
              {bestPapers.map((bp) => (
                <div
                  key={bp.id}
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
