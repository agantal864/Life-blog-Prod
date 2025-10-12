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

  const hasLiked = post.likes.some((like) => like.userId === session?.user?.id);

  return <BlogPost post={{ ...post, hasLiked }} session={session} />;
}
