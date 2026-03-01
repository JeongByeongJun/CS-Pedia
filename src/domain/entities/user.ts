import { z } from "zod/v4";

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().nullable(),
  name: z.string().nullable(),
  institution: z.string().nullable(),
  researchField: z.string().nullable(),
});

export type User = z.infer<typeof UserSchema>;
