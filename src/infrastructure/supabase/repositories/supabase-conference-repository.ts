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
}

interface LatestBestPaperRow {
  conference_id: string;
  paper_title: string;
  year: number;
  award_type: string;
}

export class SupabaseConferenceRepository implements ConferenceRepository {
  async findAll(
    filters?: ConferenceFilters,
  ): Promise<ConferenceWithRelations[]> {
    const supabase = await createSupabaseServerClient();

    let query = supabase
      .from("conference_with_next_deadline")
      .select(`*, institution_ratings (institution, tier)`)
      .order("acronym");

    if (filters?.field) {
      query = query.eq("field", filters.field);
    }

    if (filters?.search) {
      query = query.or(
        `acronym.ilike.%${filters.search}%,name_en.ilike.%${filters.search}%,name_kr.ilike.%${filters.search}%`,
      );
    }

    const [{ data, error }, { data: latestPapersData }] = await Promise.all([
      query,
      supabase
        .from("conference_latest_best_papers")
        .select("conference_id, paper_title, year, award_type"),
    ]);

    if (error) throw error;

    // Group latest best papers by conference_id
    const bestPapersByConf = new Map<string, LatestBestPaperRow[]>();
    for (const bp of (latestPapersData ?? []) as LatestBestPaperRow[]) {
      if (!bestPapersByConf.has(bp.conference_id)) {
        bestPapersByConf.set(bp.conference_id, []);
      }
      bestPapersByConf.get(bp.conference_id)!.push(bp);
    }

    return ((data ?? []) as unknown as ViewRowWithRelations[])
      .map((row) => {
        const ratings = (row.institution_ratings ?? []).filter((r) => {
          if (filters?.institution) return r.institution === filters.institution;
          return true;
        });

        if (filters?.institution && ratings.length === 0) return null;

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
          latestBestPapers: (bestPapersByConf.get(row.id ?? "") ?? []).map(
            (p) => ({ title: p.paper_title, year: p.year, awardType: p.award_type }),
          ),
        };
      })
      .filter(Boolean) as ConferenceWithRelations[];
  }

  async findBySlug(slug: string): Promise<ConferenceWithRelations | null> {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("conference_with_next_deadline")
      .select(`*, institution_ratings (institution, tier)`)
      .eq("slug", slug)
      .single();

    if (error || !data) return null;

    const row = data as unknown as ViewRowWithRelations;

    return {
      ...toDomainConference(row),
      nextDeadline: parseOptionalDate(row.next_deadline),
      daysUntilDeadline: row.days_until_deadline,
      venue: row.next_venue,
      conferenceStart: parseOptionalDate(row.conference_start),
      conferenceEnd: parseOptionalDate(row.conference_end),
      institutionRatings: (row.institution_ratings ?? []).map((r) => ({
        institution: r.institution,
        tier: r.tier,
      })),
      latestBestPapers: [],
    };
  }

  async findSlugs(): Promise<string[]> {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.from("conferences").select("slug");
    return (data ?? []).map((c: { slug: string }) => c.slug);
  }
}
