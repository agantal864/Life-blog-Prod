import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prismaclient";
import Google from "next-auth/providers/google";

console.log("Initializing Auth.js with PrismaAdapter");

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT callback triggered");
      if (user) {
        console.log("Incoming user object:", user);
        token.sub = user.id;

        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: user.id },
            select: {
              isAdmin: true,
              isMasterAdmin: true,
            },
          });

          console.log("DB user fetched:", dbUser);

          token.isAdmin = dbUser?.isAdmin ?? false;
          token.isMasterAdmin = dbUser?.isMasterAdmin ?? false;
        } catch (error) {
          console.error("Error fetching user from DB in JWT callback:", error);
        }
      }
      return token;
    },

    async session({ session, token }) {
      console.log("Session callback triggered");
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.isAdmin = token.isAdmin as boolean;
        session.user.isMasterAdmin = token.isMasterAdmin as boolean;
        console.log("Session enriched with token data:", session.user);
      }
      return session;
    },
  },
});
