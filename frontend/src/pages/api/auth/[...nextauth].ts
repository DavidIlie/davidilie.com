import NextAuth, { User } from "next-auth";
import Providers from "next-auth/providers";

import db from "@lib/mongo";
const users = db.get("users");

import Adapters from "next-auth/adapters";
import Models from "../../../models";

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
    adapter: Adapters.TypeORM.Adapter(process.env.MONGO_URI, {
        models: {
            //@ts-ignore
            User: Models.User,
        },
    }),
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
        async session(session, token: User) {
            if (session?.user) {
                try {
                    const findUser = await users.findOne({ _id: token.sub });

                    token.isAdmin = findUser.isAdmin;
                    token.isBanned = findUser.isBanned;
                } catch (e) {
                    console.error(e);
                }
                session.user = { ...session.user, ...token };
            }

            return session;
        },
    },
});
