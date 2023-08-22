import { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";

import { env } from "~/env.mjs";

export const GET = async (req: NextRequest) => {
   const { searchParams } = req.nextUrl;
   const postTitle = searchParams.get("title");

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
      },
   );
};
