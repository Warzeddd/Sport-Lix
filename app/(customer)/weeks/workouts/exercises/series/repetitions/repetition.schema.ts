import { z } from "zod";

const RepetitionSchema = z.object({
  repetition: z.string(),
  tempo: z.string(),
  description: z.string(),
  rir: z.string(),
  recoveryTime: z.string(),
});

export default RepetitionSchema;
