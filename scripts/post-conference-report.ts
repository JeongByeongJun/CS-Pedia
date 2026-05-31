import fs from "node:fs";
import path from "node:path";

type DeadlineSeed = {
  conference_slug: string;
  year: number;
  cycle: string;
  conference_start: string | null;
  conference_end: string | null;
  venue: string | null;
};

type ConferenceSeed = {
  slug: string;
  acronym: string;
  name_en: string;
  field: string;
  dblp_key: string | null;
  website_url: string | null;
};

type BestPaperSeed = {
  conference_slug: string;
  year: number;
};

type DetailKeywordTrend = {
  year: number;
  keyword: string;
  count: number;
};

export type PostConferenceCandidate = {
  slug: string;
  acronym: string;
  year: number;
  field: string;
  venue: string;
  conferenceStart: string;
  conferenceEnd: string;
  daysSinceEnd: number;
  websiteUrl: string | null;
  dblpKey: string | null;
  bestPaperStatus: "done" | "check" | "too-early";
  keywordStatus: "done" | "ready" | "wait" | "no-dblp";
  keywordCount: number;
};

type Options = {
  asOf: Date;
  lookbackDays: number;
  upcomingDays: number;
  keywordLagDays: number;
};

const DEFAULT_OPTIONS: Options = {
  asOf: new Date(),
  lookbackDays: 120,
  upcomingDays: 30,
  keywordLagDays: 21,
};

function readJson<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

function toDate(date: string): Date {
  return new Date(`${date}T00:00:00Z`);
}

