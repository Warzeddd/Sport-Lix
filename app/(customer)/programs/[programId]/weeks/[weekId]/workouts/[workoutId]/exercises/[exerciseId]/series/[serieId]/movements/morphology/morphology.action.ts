// "use server";

// import { ActionError, userAction } from "@/safe-action";
// import { MorphologySchema } from "./morphology.schema";
// import { prisma } from "@/prisma";
// import { z } from "zod";

// export const createMorphologyAction = userAction(
//   MorphologySchema,
//   async (input, context) => {

//     const worphology = await prisma.morphology.create({
//       data: {
//         ...input,
//         programId: input.programId,
//       },
//     });

//     return morphology;
//   }
// );

// export const updateWorphologyAction = userAction(
//   z.object({
//     id: z.string(),
//     data: MorphologySchema,
//   }),
//   async (input, context) => {

//     const updatedMorphology = await prisma.morphology.update({
//       where: {
//         id: input.id,
//         programId: input.programId,
//       },
//       data: input.data,
//     });

//     return updatedMorphology;
//   }
// );

// export const deleteMorphologyAction = userAction(
//   z.object({
//     id: z.string(),
//   }),
//   async (input, context) => {

//     const deletedMorphology = await prisma.morphology.delete({
//       where: {
//         id: input.id,
//       },
//     });

//     return deletedMorphology;
//   }
// );
