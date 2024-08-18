// "use server";

// import { ActionError, userAction } from "@/safe-action";
// import { MuscleGroupSchema } from "./muscleGroup.schema";
// import { prisma } from "@/prisma";
// import { z } from "zod";

// export const createMuscleGroupAction = userAction(
//   MuscleGroupSchema,
//   async (input, context) => {

//     const worphology = await prisma.muscleGroup.create({
//       data: {
//         ...input,
//         programId: input.programId,
//       },
//     });

//     return muscleGroup;
//   }
// );

// export const updateWorphologyAction = userAction(
//   z.object({
//     id: z.string(),
//     data: MuscleGroupSchema,
//   }),
//   async (input, context) => {

//     const updatedMuscleGroup = await prisma.muscleGroup.update({
//       where: {
//         id: input.id,
//         programId: input.programId,
//       },
//       data: input.data,
//     });

//     return updatedMuscleGroup;
//   }
// );

// export const deleteMuscleGroupAction = userAction(
//   z.object({
//     id: z.string(),
//   }),
//   async (input, context) => {

//     const deletedMuscleGroup = await prisma.muscleGroup.delete({
//       where: {
//         id: input.id,
//       },
//     });

//     return deletedMuscleGroup;
//   }
// );
