/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `PostType` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `PostType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PostType" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PostType_slug_key" ON "PostType"("slug");
