"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client";
import { ThemeProvider } from "next-themes";
import superjson from "superjson";

import { env } from "~/env.mjs";
import { api } from "~/lib/api";

const getBaseUrl = () => {
   if (typeof window !== "undefined") return "";
   if (env.VERCEL_URL) return env.VERCEL_URL;

   return `http://localhost:${env.PORT}`;
};

const Providers: React.FC<{
   children: React.ReactNode;
   headers?: Headers;
}> = (props) => {
   const [queryClient] = useState(
      () =>
         new QueryClient({
            defaultOptions: {
               queries: {
                  staleTime: 5 * 1000,
               },
            },
         }),
   );

   const [trpcClient] = useState(() =>
      api.createClient({
         transformer: superjson,
         links: [
            loggerLink({
               enabled: (opts) =>
                  process.env.NODE_ENV === "development" ||
                  (opts.direction === "down" && opts.result instanceof Error),
            }),
            unstable_httpBatchStreamLink({
               url: `${getBaseUrl()}/api/trpc`,
               headers() {
                  const headers = new Map(props.headers);
                  headers.set("x-trpc-source", "nextjs-react");
                  return Object.fromEntries(headers);
               },
            }),
         ],
      }),
   );

   return (
      <ThemeProvider attribute="class">
         <api.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
               <ReactQueryStreamedHydration transformer={superjson}>
                  {props.children}
               </ReactQueryStreamedHydration>
               <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
         </api.Provider>
      </ThemeProvider>
   );
};

export default Providers;
