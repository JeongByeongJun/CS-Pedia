import type { MetadataRoute } from "next";
import { getConferences } from "@/infrastructure/container";
import { SITE, BEST_PAPER_MIN_INDEXABLE } from "@/shared/constants/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const conferences = await getConferences();

  const conferenceUrls = conferences.map((c) => ({
    url: `${SITE.url}/conferences/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Best paper pages per conference
  const fs = await import("fs/promises");
  const path = await import("path");
  let bestPaperSlugs: string[] = [];
  try {
    const raw = await fs.readFile(path.join(process.cwd(), "public/data/best-papers.json"), "utf8");
    const papers = JSON.parse(raw) as Array<{ conferenceSlug: string }>;
    const counts = new Map<string, number>();
    for (const p of papers) counts.set(p.conferenceSlug, (counts.get(p.conferenceSlug) ?? 0) + 1);
    bestPaperSlugs = [...counts].filter(([, n]) => n >= BEST_PAPER_MIN_INDEXABLE).map(([slug]) => slug);
  } catch { /* ignore */ }

  const bestPaperUrls = bestPaperSlugs.map((slug) => ({
    url: `${SITE.url}/best-papers/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE.url}/best-papers`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE.url}/trends`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${SITE.url}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE.url}/references`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE.url}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.1,
    },
    {
      url: `${SITE.url}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.1,
    },
    ...conferenceUrls,
    ...bestPaperUrls,
  ];
}
