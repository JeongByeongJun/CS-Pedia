import { z } from "zod/v4";

export const InstitutionEnum = z.enum([
  "BK21",
  "KIISE",
  "KAIST",
  "SNU",
  "POSTECH",
  "CORE",
  "CCF",
  "CSRankings",
]);
export type Institution = z.infer<typeof InstitutionEnum>;

// BK21: 4점/3점/2점/1점, KIISE/KAIST/POSTECH: 최우수/우수, SNU: 인정
// CORE: A*/A/B/C, CCF: A/B/C, CSRankings: Included
export const TierEnum = z.enum([
  "4", "3", "2", "1",
  "최우수", "우수", "인정",
  "A*", "A", "B", "C",
  "Included",
]);
export type Tier = z.infer<typeof TierEnum>;

export const InstitutionRatingSchema = z.object({
  id: z.string().uuid(),
  conferenceId: z.string().uuid(),
  institution: InstitutionEnum,
  tier: TierEnum.nullable(),
  year: z.number(),
  notes: z.string().nullable(),
});

export type InstitutionRating = z.infer<typeof InstitutionRatingSchema>;
