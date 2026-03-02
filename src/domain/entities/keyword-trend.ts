import { z } from "zod/v4";

export const KeywordTrendSchema = z.object({
  id: z.string().uuid(),
  conferenceId: z.string().uuid(),
  year: z.number(),
  keyword: z.string(),
  count: z.number(),
});

export type KeywordTrend = z.infer<typeof KeywordTrendSchema>;
