import { z } from "zod/v4";

export const BookmarkSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  conferenceId: z.string().uuid(),
  notifyBeforeDays: z.number().default(7),
});

export type Bookmark = z.infer<typeof BookmarkSchema>;
