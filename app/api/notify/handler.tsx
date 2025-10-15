import * as React from "react";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prismaclient";
import { resend } from "@/lib/resend";
import { EmailTemplate } from "@/components/email-template/myemail-template";

export async function handler(req: Request) {
  try {
    const { postTitle } = await req.json();

    if (!postTitle) {
      return NextResponse.json({ error: "Missing postTitle" }, { status: 400 });
    }

    const subscribers = await prisma.subscriber.findMany({
      select: { email: true },
    });

    const results = await Promise.all(
      subscribers.map(async ({ email }) => {
        const { data, error } = await resend.emails.send({
          from: "Azis <onboarding@resend.dev>", // Replace with verified domain when ready
          to: "agantal864@gmail.com", // Replace with dynamic `email` once domain is verified
          subject: "New Blog Update!",
          react: <EmailTemplate postTitle={postTitle} />,
        });
        return { email, error, data };
      })
    );

    const errors = results.filter((r) => r.error);
    if (errors.length > 0) {
      return NextResponse.json({ error: errors }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
