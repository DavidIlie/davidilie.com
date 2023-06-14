import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getServerSession } from "next-auth";
import type { NextAuthOptions, DefaultSession } from "next-auth";

import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

import { env } from "~/env.mjs";
import { prisma } from "~/server/db";

declare module "next-auth" {
   interface Session extends DefaultSession {
      user: {
         id: string;
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
