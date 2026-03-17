import { fetchDblpPaperCounts } from "./sources/dblp";
import { fetchOpenAlexWorksCounts } from "./sources/openalex";
import { fetchDblpPaperTitles } from "./sources/dblp-titles";
import { extractKeywords } from "./keywords";
import {
  getConferenceSlugsAndIds,
  upsertAcceptanceRates,
  upsertKeywordTrends,
} from "./supabase-writer";

async function run() {
  console.log("Starting data pipeline...\n");

  const conferences = await getConferenceSlugsAndIds();
  console.log(`Found ${conferences.size} conferences in DB\n`);

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

    console.log(
      `[${processed}/${total}] ${slug} (DBLP: ${conf.dblpKey})...`,
    );

    // Fetch from DBLP
    const dblpData = await fetchDblpPaperCounts(conf.dblpKey);

    // Fetch from OpenAlex
    const oaData = await fetchOpenAlexWorksCounts(conf.nameEn);

    // Merge: prefer DBLP for paper counts, supplement with OpenAlex
    const yearData = new Map<number, number>();
    for (const d of oaData) {
      yearData.set(d.year, d.worksCount);
    }
    for (const d of dblpData) {
      yearData.set(d.year, d.numberOfPapers); // DBLP overrides
    }

    for (const [year, accepted] of yearData) {
      if (year < 2020) continue; // Only recent data
      newRates.push({
        conference_id: conf.id,
        year,
        accepted,
        rate: null, // Can't calculate without submission count
        notes: "pipeline:dblp+openalex",
      });
    }

    if (dblpData.length > 0 || oaData.length > 0) {
      console.log(
        `  → DBLP: ${dblpData.length} years, OpenAlex: ${oaData.length} years`,
      );
    }
  }

  // Write to Supabase
  if (newRates.length > 0) {
    console.log(`\nUpserting ${newRates.length} acceptance rate entries...`);
    const count = await upsertAcceptanceRates(newRates);
    console.log(`  → Upserted ${count} entries`);
  } else {
    console.log("\nNo new data to upsert.");
  }

  // ── Phase 2: Keyword Trends from DBLP paper titles ──
  console.log("\n── Phase 2: Keyword Trends ──");

  let kwProcessed = 0;
  let kwTotal = 0;

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
    // Group by year
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

    // Write per-conference immediately
    if (confRows.length > 0) {
      const n = await upsertKeywordTrends(confRows);
      kwTotal += n;
      console.log(`  → Saved ${n} keyword entries`);
    }
  }

  console.log(`\nTotal keyword entries upserted: ${kwTotal}`);

  console.log("\nPipeline complete!");
}

run().catch((err) => {
  console.error("Pipeline failed:", err);
  process.exit(1);
});
