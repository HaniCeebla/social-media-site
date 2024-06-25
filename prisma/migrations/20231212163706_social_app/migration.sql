/*
  Warnings:

  - You are about to drop the column `usersId` on the `comments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_usersId_fkey";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "usersId";
