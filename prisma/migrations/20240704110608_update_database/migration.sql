/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Dashboard` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Program` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Dashboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Program` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dashboard" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Movement" ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Muscle" ALTER COLUMN "portion" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Dashboard_slug_key" ON "Dashboard"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Program_slug_key" ON "Program"("slug");
