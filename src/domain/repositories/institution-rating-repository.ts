import type { InstitutionRating, Institution } from "../entities/institution-rating";

export interface InstitutionRatingRepository {
  findByConferenceId(conferenceId: string): Promise<InstitutionRating[]>;
  findByInstitution(institution: Institution): Promise<InstitutionRating[]>;
}
