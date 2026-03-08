import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getConferenceDetail, getKeywordTrendsByConference } from "@/infrastructure/container";
import { createSupabaseServerClient } from "@/infrastructure/supabase/server";
import { getBookmarkStatus, getBookmarkCount } from "@/app/actions/bookmark";
import { SiteHeader } from "@/presentation/components/layout/site-header";
import { SiteFooter } from "@/presentation/components/layout/site-footer";
import { FieldBadge } from "@/presentation/components/conferences/field-badge";
import { DeadlineBadge } from "@/presentation/components/conferences/deadline-badge";
import { BookmarkButton } from "@/presentation/components/conferences/bookmark-button";
import { AcceptanceRateChart } from "@/presentation/components/charts/acceptance-rate-chart";
import { ConferenceKeywordChart } from "@/presentation/components/charts/conference-keyword-chart";
import { formatDate } from "@/shared/utils/date";
import { INSTITUTIONS } from "@/shared/constants/institutions";
import { InfoTooltip } from "@/presentation/components/ui/info-tooltip";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const result = await getConferenceDetail(slug);
    if (!result) return {};
    const { conference } = result;
    return {
      title: `${conference.acronym} - ${conference.nameEn}`,
      description: `${conference.acronym} 학회 정보: BK21/KIISE 인정, 데드라인, Acceptance Rate, Best Paper`,
    };
  } catch {
    return {};
  }
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

  const keywordTrends = await getKeywordTrendsByConference(conference.id).catch(() => []);

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [isBookmarked] = await Promise.all([
    getBookmarkStatus(conference.id),
    getBookmarkCount(),
  ]);

  const authUser = user
    ? {
        email: user.email!,
        name: user.user_metadata?.full_name ?? user.user_metadata?.name,
        avatarUrl: user.user_metadata?.avatar_url,
      }
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${conference.acronym} - ${conference.nameEn}`,
    description: conference.description ?? `${conference.acronym} computer science conference`,
    url: conference.websiteUrl ?? `https://cs-pedia.io/conferences/${slug}`,
    ...(conference.conferenceStart && {
      startDate: conference.conferenceStart.toISOString().split("T")[0],
    }),
    ...(conference.conferenceEnd && {
      endDate: conference.conferenceEnd.toISOString().split("T")[0],
    }),
    ...(conference.venue && {
      location: { "@type": "Place", name: conference.venue },
    }),
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #fafafa 0%, #f0f4ff 50%, #faf0ff 100%)",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader user={authUser} />

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* 뒤로가기 */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700 mb-6"
        >
          ← 학회 목록으로
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
                    🌐 공식 웹사이트
                  </a>
                )}
                <a
                  href={`mailto:contact@cs-pedia.io?subject=${encodeURIComponent(`[오류 신고] ${conference.acronym}`)}&body=${encodeURIComponent(`학회: ${conference.acronym} (${conference.nameEn})\n페이지: https://cs-pedia.io/conferences/${slug}\n\n오류 내용:\n`)}`}
                  className="text-sm text-zinc-400 hover:text-zinc-600"
                >
                  ⚠️ 정보 오류 신고
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

        {/* 기관 인정 현황 */}
        <Section title={<>기관 인정 현황<InfoTooltip text="BK21: 2018년 BK21플러스 점수 기준 (1~4점) · KIISE: 2024년 한국정보과학회 기준 (최우수/우수) · POSTECH: 2026년 기준 (최우수/우수) · KAIST: 2022년 인정 기준 · SNU: 2024년 인정 기준. 기준이 개정될 수 있으니 중요한 사항은 소속 기관에 직접 확인하세요." /></>}>
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
        </Section>

        {/* 데드라인 이력 */}
        {deadlines.length > 0 && (
          <Section title="데드라인">
            <div className="space-y-3">
              {deadlines.map((d) => (
                <div
                  key={d.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 border border-zinc-100"
                >
                  <div>
                    <div className="text-sm font-medium text-zinc-800">
                      {d.year} {d.cycle && `(${d.cycle})`}
                    </div>
                    <div className="text-xs text-zinc-400 mt-1">
                      {d.venue && `📍 ${d.venue}`}
                    </div>
                  </div>
                  <div className="text-right text-xs text-zinc-500">
                    {d.paperDeadline && (
                      <div>📝 마감: {formatDate(d.paperDeadline)}</div>
                    )}
                    {d.conferenceStart && (
                      <div>📅 학회: {formatDate(d.conferenceStart)}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-zinc-400">
              데드라인은 변경될 수 있습니다. 제출 전 공식 웹사이트에서 최종 일정을 확인하세요.
            </p>
          </Section>
        )}

        {/* Acceptance Rate */}
        {acceptanceRates.length === 0 && (
          <Section title={<>Acceptance Rate<InfoTooltip text="DBLP / OpenAlex에서 수집한 채택 논문 수 기반으로 산출합니다. 채택률 = 채택 수 ÷ 제출 수이며, 제출 수가 없는 경우 채택 수만 표시됩니다." /></>}>
            <p className="text-sm text-zinc-400">채택률 데이터가 없습니다.</p>
          </Section>
        )}
        {acceptanceRates.length > 0 && (
          <Section title={<>Acceptance Rate<InfoTooltip text="DBLP / OpenAlex에서 수집한 채택 논문 수 기반으로 산출합니다. 채택률 = 채택 수 ÷ 제출 수이며, 제출 수가 없는 경우 채택 수만 표시됩니다." /></>}>
            <AcceptanceRateChart data={acceptanceRates} />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-zinc-500 border-b border-zinc-100">
                    <th className="pb-2 font-medium">연도</th>
                    <th className="pb-2 font-medium text-right">제출</th>
                    <th className="pb-2 font-medium text-right">채택</th>
                    <th className="pb-2 font-medium text-right">채택률</th>
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
          <Section title={<>Research Trend<InfoTooltip text="Semantic Scholar에서 수집한 채택 논문 제목 기반으로 CS 키워드 빈도를 분석합니다. 2년 이상 데이터가 있을 경우 연도별 추이를 확인할 수 있습니다." /></>}>
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
                      {bp.awardType.replace(/_/g, " ")}
                    </span>
                  </div>
                  <div className="font-medium text-zinc-800">
                    {bp.paperTitle}
                  </div>
                  {bp.authors && (
                    <div className="text-sm text-zinc-500 mt-1">
                      {bp.authors}
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
