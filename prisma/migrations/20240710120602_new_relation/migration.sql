/*
  Warnings:

  - You are about to drop the column `seriesId` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `repetitionId` on the `Series` table. All the data in the column will be lost.
  - You are about to drop the column `workoutId` on the `Week` table. All the data in the column will be lost.
  - You are about to drop the column `cycleId` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `exerciseId` on the `Workout` table. All the data in the column will be lost.
  - Added the required column `workoutId` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seriesId` to the `Repetition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exerciseId` to the `Series` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weekId` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_seriesId_fkey";

-- DropForeignKey
ALTER TABLE "Series" DROP CONSTRAINT "Series_repetitionId_fkey";

-- DropForeignKey
ALTER TABLE "Week" DROP CONSTRAINT "Week_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_cycleId_fkey";

-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_exerciseId_fkey";

-- AlterTable
ALTER TABLE "Cycle" ALTER COLUMN "endDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "seriesId",
ADD COLUMN     "workoutId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Repetition" ADD COLUMN     "seriesId" TEXT NOT NULL,
ALTER COLUMN "tempo" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "rir" DROP NOT NULL,
ALTER COLUMN "recoveryTime" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Series" DROP COLUMN "repetitionId",
ADD COLUMN     "exerciseId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Week" DROP COLUMN "workoutId";

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "cycleId",
DROP COLUMN "exerciseId",
ADD COLUMN     "weekId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_CycleToWorkout" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CycleToWorkout_AB_unique" ON "_CycleToWorkout"("A", "B");

-- CreateIndex
CREATE INDEX "_CycleToWorkout_B_index" ON "_CycleToWorkout"("B");

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "Week"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Series" ADD CONSTRAINT "Series_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repetition" ADD CONSTRAINT "Repetition_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CycleToWorkout" ADD CONSTRAINT "_CycleToWorkout_A_fkey" FOREIGN KEY ("A") REFERENCES "Cycle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CycleToWorkout" ADD CONSTRAINT "_CycleToWorkout_B_fkey" FOREIGN KEY ("B") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
