import type { MetadataRoute } from "next";
import { getConferences } from "@/infrastructure/container";
import { SITE } from "@/shared/constants/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const conferences = await getConferences({});

  const conferenceUrls = conferences.map((c) => ({
    url: `${SITE.url}/conferences/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
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
    ...conferenceUrls,
  ];
}
