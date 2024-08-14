import { z } from "zod";

const SeriesSchema = z.object({
  movementId: z.string(),
  order: z.string(),
  seriesCount: z.string(),
  repetitionId: z.string(),
});

export type SeriesType = z.infer<typeof SeriesSchema>;

export default SeriesSchema;
