import { auth } from "@/auth";
// Data fetching (server-side): uses shared instance to avoid connection pooling
import { prisma } from '@/lib/prismaclient';

export async function DELETE(req: Request) {
  const session = await auth();
  const { commentId } = await req.json();

  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment || comment.authorId !== session.user.id) {
    return new Response("Forbidden", { status: 403 });
  }

  await prisma.comment.delete({
    where: { id: commentId },
  });

  await prisma.post.update({
    where: { id: comment.postId },
    data: {
      commentsCount: {
        decrement: 1,
      },
    },
  });

  return new Response("Deleted", { status: 200 });
}
