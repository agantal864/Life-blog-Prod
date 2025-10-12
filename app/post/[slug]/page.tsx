import BlogPost from "@/components/blogpost/post";
import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await auth();

  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    include: {
      author: true,
      comments: {
        include: { author: true },
        orderBy: { createdAt: "desc" },
      },
      likes: true,
    },
  });

  if (!post) throw new Error("Post not found");

  if (session?.user?.id) {
    const alreadyViewed = await prisma.viewer.findFirst({
      where: {
        postId: post.id,
        userId: session.user.id,
      }
    })

    if (!alreadyViewed) {
      await prisma.viewer.create({
        data: {
          postId: post.id,
          userId: session.user.id,
        },
      });

      await prisma.post.update({
        where: { id: post.id },
        data: {
          views: { increment: 1 },
        },
      });
    }
  }  

  const hasLiked = post.likes.some((like) => like.userId === session?.user?.id);

  return <BlogPost post={{ ...post, hasLiked }} session={session} />;
}
