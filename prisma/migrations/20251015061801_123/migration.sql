-- DropForeignKey
ALTER TABLE "public"."Viewer" DROP CONSTRAINT "Viewer_postId_fkey";

-- AddForeignKey
ALTER TABLE "Viewer" ADD CONSTRAINT "Viewer_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
