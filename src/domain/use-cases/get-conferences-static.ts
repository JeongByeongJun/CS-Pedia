import type { ConferenceWithRelations } from "../repositories/conference-repository";
import type { Conference } from "../entities/conference";

interface StaticConference {
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
  latestBestPapers: Array<{ title: string; year: number; awardType: string }>;
}

function toDate(v: string | null): Date | null {
  if (!v) return null;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d;
}

function recalcDaysUntil(deadline: string | null): number | null {
  if (!deadline) return null;
  const d = new Date(deadline);
  if (isNaN(d.getTime())) return null;
  return Math.floor((d.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

export function createGetConferencesFromStatic() {
  return async (): Promise<ConferenceWithRelations[]> => {
    // Dynamic import to read from public/data at runtime
    const fs = await import("fs");
    const path = await import("path");
    const filePath = path.join(process.cwd(), "public/data/conferences.json");
    const raw = fs.readFileSync(filePath, "utf8");
    const items: StaticConference[] = JSON.parse(raw);

    return items.map((c) => ({
      id: c.slug,
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
      daysUntilDeadline: recalcDaysUntil(c.nextDeadline),
      deadlineTimezone: c.deadlineTimezone,
      venue: c.venue,
      conferenceStart: toDate(c.conferenceStart),
      conferenceEnd: toDate(c.conferenceEnd),
      institutionRatings: c.institutionRatings,
      latestBestPapers: c.latestBestPapers,
    }));
  };
}
