import { auth } from "@/auth";
import { prisma } from "@/lib/prismaclient";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const update = await prisma.user.update({
    where: { id: session.user.id },
    data: { isAdminRequest: true },
  });

  if (!update) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
