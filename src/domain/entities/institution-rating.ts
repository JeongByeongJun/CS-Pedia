import { z } from "zod/v4";

export const InstitutionEnum = z.enum([
  "BK21",
  "KIISE",
  "KAIST",
  "SNU",
  "POSTECH",
]);
export type Institution = z.infer<typeof InstitutionEnum>;

// BK21: 4점/3점/2점/1점, KIISE/POSTECH: 최우수/우수
export const TierEnum = z.enum(["4", "3", "2", "1", "최우수", "우수"]);
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
