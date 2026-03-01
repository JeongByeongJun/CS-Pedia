import { z } from "zod/v4";

export const AwardTypeEnum = z.enum([
  "best_paper",
  "best_paper_runner_up",
  "best_student_paper",
  "test_of_time",
]);
export type AwardType = z.infer<typeof AwardTypeEnum>;

export const BestPaperSchema = z.object({
  id: z.string().uuid(),
  conferenceId: z.string().uuid(),
  year: z.number(),
  paperTitle: z.string(),
  authors: z.string().nullable(),
  awardType: AwardTypeEnum,
  abstract: z.string().nullable(),
  paperUrl: z.string().nullable(),
  doi: z.string().nullable(),
  tags: z.array(z.string()),
});

export type BestPaper = z.infer<typeof BestPaperSchema>;
