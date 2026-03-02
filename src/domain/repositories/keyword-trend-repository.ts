import type { KeywordTrend } from "../entities/keyword-trend";

export interface KeywordTrendWithConference extends KeywordTrend {
  conferenceSlug: string;
  conferenceAcronym: string;
  conferenceField: string;
}

export interface KeywordTrendRepository {
  findByConferenceId(conferenceId: string): Promise<KeywordTrend[]>;
  findAll(): Promise<KeywordTrendWithConference[]>;
  findTopKeywords(
    limit?: number,
  ): Promise<{ keyword: string; totalCount: number }[]>;
}
