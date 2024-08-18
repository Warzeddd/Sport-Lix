import { z } from "zod";

export const SeriesSchema = z.object({
  movementId: z.string(),
  order: z.string(),
  seriesCount: z.string(),
  exerciseId: z.string().optional(),
});

export type SeriesType = z.infer<typeof SeriesSchema>;


