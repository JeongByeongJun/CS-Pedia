import type { Metadata } from "next";
import { SiteHeader } from "@/presentation/components/layout/site-header";
import { SiteFooter } from "@/presentation/components/layout/site-footer";
import type { BestPaperWithConference } from "@/domain/repositories/best-paper-repository";
import { BestPaperClientSection } from "@/presentation/components/best-papers/best-paper-client-section";

async function loadBestPapers(): Promise<BestPaperWithConference[]> {
  const fs = await import("fs/promises");
  const path = await import("path");
  const raw = await fs.readFile(path.join(process.cwd(), "public/data/best-papers.json"), "utf8");
  return JSON.parse(raw);
}

export async function generateMetadata(): Promise<Metadata> {
  const count = (await loadBestPapers()).length.toLocaleString("en-US");
  const description = `209개 주요 CS 학회의 Best Paper, Distinguished Paper, Honorable Mention 수상 논문 ${count}건을 연도와 학회별로 확인하세요.`;
  return {
    title: "CS Best Paper 수상 논문 목록",
    description,
    openGraph: {
      title: "CS Best Paper 수상 논문 목록 — CS-Pedia",
      description,
      url: "https://cs-pedia.io/best-papers",
      siteName: "CS-Pedia",
      locale: "ko_KR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "CS Best Paper 수상 논문 목록 — CS-Pedia",
      description,
    },
    alternates: {
      canonical: "https://cs-pedia.io/best-papers",
    },
  };
}

export const revalidate = 86400;

export default async function BestPapersPage() {
  const papers = await loadBestPapers();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "CS-Pedia", item: "https://cs-pedia.io" },
      { "@type": "ListItem", position: 2, name: "Best Papers", item: "https://cs-pedia.io/best-papers" },
    ],
  };

  return (
    <div className="desk-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SiteHeader />

      <main id="main-content" className="desk-container">
        <BestPaperClientSection papers={papers} />

        <SiteFooter />
      </main>
    </div>
  );
}
