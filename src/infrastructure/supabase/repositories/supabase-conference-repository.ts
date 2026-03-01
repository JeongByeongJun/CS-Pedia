import { createSupabaseServerClient } from "../server";
import { toDomainConference } from "../mappers/conference-mapper";
import type {
  ConferenceRepository,
  ConferenceFilters,
  ConferenceWithRelations,
} from "@/domain/repositories/conference-repository";
import type { Database } from "../types/database.types";
import { parseOptionalDate } from "@/shared/utils/date";

type ViewRow = Database["public"]["Views"]["conference_with_next_deadline"]["Row"];

interface ViewRowWithRelations extends ViewRow {
  institution_ratings: Array<{ institution: string; tier: string | null }>;
  best_papers: Array<{ paper_title: string; year: number }>;
}

export class SupabaseConferenceRepository implements ConferenceRepository {
  async findAll(
    filters?: ConferenceFilters,
  ): Promise<ConferenceWithRelations[]> {
    const supabase = await createSupabaseServerClient();

    let query = supabase
      .from("conference_with_next_deadline")
      .select(
        `
        *,
        institution_ratings (institution, tier),
        best_papers (paper_title, year)
      `,
      )
      .order("acronym");

    if (filters?.field) {
      query = query.eq("field", filters.field);
    }

    if (filters?.search) {
      query = query.or(
        `acronym.ilike.%${filters.search}%,name_en.ilike.%${filters.search}%,name_kr.ilike.%${filters.search}%`,
      );
    }

    const { data, error } = await query;
    if (error) throw error;

    return ((data ?? []) as unknown as ViewRowWithRelations[])
      .map((row) => {
        const ratings = (row.institution_ratings ?? []).filter((r) => {
          if (filters?.institution) return r.institution === filters.institution;
          return true;
        });

        if (filters?.institution && ratings.length === 0) return null;

        const bestPapers = (row.best_papers ?? []).sort(
          (a, b) => b.year - a.year,
        );
        const latestBestPaper = bestPapers[0] ?? null;

        return {
          ...toDomainConference(row),
          nextDeadline: parseOptionalDate(row.next_deadline),
          daysUntilDeadline: row.days_until_deadline,
          venue: row.next_venue,
          conferenceStart: parseOptionalDate(row.conference_start),
          conferenceEnd: parseOptionalDate(row.conference_end),
          institutionRatings: ratings.map((r) => ({
            institution: r.institution,
            tier: r.tier,
          })),
          latestBestPaper: latestBestPaper
            ? { title: latestBestPaper.paper_title, year: latestBestPaper.year }
            : null,
        };
      })
      .filter(Boolean) as ConferenceWithRelations[];
  }

  async findBySlug(slug: string): Promise<ConferenceWithRelations | null> {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("conference_with_next_deadline")
      .select(
        `
        *,
        institution_ratings (institution, tier),
        best_papers (paper_title, year)
      `,
      )
      .eq("slug", slug)
      .single();

    if (error || !data) return null;

    const row = data as unknown as ViewRowWithRelations;

    const ratings = (row.institution_ratings ?? []).map((r) => ({
      institution: r.institution,
      tier: r.tier,
    }));

    const bestPapers = (row.best_papers ?? []).sort(
      (a, b) => b.year - a.year,
    );
    const latestBestPaper = bestPapers[0] ?? null;

    return {
      ...toDomainConference(row),
      nextDeadline: parseOptionalDate(row.next_deadline),
      daysUntilDeadline: row.days_until_deadline,
      venue: row.next_venue,
      conferenceStart: parseOptionalDate(row.conference_start),
      conferenceEnd: parseOptionalDate(row.conference_end),
      institutionRatings: ratings,
      latestBestPaper: latestBestPaper
        ? { title: latestBestPaper.paper_title, year: latestBestPaper.year }
        : null,
    };
  }

  async findSlugs(): Promise<string[]> {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.from("conferences").select("slug");
    return (data ?? []).map((c: { slug: string }) => c.slug);
  }
}
