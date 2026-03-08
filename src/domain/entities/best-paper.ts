import { z } from "zod/v4";

export const AwardTypeEnum = z.enum([
  "best_paper",
  "best_paper_runner_up",
  "best_student_paper",
  "best_paper_early_career",
  "best_paper_applied_ds",
  "distinguished_paper",
  "outstanding_paper",
  "honorable_mention",
  "test_of_time",
]);

export const AWARD_TYPE_LABELS: Record<z.infer<typeof AwardTypeEnum>, string> = {
  best_paper: "Best Paper Award",
  best_paper_runner_up: "Best Paper Runner-Up",
  best_student_paper: "Best Student Paper Award",
  best_paper_early_career: "Best Paper Award (Early Career)",
  best_paper_applied_ds: "Best Paper Award (Applied DS Track)",
  distinguished_paper: "Distinguished Paper Award",
  outstanding_paper: "Outstanding Paper Award",
  honorable_mention: "Honorable Mention",
  test_of_time: "Test of Time Award",
};
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
