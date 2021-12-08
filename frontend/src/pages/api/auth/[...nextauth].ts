import NextAuth from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/github";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_SECRET,
        }),
    ],
    secret: process.env.JWT_CODE,
});
