import { fetchDblpPaperTitles } from "./sources/dblp-titles";
import { extractKeywords } from "./keywords";
import { getConferenceSlugsAndIds, upsertKeywordTrends } from "./supabase-writer";

const RETRY_TARGETS: { slug: string; year: number }[] = [
  { slug: "oopsla", year: 2024 },
  { slug: "nsdi", year: 2020 },
  { slug: "cloud", year: 2020 },
  { slug: "cloud", year: 2021 },
  { slug: "cloud", year: 2023 },
  { slug: "ismb", year: 2026 },
  { slug: "ispass", year: 2023 },
  { slug: "its", year: 2021 },
  { slug: "disc", year: 2020 },
  { slug: "iiswc", year: 2026 },
  { slug: "ismar", year: 2020 },
  { slug: "ismar", year: 2021 },
  { slug: "ecml-pkdd", year: 2026 },
];

async function run() {
  console.log("── Retry DBLP keyword failures ──\n");

  const conferences = await getConferenceSlugsAndIds();
  let totalRows = 0;
  const failed: { slug: string; year: number; reason: string }[] = [];

  for (const target of RETRY_TARGETS) {
    const conference = conferences.get(target.slug);
    if (!conference?.dblpKey) {
      failed.push({ ...target, reason: "missing dblp key" });
      console.log(`[${target.slug} ${target.year}] skipped: missing dblp key`);
      continue;
    }

    console.log(`[${target.slug} ${target.year}] retrying ${conference.dblpKey}...`);
    const papers = await fetchDblpPaperTitles(conference.dblpKey, target.year, target.year);
    if (papers.length === 0) {
      failed.push({ ...target, reason: "no papers fetched" });
      console.log("  -> still empty");
      continue;
    }

    const kwCounts = new Map<string, number>();
    for (const paper of papers) {
      for (const keyword of extractKeywords(paper.title)) {
        kwCounts.set(keyword, (kwCounts.get(keyword) ?? 0) + 1);
      }
    }

    const rows = [...kwCounts].map(([keyword, count]) => ({
      conference_id: conference.id,
      year: target.year,
      keyword,
      count,
    }));

    const saved = await upsertKeywordTrends(rows);
    totalRows += saved;
    console.log(`  -> ${papers.length} papers, ${kwCounts.size} keywords, saved ${saved}`);
  }

  console.log(`\nRetried ${RETRY_TARGETS.length} targets`);
  console.log(`Total keyword entries upserted: ${totalRows}`);
  if (failed.length > 0) {
    console.log("Still failed:");
    for (const item of failed) {
      console.log(`- ${item.slug} ${item.year}: ${item.reason}`);
    }
  }
}

run().catch((error) => {
  console.error("Keyword retry failed:", error);
  process.exit(1);
});
