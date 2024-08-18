import { z } from "zod";

export const ExerciseSchema = z.object({
  name: z.string(),
  order: z.string(),
  workoutId: z.string().optional(),
});

export type ExerciseType = z.infer<typeof ExerciseSchema>;