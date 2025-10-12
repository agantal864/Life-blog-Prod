import { PrismaClient } from '@prisma/client';
import { auth } from '@/auth';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const session = await auth();
  const { postId, content } = await req.json();

  if (!session?.user?.id || !postId || !content) {
    return new Response("Missing data", { status: 400 });
  }

  const comment = await prisma.comment.create({
    data: {
      content,
      postId,
      authorId: session.user.id,
    },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  await prisma.post.update({
    where: { id: postId },
    data: {
      commentsCount: {
        increment: 1,
      },
    },
  })

  return Response.json(comment);
}
