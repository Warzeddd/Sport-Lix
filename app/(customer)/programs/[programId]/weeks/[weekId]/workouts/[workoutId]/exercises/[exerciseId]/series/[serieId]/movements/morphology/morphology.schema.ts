// import { z } from "zod";

// export const MuscleSchema = z.object({
//   id: z.string().uuid().optional(),  // L'ID est optionnel lors de la création
//   name: z.string(),
//   groupId: z.string().uuid(),
//   portion: z.string().optional(),  // La portion est facultative
//   movements: z.string().optional(),  // Liste de mouvements associée
// });

// export type MuscleType = z.infer<typeof MuscleSchema>;