import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getServerSession } from "next-auth";
import type { DefaultSession, NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "~/server/db";
import { env } from "~/env.mjs";

declare module "next-auth" {
   interface Session extends DefaultSession {
      user: {
         id: string;
         canComment: boolean;
         isAdmin: boolean;
      } & DefaultSession["user"];
   }
}

export const authOptions: NextAuthOptions = {
   callbacks: {
      session: ({ session, user }) => ({
         ...session,
         user: {
            ...session.user,
            id: user.id,
            canComment: (user as any).canComment,
            isAdmin: (user as any).isAdmin,
         },
      }),
   },
   adapter: PrismaAdapter(prisma),
   providers: [
      DiscordProvider({
         clientId: env.DISCORD_CLIENT_ID,
         clientSecret: env.DISCORD_CLIENT_SECRET,
      }),
      GitHubProvider({
         clientId: env.GITHUB_CLIENT_ID,
         clientSecret: env.GITHUB_CLIENT_SECRET,
      }),
      GoogleProvider({
         clientId: env.GOOGLE_CLIENT_ID,
         clientSecret: env.GOOGLE_CLIENT_SECRET,
      }),
   ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
