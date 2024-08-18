"use server";

import { ActionError, userAction } from "@/safe-action";
import { RepetitionSchema } from "./repetition.schema";
import { prisma } from "@/prisma";
import { z } from "zod";

export const createRepetitionAction = userAction(
  RepetitionSchema,
  async (input, context) => {

    const repetition = await prisma.repetition.create({
      data: {
        ...input,
        seriesId: input.seriesId,
      },
    });

    return repetition;
  }
);

export const updateRepetitionAction = userAction(
  z.object({
    id: z.string(),
    data: RepetitionSchema,
  }),
  async (input, context) => {

    const updatedRepetition = await prisma.repetition.update({
      where: {
        id: input.id,
        seriesId: input.seriesId,
      },
      data: input.data,
    });

    return updatedRepetition;
  }
);

export const deleteRepetitionAction = userAction(
  z.object({
    id: z.string(),
  }),
  async (input, context) => {

    const deletedRepetition = await prisma.repetition.delete({
      where: {
        id: input.id,
      },
    });

    return deletedRepetition;
  }
);
