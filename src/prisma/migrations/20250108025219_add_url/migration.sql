/*
  Warnings:

  - You are about to drop the column `content` on the `task` table. All the data in the column will be lost.
  - Added the required column `deskripsi` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "task" DROP COLUMN "content",
ADD COLUMN     "deskripsi" TEXT NOT NULL,
ADD COLUMN     "urlFile" TEXT;
