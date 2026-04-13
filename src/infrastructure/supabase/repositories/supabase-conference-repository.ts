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
  paper_url: string | null;
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

    const [{ data, error }, { data: ratingsData }, { data: latestPapersData }, { data: deadlineTzData }] = await Promise.all([
      query,
      supabase
        .from("institution_ratings")
        .select("conference_id, institution, tier"),
      supabase
        .from("conference_latest_best_papers")
        .select("conference_id, paper_title, year, award_type, paper_url"),
      supabase
        .from("deadlines")
        .select("conference_id, timezone, paper_deadline, abstract_deadline, notification_date")
        .not("paper_deadline", "is", null)
        .order("paper_deadline", { ascending: false }),
    ]);

    if (error) throw error;

    // Map conference_id → timezone + abstract/notification (from the nearest deadline)
    const tzByConf = new Map<string, string>();
    const abstractByConf = new Map<string, string | null>();
    const notifByConf = new Map<string, string | null>();
    for (const d of (deadlineTzData ?? []) as Array<{ conference_id: string; timezone: string; paper_deadline: string; abstract_deadline: string | null; notification_date: string | null }>) {
      if (!tzByConf.has(d.conference_id)) {
        tzByConf.set(d.conference_id, d.timezone ?? "AoE");
        abstractByConf.set(d.conference_id, d.abstract_deadline);
        notifByConf.set(d.conference_id, d.notification_date);
      }
    }

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
          deadlineTimezone: tzByConf.get(row.id ?? "") ?? "AoE",
          abstractDeadline: parseOptionalDate(abstractByConf.get(row.id ?? "") ?? null),
          notificationDate: parseOptionalDate(notifByConf.get(row.id ?? "") ?? null),
          venue: row.next_venue,
          conferenceStart: parseOptionalDate(row.conference_start),
          conferenceEnd: parseOptionalDate(row.conference_end),
          institutionRatings: ratings.map((r) => ({
            institution: r.institution,
            tier: r.tier,
          })),
          latestBestPapers: (bestPapersByConf.get(row.id ?? "") ?? []).map(
            (p) => ({ title: p.paper_title, year: p.year, awardType: p.award_type, paperUrl: p.paper_url ?? null }),
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

    const [{ data: ratingsData }, { data: tzData }] = await Promise.all([
      supabase
        .from("institution_ratings")
        .select("institution, tier")
        .eq("conference_id", row.id!),
      supabase
        .from("deadlines")
        .select("timezone, abstract_deadline, notification_date")
        .eq("conference_id", row.id!)
        .not("paper_deadline", "is", null)
        .order("paper_deadline", { ascending: false })
        .limit(1),
    ]);

    const dlRow = ((tzData ?? []) as Array<{ timezone: string; abstract_deadline: string | null; notification_date: string | null }>)[0];
    const tz = dlRow?.timezone ?? "AoE";

    return {
      ...toDomainConference(row),
      nextDeadline: parseOptionalDate(row.next_deadline),
      daysUntilDeadline: row.days_until_deadline,
      deadlineTimezone: tz,
      abstractDeadline: parseOptionalDate(dlRow?.abstract_deadline ?? null),
      notificationDate: parseOptionalDate(dlRow?.notification_date ?? null),
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