function dateOnly(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function formatKstDateTime(date: Date): string {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

function daysBetween(from: Date, to: Date): number {
  const dayMs = 24 * 60 * 60 * 1000;
  const fromUtc = Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate());
  const toUtc = Date.UTC(to.getUTCFullYear(), to.getUTCMonth(), to.getUTCDate());
  return Math.floor((toUtc - fromUtc) / dayMs);
}

function parseArgs(argv: string[]): Options {
  const options = { ...DEFAULT_OPTIONS };

  for (const arg of argv) {
    const [key, value] = arg.split("=");
    if (key === "--as-of" && value) options.asOf = toDate(value);
    if (key === "--lookback-days" && value) options.lookbackDays = Number(value);
    if (key === "--upcoming-days" && value) options.upcomingDays = Number(value);
    if (key === "--keyword-lag-days" && value) options.keywordLagDays = Number(value);
  }

  return options;
}

function getLatestConferenceWindows(deadlines: DeadlineSeed[]) {
  const bySlugYear = new Map<string, DeadlineSeed>();

  for (const deadline of deadlines) {
    if (!deadline.conference_start || !deadline.conference_end) continue;

    const key = `${deadline.conference_slug}:${deadline.year}`;
    const current = bySlugYear.get(key);
    if (!current || deadline.conference_end > current.conference_end!) {
      bySlugYear.set(key, deadline);
    }
  }

  return [...bySlugYear.values()].sort((a, b) => {
    if (a.conference_end === b.conference_end) return a.conference_slug.localeCompare(b.conference_slug);
    return a.conference_end!.localeCompare(b.conference_end!);
  });
}

function countKeywordTrends(slug: string, year: number, projectRoot: string): number {
  const detailPath = path.join(projectRoot, "public/data/conferences", `${slug}.json`);
  if (!fs.existsSync(detailPath)) return 0;

  const detail = readJson<{ keywordTrends?: DetailKeywordTrend[] }>(detailPath);
  return (detail.keywordTrends ?? [])
    .filter((trend) => trend.year === year)
    .reduce((sum, trend) => sum + trend.count, 0);
}

export function buildPostConferenceCandidates(input: {
  deadlines: DeadlineSeed[];
  conferences: ConferenceSeed[];
  bestPapers: BestPaperSeed[];
  keywordCountFor: (slug: string, year: number) => number;
  options: Options;
}): { recent: PostConferenceCandidate[]; upcoming: PostConferenceCandidate[] } {
  const conferenceBySlug = new Map(input.conferences.map((conference) => [conference.slug, conference]));
  const bestPaperYears = new Set(input.bestPapers.map((paper) => `${paper.conference_slug}:${paper.year}`));
  const windows = getLatestConferenceWindows(input.deadlines);
  const recent: PostConferenceCandidate[] = [];
  const upcoming: PostConferenceCandidate[] = [];

  for (const window of windows) {
    const conference = conferenceBySlug.get(window.conference_slug);
    if (!conference || !window.conference_start || !window.conference_end) continue;

    const daysSinceEnd = daysBetween(toDate(window.conference_end), input.options.asOf);
    if (daysSinceEnd < -input.options.upcomingDays || daysSinceEnd > input.options.lookbackDays) continue;

    const keywordCount = input.keywordCountFor(window.conference_slug, window.year);
    const hasBestPaper = bestPaperYears.has(`${window.conference_slug}:${window.year}`);
    const bestPaperStatus =
      hasBestPaper ? "done" : daysSinceEnd < 0 ? "too-early" : "check";
    const keywordStatus =
      !conference.dblp_key ? "no-dblp" :
      keywordCount > 0 ? "done" :
      daysSinceEnd >= input.options.keywordLagDays ? "ready" :
      "wait";

    const candidate: PostConferenceCandidate = {
      slug: window.conference_slug,
      acronym: conference.acronym,
      year: window.year,
      field: conference.field,
      venue: window.venue ?? "TBD",
      conferenceStart: window.conference_start,
      conferenceEnd: window.conference_end,
      daysSinceEnd,
      websiteUrl: conference.website_url,
      dblpKey: conference.dblp_key,
      bestPaperStatus,
      keywordStatus,
      keywordCount,
    };

    if (daysSinceEnd >= 0) recent.push(candidate);
    else upcoming.push(candidate);
  }

  return {
    recent: recent.sort((a, b) => a.daysSinceEnd - b.daysSinceEnd || a.slug.localeCompare(b.slug)),
    upcoming: upcoming.sort((a, b) => b.daysSinceEnd - a.daysSinceEnd || a.slug.localeCompare(b.slug)),
  };
}

function statusLabel(status: PostConferenceCandidate["bestPaperStatus"] | PostConferenceCandidate["keywordStatus"]) {
  const labels: Record<string, string> = {
    done: "done",
    check: "check",
    "too-early": "too-early",
    ready: "ready",
    wait: "wait",
    "no-dblp": "no-dblp",
  };
  return labels[status];
}

function renderTable(candidates: PostConferenceCandidate[]) {
  if (candidates.length === 0) return "_대상 없음_";

  const rows = [
    "| 학회 | 연도 | 종료 | D+ | Best Paper | Keyword | 키워드수 | URL |",
    "|------|------|------|----|------------|---------|----------|-----|",
  ];

  for (const c of candidates) {
    rows.push([
      `| ${c.acronym} (${c.slug})`,
      c.year,
      c.conferenceEnd,
      c.daysSinceEnd,
      statusLabel(c.bestPaperStatus),
      statusLabel(c.keywordStatus),
      c.keywordCount,
      c.websiteUrl ?? "-",
    ].join(" | ") + " |");
  }

  return rows.join("\n");
}

function renderReport(args: {
  generatedAt: string;
  options: Options;
  recent: PostConferenceCandidate[];
  upcoming: PostConferenceCandidate[];
}) {
  const bestPaperChecks = args.recent.filter((c) => c.bestPaperStatus === "check");
  const keywordReady = args.recent.filter((c) => c.keywordStatus === "ready");

  return [
    "# Post-Conference Follow-up Report",
    "",
    `Generated: ${args.generatedAt}`,
    `As of: ${dateOnly(args.options.asOf)}`,
    "",
    "## 요약",
    "",
    `- Best Paper 확인 필요: ${bestPaperChecks.length}개`,
    `- Keyword 갱신 가능 후보: ${keywordReady.length}개`,
    `- 최근 종료 추적 범위: ${args.options.lookbackDays}일`,
    `- 종료 예정 추적 범위: ${args.options.upcomingDays}일`,
    `- Keyword 기본 대기 기간: 종료 후 ${args.options.keywordLagDays}일`,
    "",
    "## Best Paper 확인 대상",
    "",
    renderTable(bestPaperChecks),
    "",
    "## Keyword 갱신 가능 후보",
    "",
    renderTable(keywordReady),
    "",
    "## 최근 종료 학회 전체",
    "",
    renderTable(args.recent),
    "",
    "## 곧 종료될 학회",
    "",
    renderTable(args.upcoming),
    "",
    "## 다음 액션",
    "",
    "1. Best Paper `check` 항목은 공식 award/news/proceedings 페이지 확인 후 `src/infrastructure/seed/best-papers.json`에 반영.",
    "2. Keyword `ready` 항목은 `corepack pnpm exec tsx scripts/pipeline/keywords-only.ts` 실행 후보.",
    "3. 반영 후 `corepack pnpm seed`로 Supabase와 `public/data/**` 재생성.",
    "",
  ].join("\n");
}

function run() {
  const projectRoot = process.cwd();
  const options = parseArgs(process.argv.slice(2));
  const deadlines = readJson<DeadlineSeed[]>(path.join(projectRoot, "src/infrastructure/seed/deadlines.json"));
  const conferences = readJson<ConferenceSeed[]>(path.join(projectRoot, "src/infrastructure/seed/conferences.json"));
  const bestPapers = readJson<BestPaperSeed[]>(path.join(projectRoot, "src/infrastructure/seed/best-papers.json"));

  const { recent, upcoming } = buildPostConferenceCandidates({
    deadlines,
    conferences,
    bestPapers,
    keywordCountFor: (slug, year) => countKeywordTrends(slug, year, projectRoot),
    options,
  });

  const report = renderReport({
    generatedAt: `${formatKstDateTime(new Date())} KST`,
    options,
    recent,
    upcoming,
  });

  const reportPath = path.join(projectRoot, "scripts/post-conf-report.md");
  fs.writeFileSync(reportPath, report);
  console.log(report);
  console.log(`Report saved to ${reportPath}`);
}

if (process.argv[1]?.endsWith("post-conference-report.ts")) {
  run();
}
