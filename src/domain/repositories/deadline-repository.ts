import type { Deadline } from "../entities/deadline";

export interface DeadlineWithConference extends Deadline {
  conferenceAcronym: string;
  conferenceSlug: string;
}

export interface DeadlineRepository {
  findUpcoming(limit?: number): Promise<DeadlineWithConference[]>;
  findByConferenceId(conferenceId: string): Promise<Deadline[]>;
}
