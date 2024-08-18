// "use server";

// import { ActionError, userAction } from "@/safe-action";
// import { MovementSchema } from "./movement.schema";
// import { prisma } from "@/prisma";
// import { z } from "zod";

// export const createMovementAction = userAction(
//   MovementSchema,
//   async (input, context) => {

//     const movement = await prisma.movement.create({
//       data: {
//         ...input,
//         seriesId: input.seriesId,
//       },
//     });

//     return movement;
//   }
// );

// export const updateWorphologyAction = userAction(
//   z.object({
//     id: z.string(),
//     data: MovementSchema,
//   }),
//   async (input, context) => {

//     const updatedMovement = await prisma.movement.update({
//       where: {
//         id: input.id,
//         seriesId: input.seriesId,
//       },
//       data: input.data,
//     });

//     return updatedMovement;
//   }
// );

// export const deleteMovementAction = userAction(
//   z.object({
//     id: z.string(),
//   }),
//   async (input, context) => {

//     const deletedMovement = await prisma.movement.delete({
//       where: {
//         id: input.id,
//       },
//     });

//     return deletedMovement;
//   }
// );
