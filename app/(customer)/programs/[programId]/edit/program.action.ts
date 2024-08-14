"use server";

import { ActionError, userAction } from "@/safe-action";
import { ProgramSchema } from "./program.schema";
import { prisma } from "@/prisma";
import { z } from "zod";
import { User } from "@prisma/client";

const verifySlugUniqueness = async (slug: string, programId?: string) => { 
  //verify if slug already exits
  const slugExists = await prisma.program.count({
    where: {
      slug: slug,
      id: programId ? {
        not: programId,
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

export const VerifyUserPlan = async (user: User) => {
  if (user.plan === "PREMIUM"){
    return;
  }

  const userProgramsCount = await prisma.program.count({
    where: {
      userId: user.id,
    },
  });

  if(userProgramsCount > 0) {
    throw new ActionError(
      "You need to upgrade to premium to create more programs"
    );
  }
};

export const createProgramAction = userAction(
  ProgramSchema,
  async (input, context) => {   
    await verifySlugUniqueness(input.slug)
    await VerifyUserPlan(context.user);

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

export const deleteProgramAction = userAction(
  z.string(),
  async (programId, context) => {
    await prisma.program.delete({
      where: {
        id: programId,
        userId: context.user.id,
      },
    });
  }
);
