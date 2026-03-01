import { createSupabaseServerClient } from "../server";
import { toDomainInstitutionRating } from "../mappers/institution-rating-mapper";
import type { InstitutionRatingRepository } from "@/domain/repositories/institution-rating-repository";
import type {
  InstitutionRating,
  Institution,
} from "@/domain/entities/institution-rating";

export class SupabaseInstitutionRatingRepository
  implements InstitutionRatingRepository
{
  async findByConferenceId(conferenceId: string): Promise<InstitutionRating[]> {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("institution_ratings")
      .select("*")
      .eq("conference_id", conferenceId);

    if (error) throw error;
    return (data ?? []).map(toDomainInstitutionRating);
  }

  async findByInstitution(institution: Institution): Promise<InstitutionRating[]> {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
      .from("institution_ratings")
      .select("*")
      .eq("institution", institution);

    if (error) throw error;
    return (data ?? []).map(toDomainInstitutionRating);
  }
}
