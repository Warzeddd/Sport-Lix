"use server";

import { ActionError, userAction } from "@/safe-action";
import { WorkoutSchema } from "./workout.schema";
import { prisma } from "@/prisma";
import { z } from "zod";

export const createWorkoutAction = userAction(
  WorkoutSchema,
  async (input, context) => {

    const workout = await prisma.workout.create({
      data: {
        ...input,
        weekId: input.weekId,
      },
    });

    return workout;
  }
);

export const updateWorkoutAction = userAction(
  z.object({
    id: z.string(),
    data: WorkoutSchema,
  }),
  async (input, context) => {

    const updatedWorkout = await prisma.workout.update({
      where: {
        id: input.id,
        weekId: input.weekId,
      },
      data: input.data,
    });

    return updatedWorkout;
  }
);

export const deleteWorkoutAction = userAction(
  z.object({
    id: z.string(),
  }),
  async (input, context) => {

    const deletedWorkout = await prisma.workout.delete({
      where: {
        id: input.id,
      },
    });

    return deletedWorkout;
  }
);
