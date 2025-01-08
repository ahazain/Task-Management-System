/*
  Warnings:

  - Made the column `urlFile` on table `task` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "task" DROP CONSTRAINT "task_assigneeId_fkey";

-- AlterTable
ALTER TABLE "task" ALTER COLUMN "assigneeId" DROP NOT NULL,
ALTER COLUMN "urlFile" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
