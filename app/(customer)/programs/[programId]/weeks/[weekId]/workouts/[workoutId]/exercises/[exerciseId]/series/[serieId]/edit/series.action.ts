"use server";

import { ActionError, userAction } from "@/safe-action";
import { SeriesSchema } from "./series.schema";
import { prisma } from "@/prisma";
import { z } from "zod";

export const createSeriesAction = userAction(
  SeriesSchema,
  async (input, context) => {

    const series = await prisma.series.create({
      data: {
        ...input,
        exerciseId: input.exerciseId,
      },
    });

    return series;
  }
);

export const updateWorphologyAction = userAction(
  z.object({
    id: z.string(),
    data: SeriesSchema,
  }),
  async (input, context) => {

    const updatedSeries = await prisma.series.update({
      where: {
        id: input.id,
        exerciseId: input.exerciseId,
      },
      data: input.data,
    });

    return updatedSeries;
  }
);

export const deleteSeriesAction = userAction(
  z.object({
    id: z.string(),
  }),
  async (input, context) => {

    const deletedSeries = await prisma.series.delete({
      where: {
        id: input.id,
      },
    });

    return deletedSeries;
  }
);
