/**
 * CS Pulse Pipeline
 *
 * HN Top Stories + GitHub Trending + GeekNews RSS를 수집해서
 * public/data/cs-pulse.json으로 저장.
 *
 * 실행: npx tsx scripts/pipeline/cs-pulse.ts
 */

import fs from "fs";
import path from "path";

const OUT_PATH = path.join(__dirname, "../../public/data/cs-pulse.json");

// ─── CS 키워드 매칭용 (top-keywords.json에서 상위 100개) ───
const TOP_KEYWORDS_PATH = path.join(
  __dirname,
  "../../public/data/top-keywords.json",
);
function loadKeywords(): string[] {
  try {
    const raw = JSON.parse(fs.readFileSync(TOP_KEYWORDS_PATH, "utf8"));
    return raw.slice(0, 100).map((k: { keyword: string }) => k.keyword.toLowerCase());
  } catch {
    return [];
  }
}

function matchKeywords(text: string, keywords: string[]): string[] {
  const lower = text.toLowerCase();
  return keywords.filter((kw) => lower.includes(kw));
}

// ─── Hacker News ───
interface HNItem {
  title: string;
  url: string | null;
  score: number;
  time: number;
  id: number;
  descendants?: number;
}

async function fetchHN(): Promise<
  { title: string; url: string; score: number; comments: number; hnUrl: string; timestamp: number; keywords: string[] }[]
> {
  console.log("[HN] Fetching top stories...");
  const res = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json",
    { signal: AbortSignal.timeout(15000) },
  );
  const ids: number[] = await res.json();

  // 상위 50개만
  const top50 = ids.slice(0, 50);
  const items: HNItem[] = [];

  for (const id of top50) {
    try {
      const r = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
        { signal: AbortSignal.timeout(10000) },
      );
      const item = await r.json();
      if (item && item.title) items.push(item);
    } catch {
      // skip individual failures
    }
  }

  const keywords = loadKeywords();

  // CS 관련 필터링: 키워드 매칭 or 점수 상위
  const csRelated = items
    .map((item) => {
      const matched = matchKeywords(item.title, keywords);
      return {
        title: item.title,
        url: item.url || `https://news.ycombinator.com/item?id=${item.id}`,
        score: item.score,
        comments: item.descendants || 0,
        hnUrl: `https://news.ycombinator.com/item?id=${item.id}`,
        timestamp: item.time,
        keywords: matched,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);

  console.log(`[HN] ${csRelated.length} stories collected`);
  return csRelated;
}

// ─── GitHub Trending ───
interface GHTrending {
  name: string;
  fullName: string;
  description: string;
  language: string | null;
  stars: number;
  starsToday: number;
  url: string;
  keywords: string[];
}

async function fetchGitHubTrending(): Promise<GHTrending[]> {
  console.log("[GitHub] Fetching trending...");
  const res = await fetch("https://github.com/trending?since=daily", {
    signal: AbortSignal.timeout(15000),
    headers: {
      "User-Agent": "cs-pedia-pulse/1.0",
      Accept: "text/html",
    },
  });
  const html = await res.text();

  const keywords = loadKeywords();
  const repos: GHTrending[] = [];

  // Parse trending repos from HTML
  const articleRegex = /<article class="Box-row">([\s\S]*?)<\/article>/g;
  let match;

  while ((match = articleRegex.exec(html)) !== null) {
    const block = match[1];

    // repo name: h2 > a href="/owner/repo"
    const h2Match = block.match(/<h2[\s\S]*?<\/h2>/);
    if (!h2Match) continue;
    const nameMatch = h2Match[0].match(/href="\/([^"]+)"/);
    if (!nameMatch) continue;
    const fullName = nameMatch[1].replace(/\s/g, "");

    // description
    const descMatch = block.match(/<p class="[^"]*">([\s\S]*?)<\/p>/);
    const description = descMatch
      ? descMatch[1].replace(/<[^>]+>/g, "").trim()
      : "";

    // language
    const langMatch = block.match(
      /itemprop="programmingLanguage">([\s\S]*?)<\/span>/,
    );
    const language = langMatch ? langMatch[1].trim() : null;

    // stars total
    const starsMatch = block.match(
      /href="\/[^"]*\/stargazers"[^>]*>\s*([\d,]+)/,
    );
    const stars = starsMatch
      ? parseInt(starsMatch[1].replace(/,/g, ""))
      : 0;

    // stars today
    const todayMatch = block.match(/([\d,]+)\s+stars\s+today/);
    const starsToday = todayMatch
      ? parseInt(todayMatch[1].replace(/,/g, ""))
      : 0;

    const matched = matchKeywords(
      `${fullName} ${description}`,
      keywords,
    );

    repos.push({
      name: fullName.split("/")[1] || fullName,
      fullName,
      description,
      language,
      stars,
      starsToday,
      url: `https://github.com/${fullName}`,
      keywords: matched,
    });
  }

  const result = repos.slice(0, 20);
  console.log(`[GitHub] ${result.length} trending repos collected`);
  return result;
}

