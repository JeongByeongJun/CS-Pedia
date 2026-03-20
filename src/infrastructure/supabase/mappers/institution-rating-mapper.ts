import type { Database } from "../types/database.types";
import type { InstitutionRating } from "@/domain/entities/institution-rating";
import { InstitutionEnum, TierEnum } from "@/domain/entities/institution-rating";

type RatingRow = Database["public"]["Tables"]["institution_ratings"]["Row"];

export function toDomainInstitutionRating(row: RatingRow): InstitutionRating {
  return {
    id: row.id,
    conferenceId: row.conference_id,
    institution: InstitutionEnum.parse(row.institution),
    tier: row.tier ? TierEnum.parse(row.tier) : null,
    year: row.year,
    notes: row.notes,
  };
}
