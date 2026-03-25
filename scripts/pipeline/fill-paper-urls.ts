/**
 * Fill missing paper_url in best-papers.json using Semantic Scholar API.
 * Uses /paper/search/match endpoint (title matching, more lenient rate limit).
 * No API key needed.
 */
import * as fs from "fs";
import * as path from "path";

const S2_MATCH = "https://api.semanticscholar.org/graph/v1/paper/search/match";
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
    });

    const res = await fetch(`${S2_MATCH}?${params}`, {
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      if (res.status === 429) {
        console.warn("  Rate limited, waiting 60s...");
        await sleep(60000);
        // Retry once
        const retry = await fetch(`${S2_MATCH}?${params}`, {
          signal: AbortSignal.timeout(15000),
        });
        if (!retry.ok) return null;
        const retryData = await retry.json();
        return extractUrl(title, retryData?.data ?? []);
      }
      return null;
    }

    const data = await res.json();
    return extractUrl(title, data?.data ?? []);
  } catch {
    return null;
  }
}

function extractUrl(title: string, papers: Array<{ title?: string; externalIds?: Record<string, string>; url?: string }>): string | null {
  if (papers.length === 0) return null;

  const p = papers[0]; // match endpoint returns best match first
  const normQuery = normalize(title);
  const normResult = normalize(p.title ?? "");

  // Require reasonable match
  if (normResult !== normQuery && !normResult.startsWith(normQuery.slice(0, 50)) && !normQuery.startsWith(normResult.slice(0, 50))) {
    return null;
  }

  const ids = p.externalIds ?? {};
  if (ids.ArXiv) return `https://arxiv.org/abs/${ids.ArXiv}`;
  if (ids.DOI) return `https://doi.org/${ids.DOI}`;
  if (p.url) return p.url;
  return null;
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
