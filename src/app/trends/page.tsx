import type { Metadata } from "next";
import { getAllAcceptanceRates } from "@/infrastructure/container";
import { createSupabaseServerClient } from "@/infrastructure/supabase/server";
import { getBookmarkCount } from "@/app/actions/bookmark";
import { SiteHeader } from "@/presentation/components/layout/site-header";
import { SiteFooter } from "@/presentation/components/layout/site-footer";
import { MultiConferenceChart } from "@/presentation/components/charts/multi-conference-chart";

export const metadata: Metadata = {
  title: "Trends - Acceptance Rate 추이",
  description:
    "CS 주요 학회 Acceptance Rate 추이를 비교 분석하세요. 연도별, 분야별 채택률 변화를 한눈에.",
};

export const revalidate = 86400;

export default async function TrendsPage() {
  const [allRates, supabase] = await Promise.all([
    getAllAcceptanceRates(),
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

  // Group by conference
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

  // Only conferences with 2+ data points
  const conferences = [...confMap.values()]
    .filter((c) => c.rates.length >= 2)
    .sort((a, b) => a.acronym.localeCompare(b.acronym));

  const fields = [...new Set(conferences.map((c) => c.field))].sort();

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #fafafa 0%, #f0f4ff 50%, #faf0ff 100%)",
      }}
    >
      <SiteHeader
        upcomingCount={0}
        totalCount={0}
        bookmarkCount={bookmarkCount}
        user={authUser}
      />

      <main className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-zinc-900 mb-2">
          Acceptance Rate Trends
        </h1>
        <p className="text-sm text-zinc-500 mb-6">
          학회별 채택률 추이를 비교하세요. 분야 필터와 학회 토글로 원하는 학회만
          선택할 수 있습니다.
        </p>

        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200/80 p-6">
          <MultiConferenceChart conferences={conferences} fields={fields} />
        </div>

        <SiteFooter />
      </main>
    </div>
  );
}
