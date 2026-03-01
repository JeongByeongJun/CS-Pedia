import type { AcceptanceRate } from "../entities/acceptance-rate";

export interface AcceptanceRateWithConference extends AcceptanceRate {
  conferenceSlug: string;
  conferenceAcronym: string;
  conferenceField: string;
}

export interface AcceptanceRateRepository {
  findByConferenceId(conferenceId: string): Promise<AcceptanceRate[]>;
  findAll(): Promise<AcceptanceRateWithConference[]>;
}
