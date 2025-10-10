import { PrismaClient } from '@prisma/client';
import { auth } from "@/auth"

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const currentSession = await auth();
    if (!currentSession?.user?.id) return new Response("Unauthorized", { status: 401 });

    const body = await req.json();
    const { title, content, thumbnailUrl, isFeatured, tags } = body;
  
    const post = await prisma.post.create({
        data: {
        title,
        content,
        thumbnailUrl,
        isFeatured,
        tags,
        authorId: currentSession?.user?.id,
        },
    });

    return Response.json(post);
}