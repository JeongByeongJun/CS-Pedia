import type { Conference, ConferenceField } from "../entities/conference";
import type { Institution } from "../entities/institution-rating";

export interface ConferenceFilters {
  field?: ConferenceField;
  institution?: Institution;
  search?: string;
}

export interface ConferenceWithRelations extends Conference {
  nextDeadline: Date | null;
  daysUntilDeadline: number | null;
  deadlineTimezone: string;
  venue: string | null;
  conferenceStart: Date | null;
  conferenceEnd: Date | null;
  institutionRatings: Array<{ institution: string; tier: string | null }>;
  latestBestPapers: Array<{ title: string; year: number; awardType: string }>;
}

export interface ConferenceRepository {
  findAll(filters?: ConferenceFilters): Promise<ConferenceWithRelations[]>;
  findBySlug(slug: string): Promise<ConferenceWithRelations | null>;
  findSlugs(): Promise<string[]>;
}
