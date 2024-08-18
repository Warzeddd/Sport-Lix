"use server";

import { ActionError, userAction } from "@/safe-action";
import { WeekSchema } from "./week.schema";
import { prisma } from "@/prisma";
import { z } from "zod";

export const createWeekAction = userAction(
  WeekSchema,
  async (input, context) => {

    const week = await prisma.week.create({
      data: {
        ...input,
        programId: input.programId,
      },
    });

    return week;
  }
);

export const updateWeekAction = userAction(
  z.object({
    id: z.string(),
    data: WeekSchema,
  }),
  async (input, context) => {

    const updatedWeek = await prisma.week.update({
      where: {
        id: input.id,
        programId: input.programId,
      },
      data: input.data,
    });

    return updatedWeek;
  }
);

export const deleteWeekAction = userAction(
  z.object({
    id: z.string(),
  }),
  async (input, context) => {

    const deletedWeek = await prisma.week.delete({
      where: {
        id: input.id,
      },
    });
console.log('ok')
    return deletedWeek;
  }
);
