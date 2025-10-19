import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST() {
  try {
    revalidatePath('/');
    revalidatePath('/blogfeed');

    return NextResponse.json({ revalidated: true });
  } catch (err) {
    console.error("Revalidation error:", err);
    return NextResponse.json({ error: 'Failed to revalidate' }, { status: 500 });
  }
}
