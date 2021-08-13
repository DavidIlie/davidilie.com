declare namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_HOST: string;
        MONGO_URI: string;
        GOOGLE_CLIENT_SECRET: string;
        GOOGLE_CLIENT_ID: string;
        DISCORD_SECRET: string;
        DISCORD_CLIENT_ID: string;
        NEXTAUTH_URL: string;
        IDENTITY_SERVER_URL: string;
        JWT_SECRET: string;
    }
}
