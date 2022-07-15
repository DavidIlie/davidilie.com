declare global {
   namespace NodeJS {
      interface ProcessEnv {
         DATABASE_URL: string;
         NEXTAUTH_SECRET: string;
         NEXTAUTH_URL: string;
         GITHUB_ID: string;
         GITHUB_SECRET: string;
         GOOGLE_ID: string;
         GOOGLE_SECRET: string;
         NEXT_PUBLIC_APP_URL: string;
         SPOTIFY_CLIENT_ID: string;
         SPOTIFY_SECRET_ID: string;
         SPOTIFY_REFRESH_TOKEN: string;
         GITHUB_JOB_SECRET: string;
         GITHUB_JOB_USERNAME: string;
         STATISTICS_JOB_SECRET: string;
         STATISTICS_JOB_CHANNEL: string;
         STATISTICS_JOB_API_KEY: string;
         DISCORD_ID: string;
         DISCORD_SECRET: string;
      }
   }
}

export {};
