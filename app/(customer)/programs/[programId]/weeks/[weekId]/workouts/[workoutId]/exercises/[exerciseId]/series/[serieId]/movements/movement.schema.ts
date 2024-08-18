// import { z } from "zod";

// export const MovementSchema = z.object({
//   id: z.string().uuid().optional(),  // L'ID est optionnel lors de la création
//   name: z.string(),
//   image: z.string().optional(),  // L'image peut être facultative
//   description: z.string().optional(),  // La description peut être facultative
//   morphologyId: z.string().optional(),
//   groupId: z.string().optional(),
//   muscleId: z.string().optional(),
// });

// export type MovementType = z.infer<typeof MovementSchema>;