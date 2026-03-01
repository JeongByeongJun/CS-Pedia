import { z } from "zod/v4";

export const AcceptanceRateSchema = z.object({
  id: z.string().uuid(),
  conferenceId: z.string().uuid(),
  year: z.number(),
  submitted: z.number().nullable(),
  accepted: z.number().nullable(),
  rate: z.number().nullable(),
  notes: z.string().nullable(),
});

export type AcceptanceRate = z.infer<typeof AcceptanceRateSchema>;
