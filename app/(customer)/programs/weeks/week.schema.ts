import { z } from "zod";

export const WeekSchema = z.object({
  name: z.string(),
  order: z.string(),
  programId:  z.string().optional(),
});

export type WeekType = z.infer<typeof WeekSchema>;

