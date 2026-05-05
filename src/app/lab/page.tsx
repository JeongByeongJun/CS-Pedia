import type { Metadata } from "next";
import Link from "next/link";
import { AuthNav } from "@/presentation/components/auth/auth-nav";
import { SiteFooter } from "@/presentation/components/layout/site-footer";
import { LabClientSection } from "@/presentation/components/lab/lab-client-section";
import type { ProfessorWithPublicationCount } from "@/presentation/components/lab/professor-card";

export const metadata: Metadata = {
  title: "한국 CS 연구실",
  description: "국내 주요 대학 CS 교수진의 국제 학회 논문 현황을 한눈에 확인하세요.",
  openGraph: {
    title: "한국 CS 연구실 — CS-Pedia",
    description: "국내 주요 대학 CS 교수진의 국제 학회 논문 현황",
    url: "https://cs-pedia.io/lab",
    siteName: "CS-Pedia",
    locale: "ko_KR",
    type: "website",
  },
  alternates: {
    canonical: "https://cs-pedia.io/lab",
  },
};

export const revalidate = 3600;

async function getProfessors(): Promise<ProfessorWithPublicationCount[]> {
  const { getProfessorsUseCase } = await import("@/infrastructure/container");
  return getProfessorsUseCase.getAll();
}

export default async function LabPage() {
  const professors = await getProfessors();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "CS-Pedia", item: "https://cs-pedia.io" },
      { "@type": "ListItem", position: 2, name: "한국 CS 연구실", item: "https://cs-pedia.io/lab" },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* 헤더 */}
      <header className="relative overflow-hidden bg-header-gradient">
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.3]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Accent line — top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[linear-gradient(90deg,#6366f1,#a855f7,#ec4899,transparent)]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          {/* Navigation */}
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[linear-gradient(135deg,#6366f1,#8b5cf6)] text-sm">
                🎓
              </div>
              <span className="font-bold tracking-tight text-zinc-200 text-base font-mono tracking-[-0.02em]">
                CS-<span className="text-indigo-400">Pedia</span>
              </span>
            </Link>

            <div className="flex items-center gap-1">
              <Link
                href="/trends"
                className="hidden sm:flex items-center nav-link-hover px-3 py-1.5 text-[13px] text-zinc-300 rounded-md"
              >
                Trends
              </Link>
              <Link
                href="/best-papers"
                className="hidden sm:flex items-center nav-link-hover px-3 py-1.5 text-[13px] text-zinc-300 rounded-md"
              >
                Best Papers
              </Link>
              <Link
                href="/lab"
                className="hidden sm:flex items-center px-3 py-1.5 text-[13px] text-indigo-400 rounded-md font-medium"
              >
                Lab
              </Link>
              <AuthNav />
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/[0.06]" />

          {/* Hero */}
          <div className="pt-5 pb-6 sm:pt-8 sm:pb-8">
            <div className="font-medium hidden sm:block text-[11px] tracking-[0.15em] uppercase text-indigo-400 mb-3 font-mono">
              Korean CS Lab Directory
            </div>
            <h1 className="font-bold text-[22px] sm:text-[clamp(24px,3.5vw,32px)] leading-[1.2] tracking-[-0.025em] text-zinc-50 mb-2">
              한국 CS 연구실
            </h1>
            <p className="text-[13px] text-zinc-500 leading-relaxed max-w-[420px]">
              국내 주요 대학 교수진의 국제 Top 학회 논문 현황을 확인하세요.
            </p>
          </div>
        </div>

        <div className="h-px bg-white/[0.05]" />
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 sm:px-6">
        <LabClientSection professors={professors} />
        <SiteFooter />
      </main>
    </div>
  );
}
