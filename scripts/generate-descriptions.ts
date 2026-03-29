/**
 * Generate fact-based conference descriptions from our own data.
 * Uses acceptance rates, keyword trends, deadlines — not generic LLM text.
 * Outputs descriptionKo and descriptionEn into each conference JSON.
 */
import fs from "fs";
import path from "path";

const FIELD_LABELS_KO: Record<string, string> = {
  "AI": "인공지능",
  "CV": "컴퓨터 비전",
  "NLP": "자연어 처리",
  "DB": "데이터베이스",
  "SE": "소프트웨어 공학",
  "Systems": "시스템",
  "Security": "보안",
  "HCI": "인간-컴퓨터 상호작용",
  "Theory": "이론 컴퓨터과학",
  "Networks": "네트워크",
  "Architecture": "컴퓨터 구조",
  "Graphics": "그래픽스",
  "PL": "프로그래밍 언어",
  "Robotics": "로보틱스",
};

const FIELD_LABELS_EN: Record<string, string> = {
  "AI": "Artificial Intelligence",
  "CV": "Computer Vision",
  "NLP": "Natural Language Processing",
  "DB": "Databases",
  "SE": "Software Engineering",
  "Systems": "Systems",
  "Security": "Security",
  "HCI": "Human-Computer Interaction",
  "Theory": "Theoretical Computer Science",
  "Networks": "Networks",
  "Architecture": "Computer Architecture",
  "Graphics": "Graphics",
  "PL": "Programming Languages",
  "Robotics": "Robotics",
};

interface AcceptanceRate {
  year: number;
  accepted: number;
  submitted: number;
  rate: number;
}

interface KeywordTrend {
  year: number;
  keyword: string;
  count: number;
}

interface Deadline {
  year: number;
  conferenceStart: string | null;
  conferenceEnd: string | null;
  venue: string | null;
}

interface InstitutionRating {
  institution: string;
  tier: string | null;
}

function getLatestRate(rates: AcceptanceRate[]): AcceptanceRate | null {
  if (!rates || rates.length === 0) return null;
  // Only use rates where both rate and submitted are available
  const valid = rates.filter((r) => r.rate != null && r.submitted != null);
  if (valid.length === 0) return null;
  return valid.sort((a, b) => b.year - a.year)[0];
}

function getTopKeywords(trends: KeywordTrend[], topN = 5): string[] {
  if (!trends || trends.length === 0) return [];
  const latestYear = Math.max(...trends.map((t) => t.year));
  const latest = trends.filter((t) => t.year === latestYear);
  return latest
    .sort((a, b) => b.count - a.count)
    .slice(0, topN)
    .map((t) => t.keyword);
}

function getTypicalMonth(deadlines: Deadline[]): string | null {
  if (!deadlines || deadlines.length === 0) return null;
  const starts = deadlines
    .filter((d) => d.conferenceStart)
    .map((d) => new Date(d.conferenceStart!).getMonth());
  if (starts.length === 0) return null;
  const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
  return months[starts[starts.length - 1]];
}

function getTypicalMonthEn(deadlines: Deadline[]): string | null {
  if (!deadlines || deadlines.length === 0) return null;
  const starts = deadlines
    .filter((d) => d.conferenceStart)
    .map((d) => new Date(d.conferenceStart!).getMonth());
  if (starts.length === 0) return null;
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return months[starts[starts.length - 1]];
}

function getTierSummaryKo(ratings: InstitutionRating[]): string {
  const parts: string[] = [];
  const ccf = ratings.find((r) => r.institution === "CCF");
  const core = ratings.find((r) => r.institution === "CORE");
  const bk21 = ratings.find((r) => r.institution === "BK21");
  if (ccf?.tier) parts.push(`CCF ${ccf.tier}등급`);
  if (core?.tier) parts.push(`CORE ${core.tier}`);
  if (bk21?.tier) parts.push(`BK21 ${bk21.tier}점`);
  return parts.join(", ");
}

