import type { Metadata } from "next";
import {
  getAllAcceptanceRates,
  getAllKeywordTrends,
  getTopKeywords,
} from "@/infrastructure/container";
import { createSupabaseServerClient } from "@/infrastructure/supabase/server";
import { getBookmarkCount } from "@/app/actions/bookmark";
import { SiteHeader } from "@/presentation/components/layout/site-header";
import { SiteFooter } from "@/presentation/components/layout/site-footer";
import { MultiConferenceChart } from "@/presentation/components/charts/multi-conference-chart";
import { TrendsTabs } from "@/presentation/components/charts/trends-tabs";
import { KeywordTrendChart } from "@/presentation/components/charts/keyword-trend-chart";
import { KeywordBarChart } from "@/presentation/components/charts/keyword-bar-chart";

export const metadata: Metadata = {
  title: "Trends - 학회 트렌드 분석",
  description:
    "CS 주요 학회 Acceptance Rate 추이와 키워드 트렌드를 비교 분석하세요.",
};

export const revalidate = 86400;

export default async function TrendsPage() {
  const [allRates, allKeywordTrends, topKeywords, supabase] =
    await Promise.all([
      getAllAcceptanceRates(),
      getAllKeywordTrends(),
      getTopKeywords(30),
      createSupabaseServerClient(),
    ]);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const bookmarkCount = await getBookmarkCount();

  const authUser = user
    ? {
        email: user.email!,
        name: user.user_metadata?.full_name ?? user.user_metadata?.name,
        avatarUrl: user.user_metadata?.avatar_url,
      }
    : null;

  // --- Acceptance Rate data ---
  const confMap = new Map<
    string,
    {
      slug: string;
      acronym: string;
      field: string;
      rates: { year: number; rate: number }[];
    }
  >();
  for (const r of allRates) {
    if (r.rate == null) continue;
    if (!confMap.has(r.conferenceSlug)) {
      confMap.set(r.conferenceSlug, {
        slug: r.conferenceSlug,
        acronym: r.conferenceAcronym,
        field: r.conferenceField,
        rates: [],
      });
    }
    confMap.get(r.conferenceSlug)!.rates.push({ year: r.year, rate: r.rate });
  }

  const conferences = [...confMap.values()]
    .filter((c) => c.rates.length >= 2)
    .sort((a, b) => a.acronym.localeCompare(b.acronym));

  const arFields = [...new Set(conferences.map((c) => c.field))].sort();

  // --- Keyword Trends data ---
  const keywordData = allKeywordTrends.map((d) => ({
    conferenceSlug: d.conferenceSlug,
    conferenceAcronym: d.conferenceAcronym,
    conferenceField: d.conferenceField,
    year: d.year,
    keyword: d.keyword,
    count: d.count,
  }));

  const kwFields = [
    ...new Set(allKeywordTrends.map((d) => d.conferenceField)),
  ].sort();

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #fafafa 0%, #f0f4ff 50%, #faf0ff 100%)",
      }}
    >
      <SiteHeader user={authUser} />

      <main className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">
          Trends
        </h1>
        <p className="text-sm text-zinc-500 mb-6">
          학회별 채택률 추이와 연구 키워드 트렌드를 분석하세요.
        </p>

        <TrendsTabs
          acceptanceRateContent={
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-200/80 p-6">
              <MultiConferenceChart
                conferences={conferences}
                fields={arFields}
              />
            </div>
          }
          keywordTrendContent={
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-zinc-200/80 p-6">
                <h3
                  className="text-sm font-semibold text-zinc-700 mb-4"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  KEYWORD TREND
                </h3>
                {keywordData.length > 0 ? (
                  <KeywordTrendChart
                    data={keywordData}
                    topKeywords={topKeywords}
                    fields={kwFields}
                  />
                ) : (
                  <div className="text-center py-12 text-zinc-400 text-sm">
                    키워드 데이터가 아직 수집되지 않았습니다. 파이프라인을
                    실행하세요.
                  </div>
                )}
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-zinc-200/80 p-6">
                <h3
                  className="text-sm font-semibold text-zinc-700 mb-4"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  TOP KEYWORDS (ALL TIME)
                </h3>
                <KeywordBarChart topKeywords={topKeywords} />
              </div>
            </div>
          }
        />

        <SiteFooter />
      </main>
    </div>
  );
}
