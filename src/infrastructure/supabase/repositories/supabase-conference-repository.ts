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
      .select(`id, slug, name_en, name_kr, acronym, field, sub_field, dblp_key, website_url, next_deadline, deadline_year, next_venue, conference_start, conference_end, days_until_deadline`)
      .order("acronym");

    if (filters?.field) {
      query = query.eq("field", filters.field);
    }

    if (filters?.search) {
      query = query.or(
        `acronym.ilike.%${filters.search}%,name_en.ilike.%${filters.search}%,name_kr.ilike.%${filters.search}%`,
      );
    }

    const [{ data, error }, { data: ratingsData }, { data: latestPapersData }] = await Promise.all([
      query,
      supabase
        .from("institution_ratings")
        .select("conference_id, institution, tier"),
      supabase
        .from("conference_latest_best_papers")
        .select("conference_id, paper_title, year, award_type"),
    ]);

    if (error) throw error;

    // Group ratings by conference_id
    const ratingsByConf = new Map<string, Array<{ institution: string; tier: string | null }>>();
    for (const r of (ratingsData ?? []) as Array<{ conference_id: string; institution: string; tier: string | null }>) {
      if (!ratingsByConf.has(r.conference_id)) {
        ratingsByConf.set(r.conference_id, []);
      }
      ratingsByConf.get(r.conference_id)!.push({ institution: r.institution, tier: r.tier });
    }

    // Group latest best papers by conference_id
    const bestPapersByConf = new Map<string, LatestBestPaperRow[]>();
    for (const bp of (latestPapersData ?? []) as LatestBestPaperRow[]) {
      if (!bestPapersByConf.has(bp.conference_id)) {
        bestPapersByConf.set(bp.conference_id, []);
      }
      bestPapersByConf.get(bp.conference_id)!.push(bp);
    }

    return ((data ?? []) as unknown as ViewRow[])
      .map((row) => {
        const allRatings = ratingsByConf.get(row.id ?? "") ?? [];
        const ratings = filters?.institution
          ? allRatings.filter((r) => r.institution === filters.institution)
          : allRatings;

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
      .select(`id, slug, name_en, name_kr, acronym, field, sub_field, dblp_key, website_url, next_deadline, deadline_year, next_venue, conference_start, conference_end, days_until_deadline`)
      .eq("slug", slug)
      .single();

    if (error || !data) return null;

    const row = data as unknown as ViewRow;

    const { data: ratingsData } = await supabase
      .from("institution_ratings")
      .select("institution, tier")
      .eq("conference_id", row.id!);

    return {
      ...toDomainConference(row),
      nextDeadline: parseOptionalDate(row.next_deadline),
      daysUntilDeadline: row.days_until_deadline,
      venue: row.next_venue,
      conferenceStart: parseOptionalDate(row.conference_start),
      conferenceEnd: parseOptionalDate(row.conference_end),
      institutionRatings: ((ratingsData ?? []) as Array<{ institution: string; tier: string | null }>).map((r) => ({
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
