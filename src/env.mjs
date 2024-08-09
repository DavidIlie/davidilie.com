import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
   server: {
      DATABASE_URL: z.string().url(),
      NODE_ENV: z.enum(["development", "test", "production"]),
      SPOTIFY_CLIENT_ID: z.string(),
      SPOTIFY_CLIENT_SECRET: z.string(),
      SPOTIFY_REFRESH_TOKEN: z.optional(z.string()),
      GITHUB_JOB_SECRET: z.string(),
      GITHUB_JOB_USERNAME: z.string(),
      GITHUB_JOB_API_KEY: z.string(),
      STATISTICS_JOB_SECRET: z.string(),
      STATISTICS_JOB_CHANNEL: z.string(),
      STATISTICS_JOB_API_KEY: z.string(),
   },
   client: {
      NEXT_PUBLIC_APP_URL: z.string().url(),
   },
   experimental__runtimeEnv: {
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
   },
   skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
