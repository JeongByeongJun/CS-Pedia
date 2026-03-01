import { createSupabaseServerClient } from "../server";
import { toDomainDeadline } from "../mappers/deadline-mapper";
import type {
  DeadlineRepository,
  DeadlineWithConference,
} from "@/domain/repositories/deadline-repository";
import type { Deadline } from "@/domain/entities/deadline";
import type { Database } from "../types/database.types";

type DeadlineRow = Database["public"]["Tables"]["deadlines"]["Row"];

interface DeadlineRowWithConference extends DeadlineRow {
  conferences: { acronym: string; slug: string };
}

export class SupabaseDeadlineRepository implements DeadlineRepository {
  async findUpcoming(limit = 10): Promise<DeadlineWithConference[]> {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("deadlines")
      .select(
        `
        *,
        conferences!inner (acronym, slug)
      `,
      )
      .gte("paper_deadline", new Date().toISOString())
      .order("paper_deadline", { ascending: true })
      .limit(limit);

    if (error) throw error;

    return ((data ?? []) as unknown as DeadlineRowWithConference[]).map(
      (row) => ({
        ...toDomainDeadline(row),
        conferenceAcronym: row.conferences.acronym,
        conferenceSlug: row.conferences.slug,
      }),
    );
  }

  async findByConferenceId(conferenceId: string): Promise<Deadline[]> {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("deadlines")
      .select("*")
      .eq("conference_id", conferenceId)
      .order("year", { ascending: false });

    if (error) throw error;
    return (data ?? []).map(toDomainDeadline);
  }
}
