import type {
  AcceptanceRateRepository,
  AcceptanceRateWithConference,
} from "@/domain/repositories/acceptance-rate-repository";
import type { AcceptanceRate } from "@/domain/entities/acceptance-rate";
import { createSupabaseServerClient } from "../server";
import { toDomainAcceptanceRate } from "../mappers/acceptance-rate-mapper";

export class SupabaseAcceptanceRateRepository
  implements AcceptanceRateRepository
{
  async findByConferenceId(conferenceId: string): Promise<AcceptanceRate[]> {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("acceptance_rates")
      .select("*")
      .eq("conference_id", conferenceId)
      .order("year", { ascending: false });

    if (error) throw error;
    return (data ?? []).map(toDomainAcceptanceRate);
  }

  async findAll(): Promise<AcceptanceRateWithConference[]> {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("acceptance_rates")
      .select("*, conferences!inner(slug, acronym, field)")
      .order("year", { ascending: false });

    if (error) throw error;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return ((data as any[]) ?? []).map((row) => {
      const base = toDomainAcceptanceRate(row);
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
}
