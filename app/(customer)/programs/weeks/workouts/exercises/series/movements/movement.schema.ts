import { z } from "zod";

const MovementSchema = z.object({
  name: z.string(),
  image: z.string(),
  description: z.string(),
  morphologyId: z.string(),
  groupId: z.string(),
  muscleId: z.string(),
});

export default MovementSchema;
