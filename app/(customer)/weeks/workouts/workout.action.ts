// "use server";

// import { ActionError, userAction } from "@/safe-action";
// import { WorkoutSchema } from "./workout.schema";
// import { prisma } from "@/prisma";
// import { z } from "zod";

// async function fetchWeek(programId: string) {
//   // Fetch the week associated with the user
//   const week = await prisma.week.findFirst({
//     where: { programId },
//   });

//   if (!week) {
//     throw new ActionError("Week not found");
//   }

//   return { week };
// }


// export const createWorkoutAction = userAction(
//   WorkoutSchema,
//   async (input, context) => {

//     const { week } = await fetchWeek(context.program.id);

//     const workout = await prisma.workout.create({
//       data: {
//         ...input,
//         weekId: week.id,
//       },
//     });

//     return workout;
//   }
// );

// export const updateWorkoutAction = userAction(
//   z.object({
//     id: z.string(),
//     data: WorkoutSchema,
//   }),
//   async (input, context) => {
//     const { week } = await fetchWeek(context.program.id);

//     const updatedWorkout = await prisma.workout.update({
//       where: {
//         id: input.id,
//         weekId: week.id,
//       },
//       data: input.data,
//     });

//     return updatedWeek;
//   }
// );
