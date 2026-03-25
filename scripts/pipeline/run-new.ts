/**
 * Temporary script: run pipeline for newly added conferences only.
 * Usage: tsx --env-file=.env.local scripts/pipeline/run-new.ts
 */
import { fetchDblpPaperCounts } from "./sources/dblp";
import { fetchOpenAlexWorksCounts } from "./sources/openalex";
import { fetchDblpPaperTitles } from "./sources/dblp-titles";
import { extractKeywords } from "./keywords";
import {
  getConferenceSlugsAndIds,
  upsertAcceptanceRates,
  upsertKeywordTrends,
} from "./supabase-writer";

const NEW_SLUGS = new Set([
  "kr","percom","podc","spaa",
  "cases","cc","codes-isss","cogsci","disc","ecoop","emsoft","esop",
  "icpp","icws","ipdps","lctes","mascots","performance","re","tacas",
  "asiaccs","avss","bibm","ccgrid","cloud","concur","cseet","fc",
  "hipc","hipeac","iccd","iclp","icmr","icsoc","ijcar","iiswc",
  "ismar","ismb","ispass","its","mass","msst","noms","nossdav",
  "recomb","sac","sas","sec","secon","sgp","soups","srds","stacs",
  "tcc","vrst",
]);

async function run() {
  console.log(`Running pipeline for ${NEW_SLUGS.size} new conferences...\n`);

  const allConfs = await getConferenceSlugsAndIds();
  const conferences = new Map(
    [...allConfs].filter(([slug]) => NEW_SLUGS.has(slug))
  );
  console.log(`Matched ${conferences.size} conferences in DB\n`);

  // Phase 1: Acceptance Rates
  console.log("── Phase 1: Acceptance Rates ──\n");
  const newRates: {
    conference_id: string;
    year: number;
    accepted: number | null;
    rate: number | null;
    notes: string | null;
  }[] = [];

  let processed = 0;
  const total = conferences.size;

  for (const [slug, conf] of conferences) {
    processed++;
    if (!conf.dblpKey) continue;

    console.log(`[${processed}/${total}] ${slug} (DBLP: ${conf.dblpKey})...`);

    const dblpData = await fetchDblpPaperCounts(conf.dblpKey);
    const oaData = await fetchOpenAlexWorksCounts(conf.nameEn);

    const yearData = new Map<number, number>();
    for (const d of oaData) yearData.set(d.year, d.worksCount);
    for (const d of dblpData) yearData.set(d.year, d.numberOfPapers);

    for (const [year, accepted] of yearData) {
      if (year < 2020) continue;
      newRates.push({
        conference_id: conf.id,
        year,
        accepted,
        rate: null,
        notes: "pipeline:dblp+openalex",
      });
    }

    if (dblpData.length > 0 || oaData.length > 0) {
      console.log(`  → DBLP: ${dblpData.length} years, OpenAlex: ${oaData.length} years`);
    }
  }

  if (newRates.length > 0) {
    console.log(`\nUpserting ${newRates.length} acceptance rate entries...`);
    const count = await upsertAcceptanceRates(newRates);
    console.log(`  → Upserted ${count} entries`);
  }

  // Phase 2: Keyword Trends
  console.log("\n── Phase 2: Keyword Trends ──\n");
  let kwTotal = 0;
  let kwProcessed = 0;

  for (const [slug, conf] of conferences) {
    kwProcessed++;
    if (!conf.dblpKey) continue;

    console.log(`[KW ${kwProcessed}/${total}] ${slug}...`);

    const confRows: {
      conference_id: string;
      year: number;
      keyword: string;
      count: number;
    }[] = [];

    const allPapers = await fetchDblpPaperTitles(conf.dblpKey, 2020);
    const papersByYear = new Map<number, typeof allPapers>();
    for (const p of allPapers) {
      if (!papersByYear.has(p.year)) papersByYear.set(p.year, []);
      papersByYear.get(p.year)!.push(p);
    }

    for (const [year, papers] of papersByYear) {
      if (papers.length === 0) continue;
      const kwCounts = new Map<string, number>();
      for (const p of papers) {
        for (const kw of extractKeywords(p.title)) {
          kwCounts.set(kw, (kwCounts.get(kw) ?? 0) + 1);
        }
      }
      for (const [keyword, count] of kwCounts) {
        confRows.push({ conference_id: conf.id, year, keyword, count });
      }
      if (kwCounts.size > 0) {
        console.log(`  → ${year}: ${papers.length} papers, ${kwCounts.size} keywords`);
      }
    }

    if (confRows.length > 0) {
      const n = await upsertKeywordTrends(confRows);
      kwTotal += n;
      console.log(`  → Saved ${n} keyword entries`);
    }
  }

  console.log(`\nTotal keyword entries: ${kwTotal}`);
  console.log("Pipeline (new conferences) complete!");
}

run().catch((err) => {
  console.error("Pipeline failed:", err);
  process.exit(1);
});
