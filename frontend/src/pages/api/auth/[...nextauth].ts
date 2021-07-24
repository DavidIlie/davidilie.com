import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorizationUrl:
                "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
        }),
        Providers.Discord({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_SECRET,
            scope: "identify",
        }),
    ],
    database: process.env.MONGO_URI,
    secret: process.env.JWT_CODE,
    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60,
    },
    jwt: {
        signingKey: process.env.JWT_CODE,
    },
    callbacks: {
        redirect: async (url, baseUrl) => {
            return Promise.resolve(url);
        },
    },
});
