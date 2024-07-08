import { z } from "zod";

export const ProgramSchema = z.object({
  name: z.string(),
  slug: z
    .string()
    .regex(/^[a-zA-Z0-9_-]*$/)
    .min(5)
    .max(20),
  image: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
});

export type ProgramType = z.infer<typeof ProgramSchema>;

// export default ProgramSchema;
