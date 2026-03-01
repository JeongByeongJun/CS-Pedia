import type { ConferenceRepository } from "../repositories/conference-repository";
import type { DeadlineRepository } from "../repositories/deadline-repository";
import type { BestPaperRepository } from "../repositories/best-paper-repository";
import type { InstitutionRatingRepository } from "../repositories/institution-rating-repository";
import type { AcceptanceRateRepository } from "../repositories/acceptance-rate-repository";
import type { Deadline } from "../entities/deadline";
import type { BestPaper } from "../entities/best-paper";
import type { InstitutionRating } from "../entities/institution-rating";
import type { AcceptanceRate } from "../entities/acceptance-rate";
import type { ConferenceWithRelations } from "../repositories/conference-repository";

export interface ConferenceDetail {
  conference: ConferenceWithRelations;
  deadlines: Deadline[];
  bestPapers: BestPaper[];
  ratings: InstitutionRating[];
  acceptanceRates: AcceptanceRate[];
}

export function createGetConferenceDetailUseCase(
  confRepo: ConferenceRepository,
  deadlineRepo: DeadlineRepository,
  bestPaperRepo: BestPaperRepository,
  ratingRepo: InstitutionRatingRepository,
  acceptanceRateRepo: AcceptanceRateRepository,
) {
  return async (slug: string): Promise<ConferenceDetail | null> => {
    const conference = await confRepo.findBySlug(slug);
    if (!conference) return null;

    const [deadlines, bestPapers, ratings, acceptanceRates] = await Promise.all([
      deadlineRepo.findByConferenceId(conference.id),
      bestPaperRepo.findByConferenceId(conference.id),
      ratingRepo.findByConferenceId(conference.id),
      acceptanceRateRepo.findByConferenceId(conference.id),
    ]);

    return { conference, deadlines, bestPapers, ratings, acceptanceRates };
  };
}
