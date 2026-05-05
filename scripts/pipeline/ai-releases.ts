/**
 * AI Releases Pipeline
 *
 * Anthropic, OpenAI, Google Gemini의 최신 릴리즈 노트를 수집해서
 * public/data/ai-releases.json으로 저장.
 * YouTube Data API v3로 각 회사 공식/인기 영상도 수집.
 *
 * 실행: npx tsx --env-file=.env.local scripts/pipeline/ai-releases.ts
 */

import fs from "fs";
import path from "path";

const OUT_PATH = path.join(__dirname, "../../public/data/ai-releases.json");

interface ReleaseItem {
  date: string; // YYYY-MM-DD
  title: string; // 한줄 요약
  content: string; // 상세 내용 (마크다운 스트립)
  source: "anthropic" | "openai";
  tags: string[]; // 모델명, 카테고리 등
}

// ─── Anthropic ───
async function fetchAnthropic(): Promise<ReleaseItem[]> {
  console.log("[Anthropic] Fetching release notes...");
  const res = await fetch(
    "https://platform.claude.com/docs/en/release-notes/overview",
    {
      signal: AbortSignal.timeout(15000),
      headers: { "User-Agent": "cs-pedia-releases/1.0", Accept: "text/html" },
    },
  );
  const html = await res.text();
  const items: ReleaseItem[] = [];

  // 구조: <div>April 9, 2026</div> ... <ul><li>내용</li></ul>
  // 날짜 div를 기준으로 섹션 분리
  const datePattern =
    /<div>((?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}(?:st|nd|rd|th)?,?\s+\d{4})<\/div>/g;

  const dates: { date: string; index: number }[] = [];
  let match;
  while ((match = datePattern.exec(html)) !== null) {
    const dateStr = match[1].replace(/(st|nd|rd|th)/g, "");
    const parsed = new Date(dateStr);
    if (!isNaN(parsed.getTime())) {
      // 로컬 날짜 컴포넌트 사용 (UTC 변환 시 타임존 이슈 방지)
      const yyyy = parsed.getFullYear();
      const mm = String(parsed.getMonth() + 1).padStart(2, "0");
      const dd = String(parsed.getDate()).padStart(2, "0");
      dates.push({ date: `${yyyy}-${mm}-${dd}`, index: match.index });
    }
  }

  for (let i = 0; i < dates.length && items.length < 30; i++) {
    const start = dates[i].index;
    const end = i + 1 < dates.length ? dates[i + 1].index : html.length;
    const section = html.slice(start, end);
    const date = dates[i].date;

    // <li> 항목들 추출
    const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/g;
    let liMatch;
    while ((liMatch = liRegex.exec(section)) !== null) {
      const clean = liMatch[1]
        .replace(/<a[^>]*>([\s\S]*?)<\/a>/g, "$1")
        .replace(/<code>([\s\S]*?)<\/code>/g, "`$1`")
        .replace(/<[^>]+>/g, "")
        .replace(/\s+/g, " ")
        .trim();

      if (!clean || clean.length < 15) continue;

      const firstSentence = clean.split(/\.\s/)[0] + ".";
      const tags = extractTags(clean, "anthropic");

      items.push({
        date,
        title: decodeEntities(firstSentence.length > 120 ? firstSentence.slice(0, 117) + "..." : firstSentence),
        content: decodeEntities(clean.length > 300 ? clean.slice(0, 297) + "..." : clean),
        source: "anthropic",
        tags,
      });
    }
  }

  console.log(`[Anthropic] ${items.length} releases collected`);
  return items.slice(0, 30);
}

