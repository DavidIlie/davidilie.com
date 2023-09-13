"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client";
import PlausibleProvider from "next-plausible";
import { ThemeProvider } from "next-themes";
import superjson from "superjson";

import { env } from "~/env.mjs";
import { api } from "~/lib/api";

const getBaseUrl = () => {
   if (typeof window !== "undefined") return "";
   if (env.NEXT_PUBLIC_APP_URL) return env.NEXT_PUBLIC_APP_URL;
   return `http://localhost:3000`;
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
      <PlausibleProvider
         domain="davidilie.com"
         trackOutboundLinks
         enabled={process.env.NODE_ENV === "production"}
         selfHosted
         customDomain="https://plausible.davidapps.dev"
      >
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
      </PlausibleProvider>
   );
};

export default Providers;
