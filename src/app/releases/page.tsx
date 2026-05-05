import type { Metadata } from "next";
import { SiteHeader } from "@/presentation/components/layout/site-header";
import { SiteFooter } from "@/presentation/components/layout/site-footer";
import { ReleasesClientSection } from "@/presentation/components/releases/releases-client-section";

export const metadata: Metadata = {
  title: "AI Releases",
  description:
    "Anthropic, OpenAI의 최신 릴리즈 노트와 YouTube 영상을 한눈에.",
  openGraph: {
    title: "AI Releases — CS-Pedia",
    description:
      "Anthropic, OpenAI의 최신 릴리즈 노트와 YouTube 영상을 한눈에.",
    url: "https://cs-pedia.io/releases",
    siteName: "CS-Pedia",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Releases — CS-Pedia",
    description:
      "Anthropic, OpenAI의 최신 릴리즈 노트와 YouTube 영상을 한눈에.",
  },
  alternates: {
    canonical: "https://cs-pedia.io/releases",
  },
};

export const revalidate = 3600;

interface ReleaseItem {
  date: string;
  title: string;
  content: string;
  source: "anthropic" | "openai";
  tags: string[];
}

interface YouTubeVideo {
  videoId: string;
  title: string;
  channelTitle: string;
  publishedAt: string;
  thumbnail: string;
  viewCount?: number;
}

interface ReleasesData {
  updatedAt: string;
  anthropic: ReleaseItem[];
  openai: ReleaseItem[];
  timeline: ReleaseItem[];
  youtubeVideos?: YouTubeVideo[];
}

export default async function ReleasesPage() {
  const fs = await import("fs/promises");
  const path = await import("path");

  let data: ReleasesData | null = null;
  try {
    const raw = await fs.readFile(
      path.join(process.cwd(), "public/data/ai-releases.json"),
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
        name: "AI Releases",
        item: "https://cs-pedia.io/releases",
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
          <ReleasesClientSection data={data} />
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