// ─── OpenAI ───
async function fetchOpenAI(): Promise<ReleaseItem[]> {
  console.log("[OpenAI] Fetching changelog...");
  const res = await fetch("https://developers.openai.com/changelog/", {
    signal: AbortSignal.timeout(15000),
    headers: { "User-Agent": "cs-pedia-releases/1.0", Accept: "text/html" },
  });
  const html = await res.text();
  const items: ReleaseItem[] = [];

  // OpenAI changelog: 날짜 + 설명 블록들
  // 패턴: "Mar 17" 같은 날짜 + 내용
  // HTML 구조가 다양하므로 텍스트 기반 파싱
  const text = html
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<[^>]+>/g, "\n")
    .replace(/\n{3,}/g, "\n\n");

  // 월 약어 패턴
  const months: Record<string, string> = {
    Jan: "01", Feb: "02", Mar: "03", Apr: "04",
    May: "05", Jun: "06", Jul: "07", Aug: "08",
    Sep: "09", Oct: "10", Nov: "11", Dec: "12",
  };

  const entryRegex =
    /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{1,2})\n+([\s\S]*?)(?=(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}\n|$)/g;

  let match;
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  while ((match = entryRegex.exec(text)) !== null) {
    const month = months[match[1]];
    const day = match[2].padStart(2, "0");
    const content = match[3].trim().replace(/\n+/g, " ").replace(/\s{2,}/g, " ");

    if (!content || content.length < 10) continue;

    // 미래 월이면 작년으로 처리
    const monthNum = parseInt(month);
    const year = monthNum > currentMonth ? currentYear - 1 : currentYear;
    const date = `${year}-${month}-${day}`;
    const firstSentence = content.split(/\.\s/)[0] + ".";
    const tags = extractTags(content, "openai");

    items.push({
      date,
      title: firstSentence.length > 120 ? firstSentence.slice(0, 117) + "..." : firstSentence,
      content: content.length > 300 ? content.slice(0, 297) + "..." : content,
      source: "openai",
      tags,
    });

    if (items.length >= 30) break;
  }

  console.log(`[OpenAI] ${items.length} releases collected`);
  return items.slice(0, 30);
}

// ─── HTML entity 디코딩 ───
function decodeEntities(text: string): string {
  return text
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCharCode(parseInt(n, 16)));
}

// ─── 태그 추출 ───
function extractTags(text: string, source: string): string[] {
  const tags: string[] = [];
  const lower = text.toLowerCase();

  // 모델명 감지
  const modelPatterns: Record<string, RegExp[]> = {
    anthropic: [
      /claude\s+(opus|sonnet|haiku)\s+[\d.]+/gi,
      /claude\s+code/gi,
      /claude\s+mythos/gi,
    ],
    openai: [
      /gpt-[\d.]+[-\w]*/gi,
      /o[134]-[\w-]*/gi,
      /sora[-\w]*/gi,
      /dall[-·]?e[-\w]*/gi,
      /whisper/gi,
    ],
  };

  for (const pattern of modelPatterns[source] || []) {
    const matches = text.match(pattern);
    if (matches) {
      for (const m of matches) {
        const tag = m.trim().replace(/\s+/g, " ");
        if (!tags.includes(tag)) tags.push(tag);
      }
    }
  }

  // 카테고리 태그
  if (lower.includes("api")) tags.push("API");
  if (lower.includes("sdk")) tags.push("SDK");
  if (lower.includes("deprecat") || lower.includes("retir")) tags.push("Deprecation");
  if (lower.includes("beta") || lower.includes("preview")) tags.push("Beta");
  if (lower.includes("generally available") || lower.includes(" ga")) tags.push("GA");
  if (lower.includes("price") || lower.includes("pricing") || lower.includes("cost")) tags.push("Pricing");
  if (lower.includes("rate limit")) tags.push("Rate Limit");

  return tags.slice(0, 5);
}

// ─── YouTube (큐레이션 AI 채널) ───
interface YouTubeVideo {
  videoId: string;
  title: string;
  channelTitle: string;
  publishedAt: string;
  thumbnail: string;
  viewCount?: number;
}

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// 큐레이션 AI 유튜브 채널
const AI_YOUTUBE_CHANNELS = [
  { channelId: "UCsBjURrPoezykLs9EqgamOA", name: "Fireship" },
  { channelId: "UCNJ1Ymd5yFuUPtn21xtRbbw", name: "AI Explained" },
  { channelId: "UCbfYPyITQ-7l4upoX8nvctg", name: "Two Minute Papers" },
  { channelId: "UChpleBmo18P08aKCIgti38g", name: "Matt Wolfe" },
  { channelId: "UCt2wAAXgm87ACiQnDHQEW6Q", name: "테디노트 TeddyNote" },
  { channelId: "UCQNE2JmbasNYbjGAcuBiRRg", name: "조코딩 JoCoding" },
  { channelId: "UCxZ2AlaT0hOmxzZVbF_j_Sw", name: "코드팩토리" },
];

