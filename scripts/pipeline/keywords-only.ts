import { fetchDblpPaperTitles } from "./sources/dblp-titles";
import { extractKeywords } from "./keywords";
import { getConferenceSlugsAndIds, upsertKeywordTrends } from "./supabase-writer";
import { createClient } from "@supabase/supabase-js";

async function run() {
  console.log("── Phase 3 only: Keyword Trends (DBLP) ──\n");

  const conferences = await getConferenceSlugsAndIds();
  console.log(`Found ${conferences.size} conferences in DB\n`);

  // Get conference end dates to filter out future conferences
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
  const { data: deadlineData } = await supabase
    .from("deadlines")
    .select("conference_id, year, conference_end");

  // Build map: conference_id → Set of years whose conference has ended
  const endedYears = new Map<string, Set<number>>();
  const today = new Date().toISOString().split("T")[0];
  for (const d of deadlineData ?? []) {
    if (d.conference_end && d.conference_end < today) {
      if (!endedYears.has(d.conference_id)) endedYears.set(d.conference_id, new Set());
      endedYears.get(d.conference_id)!.add(d.year);
    }
  }

  let kwProcessed = 0;
  let kwTotal = 0;
  const total = conferences.size;

  for (const [slug, conf] of conferences) {
    kwProcessed++;
    if (!conf.dblpKey) continue;

    console.log(`[KW ${kwProcessed}/${total}] ${slug}...`);

    const allPapers = await fetchDblpPaperTitles(conf.dblpKey, 2020);
    if (allPapers.length === 0) continue;

    // Group by year
    const papersByYear = new Map<number, typeof allPapers>();
    for (const p of allPapers) {
      if (!papersByYear.has(p.year)) papersByYear.set(p.year, []);
      papersByYear.get(p.year)!.push(p);
    }

    const confRows: {
      conference_id: string;
      year: number;
      keyword: string;
      count: number;
    }[] = [];

    for (const [year, papers] of papersByYear) {
      // Skip years where the conference hasn't ended yet
      const ended = endedYears.get(conf.id);
      if (year >= new Date().getFullYear() && (!ended || !ended.has(year))) {
        console.log(`  → ${year}: skipped (conference not ended)`);
        continue;
      }

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

  console.log(`\nTotal keyword entries upserted: ${kwTotal}`);
  console.log("Done!");
}

run().catch((err) => {
  console.error("Keywords pipeline failed:", err);
  process.exit(1);
});
