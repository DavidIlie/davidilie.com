import { NextApiHandler } from "next";

import { genSpotifyAuthHeaders } from "@/server/lib/spotify";

const handler: NextApiHandler = async (req, res) => {
   if (process.env.NODE_ENV !== "development")
      return res.status(403).json({ message: "can't do that bud" });

   const { code } = req.query;

   if (!code)
      return res.redirect(
         `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&scope=user-read-playback-position%20user-library-read%20user-top-read%20user-read-recently-played%20user-read-playback-state%20user-read-currently-playing&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fdev%2Fspotify-oauth`
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
         code: code as string,
         redirect_uri: "http://localhost:3000/api/dev/spotify-oauth",
         client_id: process.env.SPOTIFY_CLIENT_ID,
         secret_id: process.env.SPOTIFY_SECRET_ID,
      }),
   });

   return res.status(r.status).send(await r.json());
};

export default handler;
