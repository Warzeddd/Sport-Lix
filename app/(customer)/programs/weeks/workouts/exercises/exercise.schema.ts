import { z } from "zod";

const ExerciseSchema = z.object({
  name: z.string(),
  order: z.string(),
  seriesId: z.string(),
});

export default ExerciseSchema;
