import type { ConferenceWithRelations } from "../repositories/conference-repository";
import type { Conference } from "../entities/conference";

interface StaticConference {
  id: string;
  slug: string;
  nameEn: string;
  nameKr: string | null;
  acronym: string;
  field: string;
  subField: string;
  dblpKey: string;
  websiteUrl: string;
  nextDeadline: string | null;
  daysUntilDeadline: number | null;
  deadlineTimezone: string;
  venue: string | null;
  conferenceStart: string | null;
  conferenceEnd: string | null;
  institutionRatings: Array<{ institution: string; tier: string | null }>;
  latestBestPapers: Array<{ title: string; year: number; awardType: string; paperUrl: string | null }>;
}

function toDate(v: string | null): Date | null {
  if (!v) return null;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
}

function recalcDaysUntil(deadline: string | null, timezone?: string): number | null {
  if (!deadline) return null;
  const d = new Date(deadline);
  if (isNaN(d.getTime())) return null;
  // Convert deadline from stored timezone to real UTC
  const TZ_OFFSETS: Record<string, number> = {
    AoE: -12, HST: -10, PST: -8, PT: -8, PDT: -7, MST: -7, MDT: -6,
    CST: -6, CDT: -5, EST: -5, EDT: -4, UTC: 0, GMT: 0, CET: 1, CEST: 2,
  };
  const offset = TZ_OFFSETS[timezone ?? "AoE"] ?? -12;
  const utcDeadline = new Date(d.getTime() - offset * 60 * 60 * 1000);
  return Math.ceil((utcDeadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

let cachedItems: StaticConference[] | null = null;

export function createGetConferencesFromStatic() {
  return async (): Promise<ConferenceWithRelations[]> => {
    if (!cachedItems) {
      const fs = await import("fs/promises");
      const path = await import("path");
      const filePath = path.join(process.cwd(), "public/data/conferences.json");
      const raw = await fs.readFile(filePath, "utf8");
      cachedItems = JSON.parse(raw);
    }
    const items = cachedItems!;

    return items.map((c) => ({
      id: c.id,
      slug: c.slug,
      nameEn: c.nameEn,
      nameKr: c.nameKr,
      acronym: c.acronym,
      field: c.field as Conference["field"],
      subField: c.subField,
      dblpKey: c.dblpKey,
      websiteUrl: c.websiteUrl,
      description: null,
      nextDeadline: toDate(c.nextDeadline),
      daysUntilDeadline: recalcDaysUntil(c.nextDeadline, c.deadlineTimezone),
      deadlineTimezone: c.deadlineTimezone,
      venue: c.venue,
      conferenceStart: toDate(c.conferenceStart),
      conferenceEnd: toDate(c.conferenceEnd),
      institutionRatings: c.institutionRatings,
      latestBestPapers: c.latestBestPapers,
    }));
  };
}
