/*
  Warnings:

  - You are about to drop the column `postId` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `postsId` on the `replaycomments` table. All the data in the column will be lost.
  - Added the required column `PostsId` to the `commentlikes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PostId` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PostsId` to the `replaycomments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_postId_fkey";

-- DropForeignKey
ALTER TABLE "replaycomments" DROP CONSTRAINT "replaycomments_postsId_fkey";

-- AlterTable
ALTER TABLE "commentlikes" ADD COLUMN     "PostsId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "postId",
ADD COLUMN     "PostId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "replaycomments" DROP COLUMN "postsId",
ADD COLUMN     "PostsId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_PostId_fkey" FOREIGN KEY ("PostId") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentlikes" ADD CONSTRAINT "commentlikes_PostsId_fkey" FOREIGN KEY ("PostsId") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "replaycomments" ADD CONSTRAINT "replaycomments_PostsId_fkey" FOREIGN KEY ("PostsId") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
