import { NextRequest } from "next/server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter, createTRPCContext } from "~/server";

function setCorsHeaders(res: Response) {
   res.headers.set("Access-Control-Allow-Origin", "*");
   res.headers.set("Access-Control-Request-Method", "*");
   res.headers.set("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
   res.headers.set("Access-Control-Allow-Headers", "*");
}

export function OPTIONS() {
   const response = new Response(null, {
      status: 204,
   });
   setCorsHeaders(response);
   return response;
}

const handler = async (req: NextRequest) => {
   const response = await fetchRequestHandler({
      endpoint: "/api/trpc",
      router: appRouter,
      req,
      createContext: () => createTRPCContext(),
      onError({ error, path }) {
         console.error(`>>> tRPC Error on '${path}'`, error);
      },
   });
   setCorsHeaders(response);
   return response;
};

export { handler as GET, handler as POST };
