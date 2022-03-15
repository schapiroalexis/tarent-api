/*
  Warnings:

  - Changed the type of `startDate` on the `Schedule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endDate` on the `Schedule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "scheduleId" INTEGER;

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "startDate",
ADD COLUMN     "startDate" TIMESTAMPTZ NOT NULL,
DROP COLUMN "endDate",
ADD COLUMN     "endDate" TIMESTAMPTZ NOT NULL;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
