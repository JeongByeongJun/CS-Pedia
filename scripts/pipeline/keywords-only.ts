import { fetchDblpPaperTitles } from "./sources/dblp-titles";
import { extractKeywords } from "./keywords";
import { getConferenceSlugsAndIds, upsertKeywordTrends } from "./supabase-writer";

async function run() {
  console.log("── Phase 3 only: Keyword Trends ──\n");

  const conferences = await getConferenceSlugsAndIds();
  console.log(`Found ${conferences.size} conferences in DB\n`);

  let kwProcessed = 0;
  let kwTotal = 0;
  const total = conferences.size;

  for (const [slug, conf] of conferences) {
    kwProcessed++;
    if (!conf.dblpKey) continue;

    console.log(`[KW ${kwProcessed}/${total}] ${slug}...`);

    // Fetch all papers since 2020 in one call (no year param = no 500 error)
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

    if (confRows.length > 0) {
      const n = await upsertKeywordTrends(confRows);
      kwTotal += n;
      console.log(`  → Saved ${n} keyword entries`);
    }
  }

  console.log(`\nTotal keyword entries upserted: ${kwTotal}`);
  console.log("Done!");
}

run().catch((err) => {
  console.error("Keywords pipeline failed:", err);
  process.exit(1);
});
