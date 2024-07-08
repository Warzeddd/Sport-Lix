"use server";

import { ActionError, userAction } from "@/safe-action";
import { ProgramSchema } from "./program.schema";
import { prisma } from "@/prisma";
import { z } from "zod";

const verifySlugUniqueness = async (slug: string, productId?: string) => { 
  //verify if slug already exits
  const slugExists = await prisma.program.count({
    where: {
      slug: slug,
      id: productId ? {
        not: productId,
      } : undefined,
    },
  });

  if (slugExists) {
    throw new ActionError("Slug already exists")
  }

}


// // Conversion de createProgramAction en v7
// export const createProgramAction = userAction
//   .schema(ProgramSchema)
//   .action(async ({ parsedInput, ctx }) => {
//     const program = await prisma.program.create({
//       data: {
//         ...parsedInput,
//         userId: ctx.user.id,
//       },
//     });

//     return {data: program};
//   });

export const createProgramAction = userAction(
  ProgramSchema,
  async (input, context) => {   
    await verifySlugUniqueness(input.slug)

    const program = await prisma.program.create({
      data: {
        ...input,
        userId: context.user.id,
      },
    });

    return program;
  }
);

export const updateProgramAction = userAction(
  z.object({
    id: z.string(),
    data: ProgramSchema,
  }),
  async (input, context) => {   
    await verifySlugUniqueness(input.data.slug, input.id)

    const updatedProgram = await prisma.program.update({
      where: {
        id: input.id,
        userId: context.user.id,
      },
      data: input.data,
    });

    return updatedProgram;
  }
);

