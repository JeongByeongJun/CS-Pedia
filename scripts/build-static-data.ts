/**
 * conferences.json + deadlines.json + institution-ratings.json + best-papers.json
 * → public/data/conferences.json (pre-joined, no DB query needed)
 *
 * Run: pnpm exec tsx scripts/build-static-data.ts
 */

import fs from "fs";
import path from "path";

const SEED_DIR = path.join(__dirname, "../src/infrastructure/seed");
const OUT_DIR = path.join(__dirname, "../public/data");

interface Deadline {
  conference_slug: string;
  year: number;
  cycle: string;
  abstract_deadline: string | null;
  paper_deadline: string | null;
  notification_date: string | null;
  conference_start: string;
  conference_end: string;
  venue: string;
  timezone: string;
}

function main() {
  const conferences = JSON.parse(fs.readFileSync(path.join(SEED_DIR, "conferences.json"), "utf8"));
  const deadlines: Deadline[] = JSON.parse(fs.readFileSync(path.join(SEED_DIR, "deadlines.json"), "utf8"));
  const ratings = JSON.parse(fs.readFileSync(path.join(SEED_DIR, "institution-ratings.json"), "utf8"));
  const bestPapers = JSON.parse(fs.readFileSync(path.join(SEED_DIR, "best-papers.json"), "utf8"));

  const now = new Date();

  // Group deadlines by slug → pick "next" deadline (same logic as SQL view)
  const deadlineBySlug = new Map<string, Deadline>();
  for (const slug of new Set(deadlines.map((d: Deadline) => d.conference_slug))) {
    const confDeadlines = deadlines
      .filter((d: Deadline) => d.conference_slug === slug && d.paper_deadline)
      .sort((a: Deadline, b: Deadline) => {
        const aDate = new Date(a.paper_deadline!);
        const bDate = new Date(b.paper_deadline!);
        const aFuture = aDate >= now ? 0 : 1;
        const bFuture = bDate >= now ? 0 : 1;
        if (aFuture !== bFuture) return aFuture - bFuture;
        if (aFuture === 0) return aDate.getTime() - bDate.getTime(); // future: earliest first
        return bDate.getTime() - aDate.getTime(); // past: latest first
      });
    if (confDeadlines.length > 0) {
      deadlineBySlug.set(slug, confDeadlines[0]);
    }
  }

  // Group ratings by slug
  const ratingsBySlug = new Map<string, Array<{ institution: string; tier: string | null }>>();
  for (const r of ratings) {
    if (!ratingsBySlug.has(r.conference_slug)) {
      ratingsBySlug.set(r.conference_slug, []);
    }
    ratingsBySlug.get(r.conference_slug)!.push({ institution: r.institution, tier: r.tier });
  }

  // Group best papers by slug → latest year only
  const bestPapersBySlug = new Map<string, Array<{ title: string; year: number; awardType: string }>>();
  const maxYearBySlug = new Map<string, number>();
  for (const bp of bestPapers) {
    const cur = maxYearBySlug.get(bp.conference_slug) ?? 0;
    if (bp.year > cur) maxYearBySlug.set(bp.conference_slug, bp.year);
  }
  for (const bp of bestPapers) {
    if (bp.year === maxYearBySlug.get(bp.conference_slug)) {
      if (!bestPapersBySlug.has(bp.conference_slug)) {
        bestPapersBySlug.set(bp.conference_slug, []);
      }
      bestPapersBySlug.get(bp.conference_slug)!.push({
        title: bp.paper_title,
        year: bp.year,
        awardType: bp.award_type,
      });
    }
  }

  // Build output
  const result = conferences.map((c: Record<string, unknown>) => {
    const dl = deadlineBySlug.get(c.slug as string);
    const paperDeadline = dl?.paper_deadline ?? null;
    const daysUntil = paperDeadline
      ? Math.floor((new Date(paperDeadline).getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      : null;

    return {
      slug: c.slug,
      nameEn: c.name_en,
      nameKr: c.name_kr,
      acronym: c.acronym,
      field: c.field,
      subField: c.sub_field,
      dblpKey: c.dblp_key,
      websiteUrl: c.website_url,
      nextDeadline: paperDeadline,
      daysUntilDeadline: daysUntil,
      deadlineTimezone: dl?.timezone ?? "AoE",
      venue: dl?.venue ?? null,
      conferenceStart: dl?.conference_start ?? null,
      conferenceEnd: dl?.conference_end ?? null,
      institutionRatings: ratingsBySlug.get(c.slug as string) ?? [],
      latestBestPapers: bestPapersBySlug.get(c.slug as string) ?? [],
    };
  });

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, "conferences.json"), JSON.stringify(result));

  console.log(`Built static data: ${result.length} conferences → public/data/conferences.json`);
}

main();
