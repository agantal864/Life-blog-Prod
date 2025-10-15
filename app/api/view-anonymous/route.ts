import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
// Data fetching (server-side): uses shared instance to avoid connection pooling
import { prisma } from '@/lib/prismaclient';

export async function POST(req: NextRequest) {
  const { postId } = await req.json();
  const cookieStore = await cookies();
  const viewKey = `viewed-${postId}`;
  const hasViewed = cookieStore.get(viewKey);

  if (hasViewed) {
    return new Response('Already viewed');
  }

  await prisma.post.update({
    where: { id: postId },
    data: { anonymousViews: { increment: 1 } },
  });

  cookieStore.set(viewKey, 'true', {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  });

  return new Response('Anonymous view tracked');
}
