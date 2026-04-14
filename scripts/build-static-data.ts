/**
 * conferences.json + deadlines.json + institution-ratings.json + best-papers.json
 * → public/data/conferences.json (pre-joined, no DB query needed)
 *
 * Run: pnpm exec tsx scripts/build-static-data.ts
 */

import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const SEED_DIR = path.join(__dirname, "../src/infrastructure/seed");
const OUT_DIR = path.join(__dirname, "../public/data");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

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

async function main() {
  // Get slug → UUID mapping from Supabase
  let slugToId: Record<string, string> = {};
  if (supabaseUrl && serviceRoleKey) {
    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const { data } = await supabase.from("conferences").select("id, slug");
    slugToId = Object.fromEntries((data ?? []).map((c) => [c.slug, c.id]));
    console.log(`Loaded ${Object.keys(slugToId).length} conference UUIDs from Supabase`);
  } else {
    console.warn("No Supabase credentials, using slug as id");
  }

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
  const bestPapersBySlug = new Map<string, Array<{ title: string; year: number; awardType: string; paperUrl: string | null }>>();
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
        paperUrl: bp.paper_url ?? null,
      });
    }
  }

  // Build output
  const result = conferences.map((c: Record<string, unknown>) => {
    const slug = c.slug as string;
    const dl = deadlineBySlug.get(slug);
    const paperDeadline = dl?.paper_deadline ?? null;
    const daysUntil = paperDeadline
      ? Math.floor((new Date(paperDeadline).getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      : null;

    return {
      id: slugToId[slug] ?? slug,
      slug,
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
      abstractDeadline: dl?.abstract_deadline ?? null,
      notificationDate: dl?.notification_date ?? null,
      conferenceStart: dl?.conference_start ?? null,
      conferenceEnd: dl?.conference_end ?? null,
      institutionRatings: ratingsBySlug.get(c.slug as string) ?? [],
      latestBestPapers: bestPapersBySlug.get(c.slug as string) ?? [],
    };
  });

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, "conferences.json"), JSON.stringify(result));
  console.log(`Built static data: ${result.length} conferences → public/data/conferences.json`);

  // === Conference detail JSON (per slug) ===
  const detailDir = path.join(OUT_DIR, "conferences");
  fs.mkdirSync(detailDir, { recursive: true });

  // Group ALL deadlines by slug (not just next)
  const allDeadlinesBySlug = new Map<string, Deadline[]>();
  for (const d of deadlines) {
    if (!allDeadlinesBySlug.has(d.conference_slug)) allDeadlinesBySlug.set(d.conference_slug, []);
    allDeadlinesBySlug.get(d.conference_slug)!.push(d);
  }

  // Group ALL best papers by slug
  const allBestPapersBySlug = new Map<string, Array<Record<string, unknown>>>();
  for (const bp of bestPapers) {
    if (!allBestPapersBySlug.has(bp.conference_slug)) allBestPapersBySlug.set(bp.conference_slug, []);
    allBestPapersBySlug.get(bp.conference_slug)!.push(bp);
  }

  // Acceptance rates from seed
  const acceptanceRates = JSON.parse(fs.readFileSync(path.join(SEED_DIR, "acceptance-rates.json"), "utf8"));
  const ratesBySlug = new Map<string, Array<Record<string, unknown>>>();
  for (const ar of acceptanceRates) {
    if (!ratesBySlug.has(ar.conference_slug)) ratesBySlug.set(ar.conference_slug, []);
    ratesBySlug.get(ar.conference_slug)!.push(ar);
  }

  // Keyword trends from Supabase (if available)
  let keywordsByConfId = new Map<string, Array<Record<string, unknown>>>();
  if (supabaseUrl && serviceRoleKey) {
    const supabase = createClient(supabaseUrl, serviceRoleKey);
    // Fetch all keyword trends (paginated, Supabase default limit is 1000)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const kwData: any[] = [];
    let offset = 0;
    const pageSize = 1000;
    while (true) {
      const { data } = await supabase.from("keyword_trends").select("conference_id, year, keyword, count").range(offset, offset + pageSize - 1);
      if (!data || data.length === 0) break;
      kwData.push(...data);
      if (data.length < pageSize) break;
      offset += pageSize;
    }
    for (const kw of kwData ?? []) {
      if (!keywordsByConfId.has(kw.conference_id)) keywordsByConfId.set(kw.conference_id, []);
      keywordsByConfId.get(kw.conference_id)!.push(kw);
    }
    console.log(`Loaded ${(kwData ?? []).length} keyword trend entries from Supabase`);
  }

  // Also fetch acceptance rates from Supabase (pipeline adds more than seed)
  let dbRatesByConfId = new Map<string, Array<Record<string, unknown>>>();
  if (supabaseUrl && serviceRoleKey) {
    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const { data: arData } = await supabase.from("acceptance_rates").select("conference_id, year, accepted, submitted, rate, notes").limit(10000);
    for (const ar of arData ?? []) {
      if (!dbRatesByConfId.has(ar.conference_id)) dbRatesByConfId.set(ar.conference_id, []);
      dbRatesByConfId.get(ar.conference_id)!.push(ar);
    }
    console.log(`Loaded ${(arData ?? []).length} acceptance rate entries from Supabase`);
  }

  for (const c of conferences) {
    const slug = c.slug as string;
    const id = slugToId[slug] ?? slug;
    const dl = deadlineBySlug.get(slug);

    // Data-driven description generation
    const acronym = c.acronym as string;
    const nameEn = c.name_en as string;
    const confRatings = ratingsBySlug.get(slug) ?? [];
    const confBestPapers = allBestPapersBySlug.get(slug) ?? [];
    const confRates = (dbRatesByConfId.get(id) ?? []) as Array<{ year: unknown; rate: unknown; submitted: unknown }>;
    const latestRate = confRates
      .filter((r) => r.rate != null)
      .sort((a, b) => (b.year as number) - (a.year as number))[0];

    const descParts: string[] = [];
    // Deadline
    if (dl?.paper_deadline) {
      const dStr = dl.paper_deadline.split("T")[0];
      descParts.push(`Paper deadline: ${dStr}`);
    }
    // Venue & date
    if (dl?.venue && dl?.conference_start) {
      const sStr = dl.conference_start.split("T")[0];
      descParts.push(`${sStr}, ${dl.venue}`);
    } else if (dl?.venue) {
      descParts.push(dl.venue);
    }
    // Rankings
    const rankParts: string[] = [];
    for (const r of confRatings) {
      if (r.tier) rankParts.push(`${r.institution} ${r.tier}`);
    }
    if (rankParts.length > 0) descParts.push(rankParts.join(", "));
    // Acceptance rate
    if (latestRate) {
      descParts.push(`Acceptance rate ${latestRate.rate}% (${latestRate.year})`);
    }
    // Best papers
    if (confBestPapers.length > 0) {
      descParts.push(`${confBestPapers.length} best paper awards`);
    }

    const descriptionEn = descParts.length > 0
      ? `${acronym} (${nameEn}). ${descParts.join(". ")}.`
      : `${acronym} (${nameEn}).`;

    // Korean version
    const descPartsKo: string[] = [];
    if (dl?.paper_deadline) {
      descPartsKo.push(`논문 마감: ${dl.paper_deadline.split("T")[0]}`);
    }
    if (dl?.venue && dl?.conference_start) {
      descPartsKo.push(`${dl.conference_start.split("T")[0]}, ${dl.venue}`);
    } else if (dl?.venue) {
      descPartsKo.push(dl.venue);
    }
    if (rankParts.length > 0) descPartsKo.push(rankParts.join(", "));
    if (latestRate) {
      descPartsKo.push(`채택률 ${latestRate.rate}% (${latestRate.year})`);
    }
    if (confBestPapers.length > 0) {
      descPartsKo.push(`Best Paper ${confBestPapers.length}편`);
    }

    const descriptionKo = descPartsKo.length > 0
      ? `${acronym} (${nameEn}). ${descPartsKo.join(". ")}.`
      : `${acronym} (${nameEn}).`;

    const detail = {
      id,
      slug,
      nameEn: c.name_en,
      nameKr: c.name_kr,
      acronym: c.acronym,
      field: c.field,
      subField: c.sub_field,
      dblpKey: c.dblp_key,
      websiteUrl: c.website_url,
      description: null,
      descriptionEn,
      descriptionKo,
      nextDeadline: dl?.paper_deadline ?? null,
      daysUntilDeadline: dl?.paper_deadline ? Math.floor((new Date(dl.paper_deadline).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) : null,
      deadlineTimezone: dl?.timezone ?? "AoE",
      venue: dl?.venue ?? null,
      conferenceStart: dl?.conference_start ?? null,
      conferenceEnd: dl?.conference_end ?? null,
      institutionRatings: ratingsBySlug.get(slug) ?? [],
      deadlines: (allDeadlinesBySlug.get(slug) ?? []).map((d) => ({
        year: d.year,
        cycle: d.cycle,
        abstractDeadline: d.abstract_deadline,
        paperDeadline: d.paper_deadline,
        notificationDate: d.notification_date,
        conferenceStart: d.conference_start,
        conferenceEnd: d.conference_end,
        venue: d.venue,
        timezone: d.timezone,
      })),
      bestPapers: (allBestPapersBySlug.get(slug) ?? []).map((bp) => ({
        year: bp.year,
        paperTitle: bp.paper_title,
        authors: bp.authors,
        awardType: bp.award_type,
        tags: bp.tags,
        paperUrl: bp.paper_url ?? null,
      })),
      acceptanceRates: (dbRatesByConfId.get(id) ?? []).map((ar) => ({
        year: ar.year,
        accepted: ar.accepted,
        submitted: ar.submitted,
        rate: ar.rate,
      })),
      keywordTrends: (keywordsByConfId.get(id) ?? []).map((kw) => ({
        year: kw.year,
        keyword: kw.keyword,
        count: kw.count,
      })),
    };

    fs.writeFileSync(path.join(detailDir, `${slug}.json`), JSON.stringify(detail));
  }
  console.log(`Built ${conferences.length} conference detail JSONs → public/data/conferences/`);

  // === Best papers full list ===
  const allBestPapers = bestPapers.map((bp: Record<string, unknown>) => ({
    conferenceSlug: bp.conference_slug,
    conferenceAcronym: conferences.find((c: Record<string, unknown>) => c.slug === bp.conference_slug)?.acronym ?? bp.conference_slug,
    conferenceField: conferences.find((c: Record<string, unknown>) => c.slug === bp.conference_slug)?.field ?? "",
    year: bp.year,
    paperTitle: bp.paper_title,
    authors: bp.authors,
    awardType: bp.award_type,
    tags: bp.tags,
    paperUrl: bp.paper_url ?? null,
  }));
  fs.writeFileSync(path.join(OUT_DIR, "best-papers.json"), JSON.stringify(allBestPapers));
  console.log(`Built best-papers.json: ${allBestPapers.length} papers`);

  // === Trends data (acceptance rates + keyword trends) ===
  // All acceptance rates with conference info
  const allRates: Array<Record<string, unknown>> = [];
  for (const [confId, rates] of dbRatesByConfId) {
    const conf = conferences.find((c: Record<string, unknown>) => slugToId[c.slug as string] === confId);
    if (!conf) continue;
    for (const r of rates) {
      allRates.push({ ...r, conferenceSlug: conf.slug, conferenceAcronym: conf.acronym, conferenceField: conf.field });
    }
  }
  fs.writeFileSync(path.join(OUT_DIR, "acceptance-rates.json"), JSON.stringify(allRates));
  console.log(`Built acceptance-rates.json: ${allRates.length} entries`);

  // All keyword trends with conference info
  const allKeywords: Array<Record<string, unknown>> = [];
  for (const [confId, keywords] of keywordsByConfId) {
    const conf = conferences.find((c: Record<string, unknown>) => slugToId[c.slug as string] === confId);
    if (!conf) continue;
    for (const kw of keywords) {
      allKeywords.push({ ...kw, conferenceSlug: conf.slug, conferenceAcronym: conf.acronym, conferenceField: conf.field });
    }
  }
  fs.writeFileSync(path.join(OUT_DIR, "keyword-trends.json"), JSON.stringify(allKeywords));
  console.log(`Built keyword-trends.json: ${allKeywords.length} entries`);

  // Top keywords (aggregated)
  const kwCounts = new Map<string, number>();
  for (const kw of allKeywords) {
    const key = kw.keyword as string;
    kwCounts.set(key, (kwCounts.get(key) ?? 0) + (kw.count as number));
  }
  const topKeywords = [...kwCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30)
    .map(([keyword, count]) => ({ keyword, count }));
  fs.writeFileSync(path.join(OUT_DIR, "top-keywords.json"), JSON.stringify(topKeywords));
  console.log(`Built top-keywords.json: ${topKeywords.length} keywords`);
}

main().catch(console.error);
