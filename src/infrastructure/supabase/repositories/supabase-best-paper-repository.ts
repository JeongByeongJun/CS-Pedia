import { createSupabaseServerClient } from "../server";
import { toDomainBestPaper } from "../mappers/best-paper-mapper";
import type {
  BestPaperRepository,
  BestPaperFilters,
  BestPaperWithConference,
} from "@/domain/repositories/best-paper-repository";
import type { BestPaper } from "@/domain/entities/best-paper";
import type { Database } from "../types/database.types";

type BestPaperRow = Database["public"]["Tables"]["best_papers"]["Row"];

interface BestPaperRowWithConference extends BestPaperRow {
  conferences: { acronym: string; slug: string };
}

export class SupabaseBestPaperRepository implements BestPaperRepository {
  async findAll(
    filters?: BestPaperFilters,
  ): Promise<BestPaperWithConference[]> {
    const supabase = await createSupabaseServerClient();

    let query = supabase
      .from("best_papers")
      .select(
        `
        *,
        conferences!inner (acronym, slug)
      `,
      )
      .order("year", { ascending: false });

    if (filters?.conferenceId) {
      query = query.eq("conference_id", filters.conferenceId);
    }
    if (filters?.year) {
      query = query.eq("year", filters.year);
    }
    if (filters?.awardType) {
      query = query.eq("award_type", filters.awardType);
    }

    const { data, error } = await query;
    if (error) throw error;

    return ((data ?? []) as unknown as BestPaperRowWithConference[]).map(
      (row) => ({
        ...toDomainBestPaper(row),
        conferenceAcronym: row.conferences.acronym,
        conferenceSlug: row.conferences.slug,
      }),
    );
  }

  async findByConferenceId(conferenceId: string): Promise<BestPaper[]> {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("best_papers")
      .select("*")
      .eq("conference_id", conferenceId)
      .order("year", { ascending: false });

    if (error) throw error;

    const seen = new Set<string>();
    return ((data ?? []) as BestPaperRow[]).filter((row) => {
      const key = `${row.year}|${row.paper_title}|${row.award_type}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).map(toDomainBestPaper);
  }
}
