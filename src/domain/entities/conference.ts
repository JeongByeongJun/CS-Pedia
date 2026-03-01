import { z } from "zod/v4";

export const ConferenceFieldEnum = z.enum([
  "AI/ML",
  "NLP",
  "CV",
  "Systems",
  "Security",
  "SE",
  "DB",
  "HCI",
  "Theory",
  "Networks",
  "Architecture",
  "Graphics",
  "Robotics",
  "Other",
]);
export type ConferenceField = z.infer<typeof ConferenceFieldEnum>;

export const ConferenceSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  nameEn: z.string(),
  nameKr: z.string().nullable(),
  acronym: z.string(),
  field: ConferenceFieldEnum,
  subField: z.string().nullable(),
  dblpKey: z.string().nullable(),
  websiteUrl: z.string().nullable(),
  description: z.string().nullable(),
});

export type Conference = z.infer<typeof ConferenceSchema>;
