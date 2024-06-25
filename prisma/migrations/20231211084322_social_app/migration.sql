/*
  Warnings:

  - You are about to drop the column `PostsId` on the `commentlikes` table. All the data in the column will be lost.
  - You are about to drop the column `PostsId` on the `replaycomments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "commentlikes" DROP CONSTRAINT "commentlikes_PostsId_fkey";

-- DropForeignKey
ALTER TABLE "replaycomments" DROP CONSTRAINT "replaycomments_PostsId_fkey";

-- AlterTable
ALTER TABLE "commentlikes" DROP COLUMN "PostsId";

-- AlterTable
ALTER TABLE "replaycomments" DROP COLUMN "PostsId";
