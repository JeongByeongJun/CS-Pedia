import type { AcceptanceRateWithConference } from "@/domain/repositories/acceptance-rate-repository";
import type { KeywordTrendWithConference } from "@/domain/repositories/keyword-trend-repository";

interface StaticAcceptanceRate {
  conference_id: string;
  year: number;
  accepted: number | null;
  submitted: number | null;
  rate: number | null;
  notes: string | null;
  conferenceSlug: string;
  conferenceAcronym: string;
  conferenceField: string;
}

interface StaticKeywordTrend {
  conference_id: string;
  year: number;
  keyword: string;
  count: number;
  conferenceSlug: string;
  conferenceAcronym: string;
  conferenceField: string;
}

interface StaticTopKeyword {
  keyword: string;
  count: number;
}

let cachedRates: StaticAcceptanceRate[] | null = null;
let cachedTrends: StaticKeywordTrend[] | null = null;
let cachedTopKeywords: StaticTopKeyword[] | null = null;

async function readJson<T>(filename: string): Promise<T> {
  const fs = await import("fs/promises");
  const path = await import("path");
  const filePath = path.join(process.cwd(), "public/data", filename);
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

export async function getAllAcceptanceRatesStatic(): Promise<AcceptanceRateWithConference[]> {
  if (!cachedRates) {
    cachedRates = await readJson<StaticAcceptanceRate[]>("acceptance-rates.json");
  }
  return cachedRates.map((r) => ({
    id: r.conference_id + "-" + r.year,
    conferenceId: r.conference_id,
    year: r.year,
    accepted: r.accepted,
    submitted: r.submitted,
    rate: r.rate,
    notes: r.notes,
    conferenceSlug: r.conferenceSlug,
    conferenceAcronym: r.conferenceAcronym,
    conferenceField: r.conferenceField,
  }));
}

export async function getAllKeywordTrendsStatic(): Promise<KeywordTrendWithConference[]> {
  if (!cachedTrends) {
    cachedTrends = await readJson<StaticKeywordTrend[]>("keyword-trends.json");
  }
  return cachedTrends.map((d) => ({
    id: d.conference_id + "-" + d.year + "-" + d.keyword,
    conferenceId: d.conference_id,
    year: d.year,
    keyword: d.keyword,
    count: d.count,
    conferenceSlug: d.conferenceSlug,
    conferenceAcronym: d.conferenceAcronym,
    conferenceField: d.conferenceField,
  }));
}

export async function getTopKeywordsStatic(limit = 20): Promise<{ keyword: string; totalCount: number }[]> {
  if (!cachedTopKeywords) {
    cachedTopKeywords = await readJson<StaticTopKeyword[]>("top-keywords.json");
  }
  return cachedTopKeywords
    .map((k) => ({ keyword: k.keyword, totalCount: k.count }))
    .slice(0, limit);
}
