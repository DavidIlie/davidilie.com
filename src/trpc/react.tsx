"use client";

import { useState } from "react";
import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import {
   createTRPCClient,
   httpBatchStreamLink,
   loggerLink,
} from "@trpc/client";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import SuperJSON from "superjson";

import { type AppRouter } from "~/server/api/root";
import { createQueryClient } from "./query-client";

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
   if (typeof window === "undefined") {
      return createQueryClient();
   }
   return (clientQueryClientSingleton ??= createQueryClient());
};

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();

export type RouterInputs = inferRouterInputs<AppRouter>;

export type RouterOutputs = inferRouterOutputs<AppRouter>;

const getBaseUrl = () => {
   if (typeof window !== "undefined") return "";
   return `http://localhost:${process.env.PORT ?? 3000}`;
};

export function TRPCReactProvider(props: { children: React.ReactNode }) {
   const queryClient = getQueryClient();

   const [trpcClient] = useState(() =>
      createTRPCClient<AppRouter>({
         links: [
            loggerLink({
               enabled: (op) =>
                  process.env.NODE_ENV === "development" ||
                  (op.direction === "down" && op.result instanceof Error),
            }),
            httpBatchStreamLink({
               transformer: SuperJSON,
               url: getBaseUrl() + "/api/trpc",
               maxItems: 20,
               headers: () => {
                  const headers = new Headers();
                  headers.set("x-trpc-source", "nextjs-react");
                  return headers;
               },
            }),
         ],
      }),
   );

   return (
      <QueryClientProvider client={queryClient}>
         <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
            {props.children}
         </TRPCProvider>
      </QueryClientProvider>
   );
}
