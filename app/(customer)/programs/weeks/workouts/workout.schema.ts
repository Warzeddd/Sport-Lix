import { z } from "zod";

export const WorkoutSchema = z.object({
  name: z.string(),
  order: z.string(),
});

export type WorkoutType = z.infer<typeof WorkoutSchema>;

