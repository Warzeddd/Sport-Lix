"use server";

import { ActionError, userAction } from "@/safe-action";
import { ExerciseSchema } from "./exercise.schema";
import { prisma } from "@/prisma";
import { z } from "zod";

export const createExerciseAction = userAction(
  ExerciseSchema,
  async (input, context) => {

    const exercise = await prisma.exercise.create({
      data: {
        ...input,
        workoutId: input.workoutId,
      },
    });

    return exercise;
  }
);

export const updateExerciseAction = userAction(
  z.object({
    id: z.string(),
    data: ExerciseSchema,
  }),
  async (input, context) => {

    const updatedExercise = await prisma.exercise.update({
      where: {
        id: input.id,
        workoutId: input.workoutId,
      },
      data: input.data,
    });

    return updatedExercise;
  }
);

export const deleteExerciseAction = userAction(
  z.object({
    id: z.string(),
  }),
  async (input, context) => {

    const deletedExercise = await prisma.exercise.delete({
      where: {
        id: input.id,
      },
    });

    return deletedExercise;
  }
);
