import type { AcceptanceRateRepository } from "@/domain/repositories/acceptance-rate-repository";
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
}
