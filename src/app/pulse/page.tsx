import type { Metadata } from "next";
import { SiteHeader } from "@/presentation/components/layout/site-header";
import { SiteFooter } from "@/presentation/components/layout/site-footer";
import { PulseClientSection } from "@/presentation/components/pulse/pulse-client-section";

export const metadata: Metadata = {
  title: "CS Pulse",
  description:
    "Real-time CS community trends from Hacker News, GitHub Trending, and GeekNews.",
  openGraph: {
    title: "CS Pulse — CS-Pedia",
    description:
      "Real-time CS community trends from Hacker News, GitHub Trending, and GeekNews.",
    url: "https://cs-pedia.io/pulse",
    siteName: "CS-Pedia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CS Pulse — CS-Pedia",
    description:
      "Real-time CS community trends from Hacker News, GitHub Trending, and GeekNews.",
  },
  alternates: {
    canonical: "https://cs-pedia.io/pulse",
  },
};

export const revalidate = 3600;

interface PulseData {
  updatedAt: string;
  hotKeywords: { keyword: string; sources: number }[];
  hn: {
    title: string;
    url: string;
    score: number;
    comments: number;
    hnUrl: string;
    timestamp: number;
    keywords: string[];
  }[];
  github: {
    name: string;
    fullName: string;
    description: string;
    language: string | null;
    stars: number;
    starsToday: number;
    url: string;
    keywords: string[];
  }[];
  geeknews: {
    title: string;
    url: string;
    points: number;
    timestamp: string;
    keywords: string[];
  }[];
}

export default async function PulsePage() {
  const fs = await import("fs/promises");
  const path = await import("path");

  let data: PulseData | null = null;
  try {
    const raw = await fs.readFile(
      path.join(process.cwd(), "public/data/cs-pulse.json"),
      "utf8",
    );
    data = JSON.parse(raw);
  } catch {
    // file not generated yet
  }

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
        name: "CS Pulse",
        item: "https://cs-pedia.io/pulse",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SiteHeader />

      <main className="max-w-6xl mx-auto px-4 py-4 sm:px-6 sm:py-6">
        {data ? (
          <PulseClientSection data={data} />
        ) : (
          <div className="text-center py-20 text-zinc-500">
            데이터를 준비 중입니다. 잠시 후 다시 확인해주세요.
          </div>
        )}
        <SiteFooter />
      </main>
    </div>
  );
}
