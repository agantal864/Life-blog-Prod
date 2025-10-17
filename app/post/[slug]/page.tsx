import BlogPost from "@/components/blogPost/post";
import { auth } from "@/auth";
// Data fetching (server-side): uses shared instance to avoid connection pooling
import { prisma } from '@/lib/prismaclient';

export default async function Page({ params }: { params: { slug: string } }) {
  const {slug} = await params
  const session = await auth();

  const post = await prisma.post.findUnique({
    where: { slug: slug },
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
