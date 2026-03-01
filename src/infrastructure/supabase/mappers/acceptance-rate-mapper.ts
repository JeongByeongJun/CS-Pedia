import type { Database } from "../types/database.types";
import type { AcceptanceRate } from "@/domain/entities/acceptance-rate";

type RateRow = Database["public"]["Tables"]["acceptance_rates"]["Row"];

export function toDomainAcceptanceRate(row: RateRow): AcceptanceRate {
  return {
    id: row.id,
    conferenceId: row.conference_id,
    year: row.year,
    submitted: row.submitted,
    accepted: row.accepted,
    rate: row.rate ? Number(row.rate) : null,
    notes: row.notes,
  };
}