async function fetchAIYouTubeVideos(): Promise<YouTubeVideo[]> {
  if (!YOUTUBE_API_KEY) {
    console.log("[YouTube] No API key, skipping");
    return [];
  }

  const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();

  // 각 채널에서 최신 영상 2개씩 병렬 요청
  const results = await Promise.all(
    AI_YOUTUBE_CHANNELS.map(async (ch) => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${ch.channelId}&type=video&order=date&maxResults=2&publishedAfter=${fourteenDaysAgo}&key=${YOUTUBE_API_KEY}`,
          { signal: AbortSignal.timeout(10000) },
        );
        if (!res.ok) return [];
        const data = await res.json();
        return (data.items || []).map((item: any) => ({
          videoId: item.id?.videoId || "",
          title: decodeEntities(item.snippet?.title || ""),
          channelTitle: item.snippet?.channelTitle || "",
          publishedAt: item.snippet?.publishedAt || "",
          thumbnail: item.snippet?.thumbnails?.maxres?.url || item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || "",
        }));
      } catch {
        return [];
      }
    }),
  );

  let videos: YouTubeVideo[] = results.flat().filter((v) => v.videoId);

  // 조회수 가져오기
  if (videos.length > 0) {
    try {
      const ids = videos.map((v) => v.videoId).join(",");
      const statsRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${ids}&key=${YOUTUBE_API_KEY}`,
        { signal: AbortSignal.timeout(10000) },
      );
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        const viewMap = new Map<string, number>();
        for (const item of statsData.items || []) {
          viewMap.set(item.id, parseInt(item.statistics?.viewCount || "0"));
        }
        videos = videos.map((v) => ({ ...v, viewCount: viewMap.get(v.videoId) || 0 }));
      }
    } catch {
      // stats 실패해도 영상 목록 유지
    }
  }

  // 날짜순 정렬 (최신 먼저)
  videos.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  console.log(`[YouTube] ${videos.length} videos from ${AI_YOUTUBE_CHANNELS.length} channels`);
  return videos.slice(0, 12);
}

// ─── Main ───
async function main() {
  console.log("=== AI Releases Pipeline ===\n");

  const prevData = fs.existsSync(OUT_PATH)
    ? JSON.parse(fs.readFileSync(OUT_PATH, "utf8"))
    : null;

  let anthropic: ReleaseItem[] = [];
  let openai: ReleaseItem[] = [];

  try {
    anthropic = await fetchAnthropic();
  } catch (e) {
    console.error("[Anthropic] Failed:", (e as Error).message);
    anthropic = prevData?.anthropic || [];
  }

  try {
    openai = await fetchOpenAI();
  } catch (e) {
    console.error("[OpenAI] Failed:", (e as Error).message);
    openai = prevData?.openai || [];
  }

  // YouTube 큐레이션 채널 수집
  let youtubeVideos: YouTubeVideo[] = [];
  try {
    youtubeVideos = await fetchAIYouTubeVideos();
  } catch (e) {
    console.error("[YouTube] Failed:", (e as Error).message);
    youtubeVideos = prevData?.youtubeVideos || [];
  }

  // 전체 타임라인 (날짜순 정렬)
  const timeline = [...anthropic, ...openai]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 50);

  const result = {
    updatedAt: new Date().toISOString(),
    anthropic,
    openai,
    timeline,
    youtubeVideos,
  };

  fs.writeFileSync(OUT_PATH, JSON.stringify(result, null, 2));
  console.log(`\n✅ Saved to ${OUT_PATH}`);
  console.log(
    `   Anthropic: ${anthropic.length}, OpenAI: ${openai.length}`,
  );
  console.log(`   Timeline: ${timeline.length} total`);
}

main().catch((err) => {
  console.error("Pipeline failed:", err);
  process.exit(1);
});
