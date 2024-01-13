/*
  Warnings:

  - The primary key for the `Idea` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Idea" DROP CONSTRAINT "Idea_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Idea_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Idea_id_seq";
