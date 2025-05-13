/*
  Warnings:

  - You are about to drop the column `meta` on the `Post` table. All the data in the column will be lost.
  - Added the required column `data` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meta` to the `PostType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "meta",
ADD COLUMN     "data" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "PostType" ADD COLUMN     "meta" JSONB NOT NULL;
