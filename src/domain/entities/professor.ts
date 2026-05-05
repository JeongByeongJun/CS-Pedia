import { z } from "zod/v4";

export const DblpStatusEnum = z.enum(["confirmed", "ambiguous", "not_found"]);
export type DblpStatus = z.infer<typeof DblpStatusEnum>;

export const ProfessorSchema = z.object({
  id: z.string().uuid(),
  nameKo: z.string(),
  nameEn: z.string().nullable(),
  university: z.string(),
  department: z.string().nullable(),
  rank: z.string(),
  dblpPid: z.string().nullable(),
  homepageUrl: z.string().nullable(),
  dblpStatus: DblpStatusEnum,
});
export type Professor = z.infer<typeof ProfessorSchema>;

export const ProfessorPublicationSchema = z.object({
  id: z.string().uuid(),
  professorId: z.string().uuid(),
  conferenceId: z.string().uuid(),
  year: z.number(),
  paperTitle: z.string().nullable(),
  dblpKey: z.string().nullable(),
});
export type ProfessorPublication = z.infer<typeof ProfessorPublicationSchema>;
