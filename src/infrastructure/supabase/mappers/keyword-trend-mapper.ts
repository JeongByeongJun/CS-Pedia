import type { KeywordTrend } from "@/domain/entities/keyword-trend";

export function toDomainKeywordTrend(row: {
  id: string;
  conference_id: string;
  year: number;
  keyword: string;
  count: number;
}): KeywordTrend {
  return {
    id: row.id,
    conferenceId: row.conference_id,
    year: row.year,
    keyword: row.keyword,
    count: row.count,
  };
}
