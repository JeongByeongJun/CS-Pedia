import type { BestPaper } from "../entities/best-paper";

export interface BestPaperFilters {
  conferenceId?: string;
  year?: number;
  awardType?: string;
}

export interface BestPaperWithConference extends BestPaper {
  conferenceAcronym: string;
  conferenceSlug: string;
}

export interface BestPaperRepository {
  findAll(filters?: BestPaperFilters): Promise<BestPaperWithConference[]>;
  findByConferenceId(conferenceId: string): Promise<BestPaper[]>;
}
