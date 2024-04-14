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

const createQueryClient = () => new QueryClient();

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
   if (typeof window === "undefined") {
      return createQueryClient();
   } else {
      return (clientQueryClientSingleton ??= createQueryClient());
   }
};

const Providers: React.FC<{
   children: React.ReactNode;
   headers?: Headers;
}> = (props) => {
   const queryClient = getQueryClient();

   const [trpcClient] = useState(() =>
      api.createClient({
         transformer: superjson,
         links: [
            loggerLink({
               enabled: (op) =>
                  process.env.NODE_ENV === "development" ||
                  (op.direction === "down" && op.result instanceof Error),
            }),
            unstable_httpBatchStreamLink({
               url: getBaseUrl() + "/api/trpc",
               async headers() {
                  const headers = new Headers();
                  headers.set("x-trpc-source", "nextjs-react");
                  return headers;
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