// ─── GeekNews RSS ───
interface GeekNewsItem {
  title: string;
  url: string;
  points: number;
  timestamp: string;
  keywords: string[];
}

async function fetchGeekNews(): Promise<GeekNewsItem[]> {
  console.log("[GeekNews] Fetching Atom feed...");

  // Atom feed: https://news.hada.io/rss/news
  const res = await fetch("https://news.hada.io/rss/news", {
    signal: AbortSignal.timeout(15000),
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      Accept: "application/atom+xml, application/xml, text/xml",
    },
  });
  const xml = await res.text();

  const keywords = loadKeywords();
  const items: GeekNewsItem[] = [];

  // Atom format: <entry>...</entry>
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match;

  while ((match = entryRegex.exec(xml)) !== null) {
    const block = match[1];

    const titleMatch =
      block.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/) ||
      block.match(/<title>([\s\S]*?)<\/title>/);
    const linkMatch = block.match(/<link[^>]*href='([^']+)'/);
    const dateMatch = block.match(/<published>([\s\S]*?)<\/published>/);

    if (!titleMatch) continue;

    const title = titleMatch[1].trim();
    const url = linkMatch ? linkMatch[1].trim() : "";
    const timestamp = dateMatch ? dateMatch[1].trim() : "";
    const matched = matchKeywords(title, keywords);

    items.push({
      title,
      url,
      points: 0,
      timestamp,
      keywords: matched,
    });
  }

  const result = items.slice(0, 20);
  console.log(`[GeekNews] ${result.length} items collected`);
  return result;
}

// ─── Main ───
async function main() {
  console.log("=== CS Pulse Pipeline ===\n");

  const prevData = fs.existsSync(OUT_PATH)
    ? JSON.parse(fs.readFileSync(OUT_PATH, "utf8"))
    : null;

  let hn: Awaited<ReturnType<typeof fetchHN>> = [];
  let github: GHTrending[] = [];
  let geeknews: GeekNewsItem[] = [];

  // Fetch all sources, fallback to previous cache on failure
  try {
    hn = await fetchHN();
  } catch (e) {
    console.error("[HN] Failed:", (e as Error).message);
    hn = prevData?.hn || [];
  }

  try {
    github = await fetchGitHubTrending();
  } catch (e) {
    console.error("[GitHub] Failed:", (e as Error).message);
    github = prevData?.github || [];
  }

  try {
    geeknews = await fetchGeekNews();
  } catch (e) {
    console.error("[GeekNews] Failed:", (e as Error).message);
    geeknews = prevData?.geeknews || [];
  }

  // Cross-matching: 여러 소스에서 동시에 뜨는 키워드
  const allKeywords = new Map<string, number>();
  for (const item of [...hn, ...github, ...geeknews]) {
    for (const kw of item.keywords) {
      allKeywords.set(kw, (allKeywords.get(kw) || 0) + 1);
    }
  }
  const hotKeywords = [...allKeywords.entries()]
    .filter(([, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1])
    .map(([keyword, count]) => ({ keyword, sources: count }));

  const result = {
    updatedAt: new Date().toISOString(),
    hotKeywords,
    hn,
    github,
    geeknews,
  };

  fs.writeFileSync(OUT_PATH, JSON.stringify(result, null, 2));
  console.log(`\n✅ Saved to ${OUT_PATH}`);
  console.log(
    `   HN: ${hn.length}, GitHub: ${github.length}, GeekNews: ${geeknews.length}`,
  );
  console.log(`   Hot keywords (2+ sources): ${hotKeywords.length}`);
}

main().catch((err) => {
  console.error("Pipeline failed:", err);
  process.exit(1);
});
