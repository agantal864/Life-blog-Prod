// Data fetching (server-side): uses shared instance to avoid connection pooling
import { prisma } from '@/lib/prismaclient';
import { auth } from '@/myauth';

export async function POST(req: Request) {
  const session = await auth();
  const { postId } = await req.json();

  if (!session?.user?.id || !postId) {
    return new Response("Missing data", { status: 400 });
  }

  const userId = session.user.id;

  const existingLike = await prisma.like.findUnique({
    where: {
      postId_userId: { postId, userId },
    },
  });

  let status: 'liked' | 'unliked';
  let likesCount: number;

  if (existingLike) {
    // UNLIKE
    await prisma.like.delete({
      where: { postId_userId: { postId, userId } },
    });

    const updated = await prisma.post.update({
      where: { id: postId },
      data: {
        likesCount: { decrement: 1 },
      },
    });

    status = 'unliked';
    likesCount = updated.likesCount;
  } else {
    // LIKE
    await prisma.like.create({
      data: { postId, userId },
    });

    const updated = await prisma.post.update({
      where: { id: postId },
      data: {
        likesCount: { increment: 1 },
      },
    });

    status = 'liked';
    likesCount = updated.likesCount;
  }

  return Response.json({ status, likesCount });
}
