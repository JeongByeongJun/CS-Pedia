import { Suspense } from "react";
import type { Metadata } from "next";
import { getBestPapers } from "@/infrastructure/container";
import { createSupabaseServerClient } from "@/infrastructure/supabase/server";
import { getBookmarkCount } from "@/app/actions/bookmark";
import { SiteHeader } from "@/presentation/components/layout/site-header";
import { SiteFooter } from "@/presentation/components/layout/site-footer";
import { BestPaperFilters } from "@/presentation/components/best-papers/best-paper-filters";
import { BestPaperList } from "@/presentation/components/best-papers/best-paper-list";

export const metadata: Metadata = {
  title: "Best Papers",
  description:
    "CS 주요 학회 Best Paper 수상작 아카이브. 연도별, 학회별로 확인하세요.",
};

interface PageProps {
  searchParams: Promise<{
    year?: string;
    conference?: string;
  }>;
}

export const revalidate = 86400;

export default async function BestPapersPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const filters = {
    year: params.year ? parseInt(params.year) : undefined,
  };

  const [papers, supabase] = await Promise.all([
    getBestPapers(filters),
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

  // 연도 목록 추출
  const years = [...new Set(papers.map((p) => p.year))].sort((a, b) => b - a);
  // 학회 목록 추출
  const conferences = [
    ...new Set(papers.map((p) => p.conferenceAcronym)),
  ].sort();

  // 학회 필터 (클라이언트 사이드에서 처리하지 않고 서버에서)
  const filtered = params.conference
    ? papers.filter((p) => p.conferenceAcronym === params.conference)
    : papers;

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

      <main className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-zinc-900 mb-6">
          🏆 Best Paper Archive
        </h1>

        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200/80 p-5 mb-6">
          <Suspense fallback={null}>
            <BestPaperFilters
              years={years}
              conferences={conferences}
              selectedYear={params.year}
              selectedConference={params.conference}
            />
          </Suspense>
        </div>

        <BestPaperList papers={filtered} />

        <SiteFooter />
      </main>
    </div>
  );
}
