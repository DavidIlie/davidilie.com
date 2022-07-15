import NextAuth, { type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/server/db/client";

export const authOptions: NextAuthOptions = {
   adapter: PrismaAdapter(prisma),
   providers: [
      GithubProvider({
         clientId: process.env.GITHUB_ID,
         clientSecret: process.env.GITHUB_SECRET,
      }),
      GoogleProvider({
         clientId: process.env.GOOGLE_ID,
         clientSecret: process.env.GOOGLE_SECRET,
      }),
      DiscordProvider({
         clientId: process.env.DISCORD_ID,
         clientSecret: process.env.DISCORD_SECRET,
      }),
   ],
   callbacks: {
      async session({ session, user }) {
         if (session?.user) {
            session.user.id = user.id;
            (session.user as any).isAdmin = user.isAdmin;
            (session.user as any).canComment = user.canComment;
         }
         return session;
      },
   },
};

export default NextAuth(authOptions);
