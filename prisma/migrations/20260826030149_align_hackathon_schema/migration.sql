/*
  Warnings:

  - You are about to drop the column `joinedAt` on the `HackathonParticipant` table. All the data in the column will be lost.
  - Made the column `startDate` on table `Hackathon` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endDate` on table `Hackathon` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Hackathon" ALTER COLUMN "startDate" SET NOT NULL,
ALTER COLUMN "endDate" SET NOT NULL,
ALTER COLUMN "isActive" SET DEFAULT true;

-- AlterTable
ALTER TABLE "HackathonParticipant" DROP COLUMN "joinedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
