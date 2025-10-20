// Data fetching (server-side): uses shared instance to avoid connection pooling
import { prisma } from '@/lib/prismaclient';
import { auth } from "@/myauth"
import slugify from "slugify";

export async function POST(req: Request) {
    const currentSession = await auth();
    if (!currentSession?.user?.id) return new Response("Unauthorized", { status: 401 });

    const body = await req.json();
    const { title, content, thumbnailUrl, isFeatured, tags } = body;
    const slug = slugify(title, { lower: true, strict: true });
  
    const post = await prisma.post.create({
        data: {
        title,
        content,
        thumbnailUrl,
        isFeatured,
        tags,
        authorId: currentSession?.user?.id,
        slug
        },
    });

    return Response.json(post);
}