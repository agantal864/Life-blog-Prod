import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prismaclient";
import Google from "next-auth/providers/google"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  session: {
    strategy: "jwt"
  },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { 
            isAdmin: true,
            isMasterAdmin: true
          }
        });
        token.isAdmin = dbUser?.isAdmin ?? false;
        token.isMasterAdmin = dbUser?.isMasterAdmin ?? false;
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string
        session.user.isAdmin = token.isAdmin as boolean;
        session.user.isMasterAdmin = token.isMasterAdmin as boolean;
      }
      return session
    }
  }
})

