import type { Metadata } from "next";
import { headers } from "next/headers";
import { getBestPapers } from "@/infrastructure/container";
import { createSupabaseServerClient } from "@/infrastructure/supabase/server";
import { SiteHeader } from "@/presentation/components/layout/site-header";
import { SiteFooter } from "@/presentation/components/layout/site-footer";
import { BestPaperClientSection } from "@/presentation/components/best-papers/best-paper-client-section";

export async function generateMetadata(): Promise<Metadata> {
  const country = (await headers()).get("x-vercel-ip-country");
  const isKorean = !country || country === "KR";
  return {
    title: isKorean ? "Best Papers — CS-Pedia" : "Best Papers — CS-Pedia",
    description: isKorean
      ? "CS 주요 학회 Best Paper 수상작 아카이브. 연도별, 학회별로 확인하세요."
      : "Best Paper award archive across top CS conferences. Browse by year and venue.",
  };
}

export const revalidate = 86400;

export default async function BestPapersPage() {
  const [papers, supabase] = await Promise.all([
    getBestPapers({}),
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
        </div>

        <BestPaperClientSection papers={papers} />

        <SiteFooter />
      </main>
    </div>
  );
}
