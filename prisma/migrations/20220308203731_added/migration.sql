/*
  Warnings:

  - Added the required column `fr` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mo` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sa` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `su` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `th` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tu` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `we` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "fr" TEXT NOT NULL,
ADD COLUMN     "mo" TEXT NOT NULL,
ADD COLUMN     "sa" TEXT NOT NULL,
ADD COLUMN     "su" TEXT NOT NULL,
ADD COLUMN     "th" TEXT NOT NULL,
ADD COLUMN     "tu" TEXT NOT NULL,
ADD COLUMN     "we" TEXT NOT NULL;
