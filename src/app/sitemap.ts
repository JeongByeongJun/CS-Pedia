import type { MetadataRoute } from "next";
import { getConferences } from "@/infrastructure/container";
import { SITE } from "@/shared/constants/site";

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
    bestPaperSlugs = [...new Set(papers.map((p) => p.conferenceSlug))];
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
    ...conferenceUrls,
    ...bestPaperUrls,
  ];
}
