import { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";

import { env } from "~/env.mjs";

export const GET = async (req: NextRequest) => {
   const { searchParams } = req.nextUrl;
   const postTitle = searchParams.get("title");

   const font = fetch(
      new URL("../../public/fonts/Graphik-Regular.ttf", import.meta.url),
   ).then((res) => res.arrayBuffer());
   const fontData = await font;

   return new ImageResponse(
      (
         <div
            style={{
               height: "100%",
               width: "100%",
               display: "flex",
               flexDirection: "column",
               alignItems: "flex-start",
               justifyContent: "center",
               backgroundImage: `url(${env.NEXT_PUBLIC_APP_URL}/static/og-bg.png)`,
            }}
         >
            <div
               style={{
                  marginTop: -150,
                  marginLeft: 260,
                  marginRight: 260,
                  display: "flex",
                  fontFamily: "Geraphik",
                  fontSize: 100,
                  fontStyle: "normal",
                  color: "white",
                  lineHeight: "120px",
                  whiteSpace: "pre-wrap",
               }}
            >
               {postTitle}
            </div>
         </div>
      ),
      {
         width: 1920,
         height: 1080,
         fonts: [
            {
               name: "Geraphik",
               data: fontData,
               style: "normal",
            },
         ],
      },
   );
};
