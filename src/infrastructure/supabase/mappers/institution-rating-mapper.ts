import type { Database } from "../types/database.types";
import type { InstitutionRating } from "@/domain/entities/institution-rating";
import type { Institution, Tier } from "@/domain/entities/institution-rating";

type RatingRow = Database["public"]["Tables"]["institution_ratings"]["Row"];

export function toDomainInstitutionRating(row: RatingRow): InstitutionRating {
  return {
    id: row.id,
    conferenceId: row.conference_id,
    institution: row.institution as Institution,
    tier: row.tier as Tier | null,
    year: row.year,
    notes: row.notes,
  };
}
