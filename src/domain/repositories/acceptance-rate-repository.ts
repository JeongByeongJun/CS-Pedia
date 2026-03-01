import type { AcceptanceRate } from "../entities/acceptance-rate";

export interface AcceptanceRateRepository {
  findByConferenceId(conferenceId: string): Promise<AcceptanceRate[]>;
}
