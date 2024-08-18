import { z } from "zod";

export const WorkoutSchema = z.object({
  name: z.string(),
  order: z.string(),
  weekId: z.string().optional(),
});

export type WorkoutType = z.infer<typeof WorkoutSchema>;

