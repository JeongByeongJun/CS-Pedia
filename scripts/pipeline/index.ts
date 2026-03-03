import { fetchDblpPaperCounts } from "./sources/dblp";
import { fetchDblpPaperTitles } from "./sources/dblp-titles";
import { fetchOpenAlexWorksCounts } from "./sources/openalex";
import {
  buildLookupMap,
  fetchCcfDeadlines,
} from "./sources/ccf-deadlines";
import { extractKeywords } from "./keywords";
import {
  getConferenceSlugsAndIds,
  upsertAcceptanceRates,
  getExistingDeadlineKeys,
  insertDeadlines,
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

  // ── Phase 2: Deadlines from ccf-deadlines ──
  console.log("\n── Phase 2: Deadlines ──");

  const lookup = buildLookupMap(conferences);
  const ccfDeadlines = await fetchCcfDeadlines(lookup);

  if (ccfDeadlines.length > 0) {
    const existingKeys = await getExistingDeadlineKeys();
    const newDeadlines = ccfDeadlines.filter(
      (d) => !existingKeys.has(`${d.conference_id}-${d.year}-${d.cycle}`),
    );

    if (newDeadlines.length > 0) {
      console.log(`Inserting ${newDeadlines.length} new deadline entries...`);
      const count = await insertDeadlines(newDeadlines);
      console.log(`  → Inserted ${count} entries`);
    } else {
      console.log("No new deadlines to insert.");
    }
  }

  // ── Phase 3: Keyword Trends from DBLP paper titles ──
  console.log("\n── Phase 3: Keyword Trends ──");

  let kwProcessed = 0;
  let kwTotal = 0;

  for (const [slug, conf] of conferences) {
    kwProcessed++;
    if (!conf.dblpKey) continue;

    console.log(`[KW ${kwProcessed}/${total}] ${slug}...`);

    // Fetch all papers since 2020 in one call (no y= param)
    const allPapers = await fetchDblpPaperTitles(conf.dblpKey, 2020);
    if (allPapers.length === 0) continue;

    // Group by year
    const byYear = new Map<number, string[]>();
    for (const p of allPapers) {
      if (!byYear.has(p.year)) byYear.set(p.year, []);
      byYear.get(p.year)!.push(p.title);
    }

    const confRows: {
      conference_id: string;
      year: number;
      keyword: string;
      count: number;
    }[] = [];

    for (const [year, titles] of byYear) {
      const kwCounts = new Map<string, number>();
      for (const title of titles) {
        for (const kw of extractKeywords(title)) {
          kwCounts.set(kw, (kwCounts.get(kw) ?? 0) + 1);
        }
      }
      for (const [keyword, count] of kwCounts) {
        confRows.push({ conference_id: conf.id, year, keyword, count });
      }
      console.log(`  → ${year}: ${titles.length} papers, ${kwCounts.size} keywords`);
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
