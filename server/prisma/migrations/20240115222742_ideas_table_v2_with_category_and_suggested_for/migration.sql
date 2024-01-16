/*
  Warnings:

  - You are about to drop the column `category` on the `Idea` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Idea" DROP COLUMN "category",
ADD COLUMN     "suggestedFor" TEXT[];

-- CreateTable
CREATE TABLE "_IdeaToCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_IdeaToCategory_AB_unique" ON "_IdeaToCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_IdeaToCategory_B_index" ON "_IdeaToCategory"("B");

-- AddForeignKey
ALTER TABLE "_IdeaToCategory" ADD CONSTRAINT "_IdeaToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Idea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IdeaToCategory" ADD CONSTRAINT "_IdeaToCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "IdeaCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
