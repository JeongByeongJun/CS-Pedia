import { Suspense } from "react";
import type { Metadata } from "next";
import { getBestPapers } from "@/infrastructure/container";
import { createSupabaseServerClient } from "@/infrastructure/supabase/server";
import { SiteHeader } from "@/presentation/components/layout/site-header";
import { SiteFooter } from "@/presentation/components/layout/site-footer";
import { BestPaperFilters } from "@/presentation/components/best-papers/best-paper-filters";
import { BestPaperList } from "@/presentation/components/best-papers/best-paper-list";

export const metadata: Metadata = {
  title: "Best Papers — ConfKorea",
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

  const authUser = user
    ? {
        email: user.email!,
        name: user.user_metadata?.full_name ?? user.user_metadata?.name,
        avatarUrl: user.user_metadata?.avatar_url,
      }
    : null;

  const years = [...new Set(papers.map((p) => p.year))].sort((a, b) => b - a);
  const conferences = [
    ...new Set(papers.map((p) => p.conferenceAcronym)),
  ].sort();

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
      <SiteHeader user={authUser} />

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Page header */}
        <div className="mb-6">
          <div
            style={{
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#818cf8",
              marginBottom: "6px",
              fontFamily: "var(--font-geist-mono), monospace",
              fontWeight: 500,
            }}
          >
            Best Papers
          </div>
          <h1
            className="font-bold"
            style={{
              fontSize: "24px",
              letterSpacing: "-0.025em",
              color: "#18181b",
            }}
          >
            수상작 아카이브
          </h1>
          <p style={{ fontSize: "13px", color: "#a1a1aa", marginTop: "4px" }}>
            {filtered.length}개 논문 · {conferences.length}개 학회 · {years[years.length - 1]}–{years[0]}
          </p>
        </div>

        {/* Filters */}
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            border: "1px solid rgba(0,0,0,0.06)",
            padding: "20px",
            marginBottom: "24px",
          }}
        >
          <Suspense fallback={null}>
            <BestPaperFilters
              years={years}
              conferences={conferences}
              selectedYear={params.year}
              selectedConference={params.conference}
            />
          </Suspense>
        </div>

        {/* Paper list */}
        <BestPaperList papers={filtered} />

        <SiteFooter />
      </main>
    </div>
  );
}
