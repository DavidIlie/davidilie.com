declare namespace NodeJS {
    interface ProcessEnv {
        MONGO_URI: string;
        JWT_SECRET: string;
        ADMIN_PASSWORD: string;
        PORT: number;
    }
}
