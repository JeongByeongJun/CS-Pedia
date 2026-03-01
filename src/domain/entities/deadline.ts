import { z } from "zod/v4";

export const DeadlineSchema = z.object({
  id: z.string().uuid(),
  conferenceId: z.string().uuid(),
  year: z.number(),
  cycle: z.string().nullable(),
  abstractDeadline: z.date().nullable(),
  paperDeadline: z.date().nullable(),
  notificationDate: z.date().nullable(),
  cameraReady: z.date().nullable(),
  conferenceStart: z.date().nullable(),
  conferenceEnd: z.date().nullable(),
  venue: z.string().nullable(),
  timezone: z.string(),
  notes: z.string().nullable(),
});

export type Deadline = z.infer<typeof DeadlineSchema>;
