import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

type BestPaperSeed = {
  conference_slug: string;
  year: number;
  paper_title: string;
  authors: string | null;
  award_type: string;
  tags: string[];
  paper_url: string | null;
};

type S2Paper = {
  title?: string;
  externalIds?: Record<string, string>;
  url?: string;
  openAccessPdf?: { url?: string } | null;
};

const S2_MATCH = "https://api.semanticscholar.org/graph/v1/paper/search/match";
const S2_SEARCH = "https://api.semanticscholar.org/graph/v1/paper/search";
const DELAY_MS = Number(process.env.S2_DELAY_MS ?? 5000);

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function keyOf(paper: BestPaperSeed) {
  return `${paper.conference_slug}|${paper.year}|${normalize(paper.paper_title)}`;
}

function similarity(a: string, b: string) {
  const aw = new Set(normalize(a).split(" ").filter(Boolean));
  const bw = new Set(normalize(b).split(" ").filter(Boolean));
  if (aw.size === 0 || bw.size === 0) return 0;

  let overlap = 0;
  for (const word of aw) {
    if (bw.has(word)) overlap++;
  }
  return overlap / Math.max(aw.size, bw.size);
}

function extractUrl(paper: S2Paper) {
  const ids = paper.externalIds ?? {};
  if (ids.ArXiv) return `https://arxiv.org/abs/${ids.ArXiv}`;
  if (paper.openAccessPdf?.url) return paper.openAccessPdf.url;
  if (ids.DOI) return `https://doi.org/${ids.DOI}`;
  if (paper.url) return paper.url;
  return null;
}

async function fetchJson(url: string) {
  const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
  if (res.status === 429) {
    await sleep(60000);
    const retry = await fetch(url, { signal: AbortSignal.timeout(20000) });
    if (!retry.ok) throw new Error(`HTTP ${retry.status}`);
    return retry.json();
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function findPaper(title: string): Promise<{ status: "found" | "not_found" | "mismatch" | "error"; matchedTitle?: string; url?: string | null; detail?: string }> {
  await sleep(DELAY_MS);

  try {
    const matchParams = new URLSearchParams({
      query: title,
      fields: "title,externalIds,url,openAccessPdf",
    });
    const matchData = await fetchJson(`${S2_MATCH}?${matchParams}`);
    const matchPapers = (matchData?.data ?? []) as S2Paper[];
    const firstMatch = matchPapers[0];
    if (firstMatch?.title) {
      const score = similarity(title, firstMatch.title);
      if (score >= 0.72 || normalize(title) === normalize(firstMatch.title)) {
        return { status: "found", matchedTitle: firstMatch.title, url: extractUrl(firstMatch) };
      }
      return { status: "mismatch", matchedTitle: firstMatch.title, url: extractUrl(firstMatch), detail: `match-score=${score.toFixed(2)}` };
    }

    await sleep(DELAY_MS);
    const searchParams = new URLSearchParams({
      query: title,
      limit: "5",
      fields: "title,externalIds,url,openAccessPdf",
    });
    const searchData = await fetchJson(`${S2_SEARCH}?${searchParams}`);
    const candidates = (searchData?.data ?? []) as S2Paper[];
    let best: { paper: S2Paper; score: number } | null = null;
    for (const candidate of candidates) {
      if (!candidate.title) continue;
      const score = similarity(title, candidate.title);
      if (!best || score > best.score) best = { paper: candidate, score };
    }

    if (!best) return { status: "not_found" };
    if (best.score >= 0.72) {
      return { status: "found", matchedTitle: best.paper.title, url: extractUrl(best.paper) };
    }
    return { status: "mismatch", matchedTitle: best.paper.title, url: extractUrl(best.paper), detail: `search-score=${best.score.toFixed(2)}` };
  } catch (error) {
    return { status: "error", detail: error instanceof Error ? error.message : "unknown error" };
  }
}

async function run() {
  const root = process.cwd();
  const seedPath = path.join(root, "src/infrastructure/seed/best-papers.json");
  const reportPath = path.join(root, "scripts/new-best-papers-verification.md");
  const current = JSON.parse(fs.readFileSync(seedPath, "utf8")) as BestPaperSeed[];
  const base = JSON.parse(execSync("git show HEAD:src/infrastructure/seed/best-papers.json", {
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024,
  })) as BestPaperSeed[];

  const baseKeys = new Set(base.map(keyOf));
  const newEntries = current
    .map((paper, index) => ({ paper, index }))
    .filter(({ paper }) => !baseKeys.has(keyOf(paper)));

  const lines = [
    "# New Best Papers Verification",
    "",
    `Generated: ${new Date().toISOString()}`,
    `New entries: ${newEntries.length}`,
    "",
    "| Status | 학회 | 연도 | Award | Title | Matched title | URL |",
    "|--------|------|------|-------|-------|---------------|-----|",
  ];

  const stats = { found: 0, not_found: 0, mismatch: 0, error: 0, urlAdded: 0 };

  for (let i = 0; i < newEntries.length; i++) {
    const { paper, index } = newEntries[i];
    const result = await findPaper(paper.paper_title);
    stats[result.status]++;

    if (result.status === "found" && result.url && !current[index].paper_url) {
      current[index].paper_url = result.url;
      stats.urlAdded++;
    }

    lines.push([
      result.status,
      paper.conference_slug,
      String(paper.year),
      paper.award_type,
      paper.paper_title.replaceAll("|", "\\|"),
      (result.matchedTitle ?? "").replaceAll("|", "\\|"),
      result.url ?? paper.paper_url ?? "",
    ].join(" | ").replace(/^/, "| ").replace(/$/, " |"));

    console.log(`[${i + 1}/${newEntries.length}] ${result.status}: ${paper.conference_slug} ${paper.year} - ${paper.paper_title}`);
    if ((i + 1) % 20 === 0) {
      fs.writeFileSync(seedPath, JSON.stringify(current, null, 2) + "\n");
      fs.writeFileSync(reportPath, lines.join("\n") + "\n");
      console.log(`  checkpoint: ${JSON.stringify(stats)}`);
    }
  }

  lines.splice(4, 0, `Stats: ${JSON.stringify(stats)}`, "");
  fs.writeFileSync(seedPath, JSON.stringify(current, null, 2) + "\n");
  fs.writeFileSync(reportPath, lines.join("\n") + "\n");
  console.log(`Done. ${JSON.stringify(stats)}`);
  console.log(`Report saved to ${reportPath}`);
}

run().catch((error) => {
  console.error("Failed:", error);
  process.exit(1);
});
