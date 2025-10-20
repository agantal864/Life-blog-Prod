// Data fetching (server-side): uses shared instance to avoid connection pooling
import { prisma } from '@/lib/prismaclient';
import { auth } from '@/myauth';

export async function POST(req: Request) {
  const session = await auth();
  const { postId, content } = await req.json();

  if (!session?.user?.id || !postId || !content) {
    return new Response("Missing data", { status: 400 });
  }

  // Create the comment
  const comment = await prisma.comment.create({
    data: {
      content,
      postId,
      authorId: session.user.id,
    },
  });

  // Update the post's comment count
  await prisma.post.update({
    where: { id: postId },
    data: {
      commentsCount: {
        increment: 1,
      },
    },
  });

  // Fetch the comment again with full author info
  const enrichedComment = await prisma.comment.findUnique({
    where: { id: comment.id },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          isAdmin: true,
        },
      },
    },
  });

  return Response.json(enrichedComment);
}
