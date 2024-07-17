import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  globalPrisma: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.globalPrisma ?? prismaClientSingleton();


if (process.env.NODE_ENV !== 'production') globalThis.globalPrisma = prisma;