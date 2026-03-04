import { fetchS2PaperTitles } from "./sources/semantic-scholar-titles";
import { extractKeywords } from "./keywords";
import { getConferenceSlugsAndIds, upsertKeywordTrends } from "./supabase-writer";

async function run() {
  console.log("── Phase 3 only: Keyword Trends (Semantic Scholar) ──\n");

  const conferences = await getConferenceSlugsAndIds();
  console.log(`Found ${conferences.size} conferences in DB\n`);

  const currentYear = new Date().getFullYear();
  let kwProcessed = 0;
  let kwTotal = 0;
  const total = conferences.size;

  for (const [slug, conf] of conferences) {
    kwProcessed++;
    console.log(`[KW ${kwProcessed}/${total}] ${slug}...`);

    const confRows: {
      conference_id: string;
      year: number;
      keyword: string;
      count: number;
    }[] = [];

    for (let year = 2020; year <= currentYear; year++) {
      const papers = await fetchS2PaperTitles(slug, conf.acronym, year);
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
      console.log(`  → ${year}: ${papers.length} papers, ${kwCounts.size} keywords`);
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
