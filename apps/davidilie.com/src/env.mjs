import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
   server: {
      DATABASE_URL: z.string().url(),
      NODE_ENV: z.enum(["development", "test", "production"]),
      NEXTAUTH_SECRET:
         process.env.NODE_ENV === "production"
            ? z.string().min(1)
            : z.string().min(1).optional(),
      NEXTAUTH_URL: z.string().url(),
      GOOGLE_CLIENT_ID: z.string(),
      GOOGLE_CLIENT_SECRET: z.string(),
      GITHUB_CLIENT_ID: z.string(),
      GITHUB_CLIENT_SECRET: z.string(),
      SPOTIFY_CLIENT_ID: z.string(),
      SPOTIFY_CLIENT_SECRET: z.string(),
      SPOTIFY_REFRESH_TOKEN: z.optional(z.string()),
      DISCORD_CLIENT_ID: z.string(),
      DISCORD_CLIENT_SECRET: z.string(),
      DISCORD_WEBHOOK_URL: z.string(),
   },
   client: {
      NEXT_PUBLIC_APP_URL: z.string().url(),
   },
   runtimeEnv: {
      DATABASE_URL: process.env.DATABASE_URL,
      NODE_ENV: process.env.NODE_ENV,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
      GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
      GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
      DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
      DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
      SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
      SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
      SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
      DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL,
   },
   skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
