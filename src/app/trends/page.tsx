import type { Metadata } from "next";
import {
  getAllAcceptanceRates,
  getAllKeywordTrends,
  getTopKeywords,
} from "@/infrastructure/container";
import { SiteHeader } from "@/presentation/components/layout/site-header";
import { SiteFooter } from "@/presentation/components/layout/site-footer";
import { MultiConferenceChart } from "@/presentation/components/charts/multi-conference-chart";
import { TrendsTabs } from "@/presentation/components/charts/trends-tabs";
import { KeywordTrendChart } from "@/presentation/components/charts/keyword-trend-chart";
import { KeywordBarChart } from "@/presentation/components/charts/keyword-bar-chart";
import { InfoTooltip } from "@/presentation/components/ui/info-tooltip";

export const metadata: Metadata = {
  title: "Trends — CS-Pedia",
  description: "Compare acceptance rate trends and research keyword trends across top CS conferences.",
};

export const revalidate = 86400;

export default async function TrendsPage() {
  const { headers } = await import("next/headers");
  const country = (await headers()).get("x-vercel-ip-country");
  const isKorean = country === "KR";

  const [allRates, allKeywordTrends, topKeywords] =
    await Promise.all([
      getAllAcceptanceRates(),
      getAllKeywordTrends(),
      getTopKeywords(30),
    ]);

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
    <div className="min-h-screen bg-page-gradient">
      <SiteHeader />

      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">
          Trends
        </h1>
        <p className="text-sm text-zinc-500 mb-6">
          Acceptance rates &amp; keyword trends across top CS venues.
        </p>

        <TrendsTabs
          acceptanceRateContent={
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-200/80 p-6">
              <div className="flex items-center gap-1 mb-4">
                <h3
                  className="text-sm font-semibold text-zinc-700 font-mono"
                >
                  ACCEPTANCE RATE
                </h3>
                <InfoTooltip text="DBLP / OpenAlex에서 수집한 채택 논문 수를 기반으로 산출합니다. 제출 수 미제공 학회는 채택 수만 표시됩니다." textEn="Calculated from accepted paper counts collected from DBLP / OpenAlex. Conferences without submission counts show accepted count only." />
              </div>
              <MultiConferenceChart
                conferences={conferences}
                fields={arFields}
              />
            </div>
          }
          keywordTrendContent={
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-zinc-200/80 p-6">
                <div className="flex items-center gap-1 mb-4">
                  <h3
                    className="text-sm font-semibold text-zinc-700"
                    style={{ fontFamily: "var(--font-geist-mono)" }}
                  >
                    KEYWORD TREND
                  </h3>
                  <InfoTooltip text="Semantic Scholar에서 수집한 채택 논문 제목에서 CS 키워드를 추출해 연도별 등장 빈도를 집계합니다." textEn="Extracts CS keywords from accepted paper titles collected via Semantic Scholar and aggregates annual frequency." />
                </div>
                {keywordData.length > 0 ? (
                  <KeywordTrendChart
                    data={keywordData}
                    topKeywords={topKeywords}
                    fields={kwFields}
                  />
                ) : (
                  <div className="text-center py-12 text-zinc-400 text-sm">
                    {isKorean ? "키워드 데이터가 아직 수집되지 않았습니다." : "No keyword data available yet."}
                  </div>
                )}
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-zinc-200/80 p-6">
                <div className="flex items-center gap-1 mb-4">
                  <h3
                    className="text-sm font-semibold text-zinc-700"
                    style={{ fontFamily: "var(--font-geist-mono)" }}
                  >
                    TOP KEYWORDS (ALL TIME)
                  </h3>
                  <InfoTooltip text="2020년 이후 전체 학회 채택 논문에서 키워드별 총 등장 횟수를 기준으로 상위 키워드를 표시합니다." textEn="Shows top keywords ranked by total occurrences across all accepted papers since 2020." />
                </div>
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
