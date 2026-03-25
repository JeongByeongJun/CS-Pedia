/**
 * Verify best paper entries by checking title against Semantic Scholar.
 * Usage: tsx scripts/verify-best-papers.ts [batch_number]
 * Batch number: 1-16 (100 papers each)
 * Outputs mismatches to scripts/verify-report-{batch}.txt
 */
import * as fs from "fs";
import * as path from "path";

const S2_MATCH = "https://api.semanticscholar.org/graph/v1/paper/search/match";
const DELAY_MS = 5000;
const BATCH_SIZE = 100;

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

async function verifyPaper(paper: {
  conference_slug: string;
  year: number;
  paper_title: string;
  paper_url: string | null;
}): Promise<{ status: "ok" | "mismatch" | "not_found" | "error"; detail?: string }> {
  await sleep(DELAY_MS);

  try {
    const params = new URLSearchParams({
      query: paper.paper_title,
      fields: "title,externalIds,url",
    });

    const res = await fetch(`${S2_MATCH}?${params}`, {
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      if (res.status === 429) {
        await sleep(60000);
        return { status: "error", detail: "rate_limited" };
      }
      return { status: "error", detail: `HTTP ${res.status}` };
    }

    const data = await res.json();
    const papers = data?.data ?? [];
    if (papers.length === 0) return { status: "not_found" };

    const match = papers[0];
    const normOurs = normalize(paper.paper_title);
    const normTheirs = normalize(match.title ?? "");

    // Check title similarity
    if (normOurs === normTheirs) return { status: "ok" };
    if (normOurs.startsWith(normTheirs.slice(0, 40)) || normTheirs.startsWith(normOurs.slice(0, 40))) {
      return { status: "ok" };
    }

    return {
      status: "mismatch",
      detail: `S2 title: "${match.title}" (ours: "${paper.paper_title}")`,
    };
  } catch {
    return { status: "error", detail: "fetch_error" };
  }
}

async function run() {
  const batchNum = parseInt(process.argv[2] ?? "1");
  if (batchNum < 1 || batchNum > 16) {
    console.error("Usage: tsx scripts/verify-best-papers.ts [1-16]");
    process.exit(1);
  }

  const filePath = path.join(process.cwd(), "src/infrastructure/seed/best-papers.json");
  const allPapers = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const withUrl = allPapers.filter((p: { paper_url: string | null }) => p.paper_url);

  const start = (batchNum - 1) * BATCH_SIZE;
  const end = Math.min(start + BATCH_SIZE, withUrl.length);
  const batch = withUrl.slice(start, end);

  console.log(`Batch ${batchNum}: verifying papers #${start + 1}-#${end} (${batch.length} papers)\n`);

  const results = { ok: 0, mismatch: 0, not_found: 0, error: 0 };
  const issues: string[] = [];

  for (let i = 0; i < batch.length; i++) {
    const p = batch[i];
    const result = await verifyPaper(p);
    results[result.status]++;

    if (result.status === "mismatch") {
      const line = `MISMATCH: ${p.conference_slug} ${p.year} — ${result.detail}`;
      issues.push(line);
      console.log(`  [${i + 1}/${batch.length}] ${line}`);
    } else if (result.status === "not_found") {
      const line = `NOT_FOUND: ${p.conference_slug} ${p.year} — "${p.paper_title}"`;
      issues.push(line);
      console.log(`  [${i + 1}/${batch.length}] ${line}`);
    } else if (result.status === "error") {
      console.log(`  [${i + 1}/${batch.length}] ERROR: ${p.conference_slug} ${p.year} — ${result.detail}`);
    } else if ((i + 1) % 20 === 0) {
      console.log(`  [${i + 1}/${batch.length}] ok so far: ${results.ok}`);
    }
  }

  const reportPath = path.join(process.cwd(), `scripts/verify-report-${batchNum}.txt`);
  const report = [
    `Batch ${batchNum} (#${start + 1}-#${end})`,
    `OK: ${results.ok}, Mismatch: ${results.mismatch}, Not Found: ${results.not_found}, Error: ${results.error}`,
    "",
    ...issues,
  ].join("\n");

  fs.writeFileSync(reportPath, report);
  console.log(`\n${report}`);
  console.log(`\nReport saved to ${reportPath}`);
}

run().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
