import { z } from "zod";

export const RepetitionSchema = z.object({
  repetition: z.string(),
  tempo: z.string().optional(),
  description: z.string().optional(),
  rir: z.string().optional(),
  recoveryTime: z.string().optional(),
  seriesId: z.string().optional(),
});

export type RepetitionType = z.infer<typeof RepetitionSchema>;
