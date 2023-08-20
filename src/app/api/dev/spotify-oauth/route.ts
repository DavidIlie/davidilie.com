import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

import { env } from "~/env.mjs";

import { genSpotifyAuthHeaders } from "~/server/spotify";

export const GET = async (req: NextRequest) => {
   if (process.env.NODE_ENV !== "development")
      return new Response(JSON.stringify({ message: "no can do" }), {
         status: 403,
      });

   const code = req.nextUrl.searchParams.get("code");

   if (!code)
      return redirect(
         `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&scope=user-read-playback-position%20user-library-read%20user-top-read%20user-read-recently-played%20user-read-playback-state%20user-read-currently-playing&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fdev%2Fspotify-oauth`,
      );

   const r = await fetch(`https://accounts.spotify.com/api/token`, {
      method: "POST",
      headers: {
         Authorization: `Basic ${genSpotifyAuthHeaders}`,
         "Content-Type": `application/x-www-form-urlencoded`,
         Accept: "application/json",
      },
      body: new URLSearchParams({
         grant_type: "authorization_code",
         code: code,
         redirect_uri: "http://localhost:3000/api/dev/spotify-oauth",
         client_id: env.SPOTIFY_CLIENT_ID,
         secret_id: env.SPOTIFY_CLIENT_SECRET,
      }),
   });

   return new Response(JSON.stringify(await r.json()), { status: r.status });
};
