/**
 * Fill missing paper_url in best-papers.json using Semantic Scholar API.
 * Searches by title, matches, and writes back the URL (arxiv > doi > S2).
 * No API key needed — uses public endpoint with 1 req/sec rate.
 */
import * as fs from "fs";
import * as path from "path";

const S2_SEARCH = "https://api.semanticscholar.org/graph/v1/paper/search";
const DELAY_MS = 2000;

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function normalize(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function searchPaperUrl(title: string): Promise<string | null> {
  await sleep(DELAY_MS);

  try {
    const params = new URLSearchParams({
      query: title,
      fields: "title,externalIds,url",
      limit: "3",
    });

    const res = await fetch(`${S2_SEARCH}?${params}`, {
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) {
      if (res.status === 429) {
        console.warn("  Rate limited, waiting 30s...");
        await sleep(30000);
      }
      return null;
    }

    const data = await res.json();
    const papers = data?.data ?? [];

    for (const p of papers) {
      const normQuery = normalize(title);
      const normResult = normalize(p.title ?? "");
      // Require high similarity
      if (normResult !== normQuery && !normResult.startsWith(normQuery.slice(0, 60))) {
        continue;
      }

      const ids = p.externalIds ?? {};
      // Prefer arxiv > DOI > S2 URL
      if (ids.ArXiv) return `https://arxiv.org/abs/${ids.ArXiv}`;
      if (ids.DOI) return `https://doi.org/${ids.DOI}`;
      if (p.url) return p.url;
    }
    return null;
  } catch {
    return null;
  }
}

async function run() {
  const filePath = path.join(process.cwd(), "src/infrastructure/seed/best-papers.json");
  const papers = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const missing = papers.filter((p: { paper_url: string | null }) => !p.paper_url);
  console.log(`Total papers: ${papers.length}, missing URL: ${missing.length}\n`);

  let found = 0;
  let processed = 0;

  for (const paper of missing) {
    processed++;
    if (processed % 50 === 0) {
      console.log(`[${processed}/${missing.length}] found so far: ${found}`);
    }

    const url = await searchPaperUrl(paper.paper_title);
    if (url) {
      paper.paper_url = url;
      found++;
      console.log(`  + ${paper.conference_slug} ${paper.year}: ${url}`);
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(papers, null, 2));
  console.log(`\nDone. Found ${found}/${missing.length} URLs.`);
}

run().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
