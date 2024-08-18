// "use server";

// import { ActionError, userAction } from "@/safe-action";
// import { MuscleSchema } from "./muscle.schema";
// import { prisma } from "@/prisma";
// import { z } from "zod";

// export const createMuscleAction = userAction(
//   MuscleSchema,
//   async (input, context) => {

//     const worphology = await prisma.muscle.create({
//       data: {
//         ...input,
//         programId: input.programId,
//       },
//     });

//     return muscle;
//   }
// );

// export const updateWorphologyAction = userAction(
//   z.object({
//     id: z.string(),
//     data: MuscleSchema,
//   }),
//   async (input, context) => {

//     const updatedMuscle = await prisma.muscle.update({
//       where: {
//         id: input.id,
//         programId: input.programId,
//       },
//       data: input.data,
//     });

//     return updatedMuscle;
//   }
// );

// export const deleteMuscleAction = userAction(
//   z.object({
//     id: z.string(),
//   }),
//   async (input, context) => {

//     const deletedMuscle = await prisma.muscle.delete({
//       where: {
//         id: input.id,
//       },
//     });

//     return deletedMuscle;
//   }
// );
