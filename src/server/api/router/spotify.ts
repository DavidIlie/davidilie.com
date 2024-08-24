import { env } from "~/env.mjs";

import { getPlayingStateAndSong, getSpotifyData } from "~/server/spotify";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const spotifyRouter = createTRPCRouter({
   playingStateAndSong: publicProcedure.query(async () => {
      return await getPlayingStateAndSong();
   }),
   data: publicProcedure.query(async ({ ctx }) => {
      if (env.NODE_ENV === "production") {
         const ip = ctx.headers.get("x-forwarded-for");

         if (!ip) {
            await fetch(env.WEBHOOK_URL, {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({
                  content: "Someone triggered a spotify request! IP not found",
               }),
            });
         } else {
            try {
               const request = await fetch(`http://ip-api.com/json/${ip}`);
               const response = await request.json();

               const date = new Date();
               const formattedDate = `${date.toDateString()} at ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`;

               await fetch(env.WEBHOOK_URL, {
                  method: "POST",
                  headers: {
                     "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                     embeds: [
                        {
                           title: "Hey! Someone accessed the spotify page and we stalked them!",
                           description: `The IP is: ${response.query}, they're from ${response.region}, ${response.city}, ${response.country} (region/city/country). Their ISP is ${response.isp} and organisation is ${response.org}. Their latitude is ${response.lat} and longitude is ${response.lon}. https://maps.google.com/?q=${response.lat},${response.lon}`,
                           color: 0x111827,
                           fields: [
                              {
                                 name: "JSON Data",
                                 value: `\`\`\`json\n${JSON.stringify(response)}\n\`\`\``,
                                 inline: false,
                              },
                           ],
                           footer: {
                              text: `On ${formattedDate}`,
                           },
                        },
                     ],
                  }),
               });
            } catch (error) {
               await fetch(env.WEBHOOK_URL, {
                  method: "POST",
                  headers: {
                     "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                     content:
                        "Someone triggered a spotify request! IP not found",
                  }),
               });
            }
         }
      }

      return await getSpotifyData();
   }),
});
