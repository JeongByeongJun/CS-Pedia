import type {
  KeywordTrendRepository,
  KeywordTrendWithConference,
} from "@/domain/repositories/keyword-trend-repository";
import type { KeywordTrend } from "@/domain/entities/keyword-trend";
import { createSupabaseServerClient } from "../server";
import { toDomainKeywordTrend } from "../mappers/keyword-trend-mapper";

export class SupabaseKeywordTrendRepository implements KeywordTrendRepository {
  async findByConferenceId(conferenceId: string): Promise<KeywordTrend[]> {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("keyword_trends")
      .select("*")
      .eq("conference_id", conferenceId)
      .order("year", { ascending: false });

    if (error) throw error;
    return ((data as any[]) ?? []).map(toDomainKeywordTrend);
  }

  async findAll(): Promise<KeywordTrendWithConference[]> {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("keyword_trends")
      .select("*, conferences!inner(slug, acronym, field)")
      .gte("count", 3) // Filter noise
      .order("count", { ascending: false });

    if (error) throw error;
    return ((data as any[]) ?? []).map((row) => {
      const base = toDomainKeywordTrend(row);
      const conf = row.conferences as {
        slug: string;
        acronym: string;
        field: string;
      };
      return {
        ...base,
        conferenceSlug: conf.slug,
        conferenceAcronym: conf.acronym,
        conferenceField: conf.field,
      };
    });
  }

  async findTopKeywords(
    limit = 20,
  ): Promise<{ keyword: string; totalCount: number }[]> {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("keyword_trends")
      .select("keyword, count");

    if (error) throw error;

    const totals = new Map<string, number>();
    for (const row of (data as { keyword: string; count: number }[]) ?? []) {
      totals.set(row.keyword, (totals.get(row.keyword) ?? 0) + row.count);
    }

    return [...totals.entries()]
      .map(([keyword, totalCount]) => ({ keyword, totalCount }))
      .sort((a, b) => b.totalCount - a.totalCount)
      .slice(0, limit);
  }
}
