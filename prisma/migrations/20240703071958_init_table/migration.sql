/*
  Warnings:

  - You are about to drop the column `movementId` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `repetitionId` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `series` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `group` on the `Movement` table. All the data in the column will be lost.
  - You are about to drop the column `preference` on the `Movement` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Program` table. All the data in the column will be lost.
  - You are about to drop the column `exerciseId` on the `Program` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Program` table. All the data in the column will be lost.
  - Added the required column `name` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seriesId` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `Movement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `morphologyId` to the `Movement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `muscleId` to the `Movement` table without a default value. This is not possible if the table is not empty.
  - Made the column `image` on table `Movement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Movement` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `Program` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Program` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `recoveryTime` to the `Repetition` table without a default value. This is not possible if the table is not empty.
  - Made the column `tempo` on table `Repetition` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Repetition` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rir` on table `Repetition` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_movementId_fkey";

-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_repetitionId_fkey";

-- DropForeignKey
ALTER TABLE "Program" DROP CONSTRAINT "Program_exerciseId_fkey";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "movementId",
DROP COLUMN "repetitionId",
DROP COLUMN "series",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "seriesId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Movement" DROP COLUMN "group",
DROP COLUMN "preference",
ADD COLUMN     "groupId" TEXT NOT NULL,
ADD COLUMN     "morphologyId" TEXT NOT NULL,
ADD COLUMN     "muscleId" TEXT NOT NULL,
ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "Program" DROP COLUMN "createdAt",
DROP COLUMN "exerciseId",
DROP COLUMN "updatedAt",
ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "Repetition" ADD COLUMN     "recoveryTime" TEXT NOT NULL,
ALTER COLUMN "tempo" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "rir" SET NOT NULL;

-- CreateTable
CREATE TABLE "Morphology" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Morphology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MuscleGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MuscleGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Muscle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "portion" TEXT NOT NULL,

    CONSTRAINT "Muscle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Week" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL,

    CONSTRAINT "Week_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workout" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "cycleId" TEXT NOT NULL,
    "order" TEXT NOT NULL,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Series" (
    "id" TEXT NOT NULL,
    "movementId" TEXT NOT NULL,
    "order" TEXT NOT NULL,
    "seriesCount" TEXT NOT NULL,
    "repetitionId" TEXT NOT NULL,

    CONSTRAINT "Series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cycle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cycle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Muscle" ADD CONSTRAINT "Muscle_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "MuscleGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_morphologyId_fkey" FOREIGN KEY ("morphologyId") REFERENCES "Morphology"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "MuscleGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_muscleId_fkey" FOREIGN KEY ("muscleId") REFERENCES "Muscle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Week" ADD CONSTRAINT "Week_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Week" ADD CONSTRAINT "Week_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_cycleId_fkey" FOREIGN KEY ("cycleId") REFERENCES "Cycle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_movementId_fkey" FOREIGN KEY ("movementId") REFERENCES "Movement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_repetitionId_fkey" FOREIGN KEY ("repetitionId") REFERENCES "Repetition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