function getTierSummaryEn(ratings: InstitutionRating[]): string {
  const parts: string[] = [];
  const ccf = ratings.find((r) => r.institution === "CCF");
  const core = ratings.find((r) => r.institution === "CORE");
  if (ccf?.tier) parts.push(`CCF rank ${ccf.tier}`);
  if (core?.tier) parts.push(`CORE ${core.tier}`);
  return parts.join(", ");
}

function generateKo(conf: any): string {
  const field = FIELD_LABELS_KO[conf.field] ?? conf.field;
  const rate = getLatestRate(conf.acceptanceRates);
  const keywords = getTopKeywords(conf.keywordTrends);
  const month = getTypicalMonth(conf.deadlines);
  const tiers = getTierSummaryKo(conf.institutionRatings ?? []);

  const parts: string[] = [];

  // 1줄: 핵심 정체성
  let line1 = `${conf.acronym}은 ${field} 분야`;
  if (conf.subField && conf.subField !== field) line1 += `(${conf.subField})`;
  line1 += "의 주요 국제 학회입니다.";
  parts.push(line1);

  // 2줄: 정량 데이터
  if (rate) {
    parts.push(`최근 acceptance rate는 ${rate.rate}% (${rate.year}년, ${rate.accepted}/${rate.submitted}편)입니다.`);
  }

  // 3줄: 키워드
  if (keywords.length > 0) {
    parts.push(`주요 연구 키워드: ${keywords.join(", ")}.`);
  }

  // 4줄: 일정 + 티어
  const meta: string[] = [];
  if (month) meta.push(`매년 ${month} 개최`);
  if (tiers) meta.push(tiers);
  if (meta.length > 0) parts.push(meta.join(". ") + ".");

  return parts.join(" ");
}

function generateEn(conf: any): string {
  const field = FIELD_LABELS_EN[conf.field] ?? conf.field;
  const rate = getLatestRate(conf.acceptanceRates);
  const keywords = getTopKeywords(conf.keywordTrends);
  const month = getTypicalMonthEn(conf.deadlines);
  const tiers = getTierSummaryEn(conf.institutionRatings ?? []);

  const parts: string[] = [];

  // Line 1: identity
  let line1 = `${conf.acronym} is a leading international conference in ${field}`;
  if (conf.subField && conf.subField !== field) line1 += ` (${conf.subField})`;
  line1 += ".";
  parts.push(line1);

  // Line 2: acceptance rate
  if (rate) {
    parts.push(`Recent acceptance rate: ${rate.rate}% (${rate.year}, ${rate.accepted}/${rate.submitted} papers).`);
  }

  // Line 3: keywords
  if (keywords.length > 0) {
    parts.push(`Top research topics: ${keywords.join(", ")}.`);
  }

  // Line 4: schedule + tier
  const meta: string[] = [];
  if (month) meta.push(`Typically held in ${month}`);
  if (tiers) meta.push(tiers);
  if (meta.length > 0) parts.push(meta.join(". ") + ".");

  return parts.join(" ");
}

// Main
const dir = path.join(process.cwd(), "public/data/conferences");
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
let updated = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  const conf = JSON.parse(fs.readFileSync(filePath, "utf8"));

  conf.descriptionKo = generateKo(conf);
  conf.descriptionEn = generateEn(conf);

  fs.writeFileSync(filePath, JSON.stringify(conf, null, 2));
  updated++;
}

console.log(`Updated ${updated} conference descriptions.`);

// Print samples
for (const sample of ["cvpr", "aaai", "sigcomm", "cav"]) {
  const c = JSON.parse(fs.readFileSync(path.join(dir, `${sample}.json`), "utf8"));
  console.log(`\n=== ${c.acronym} ===`);
  console.log("KO:", c.descriptionKo);
  console.log("EN:", c.descriptionEn);
}
