import "server-only";

import React, { cache } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { TRPCQueryOptions } from "@trpc/tanstack-react-query";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";

import { appRouter, createCaller, type AppRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import { createQueryClient } from "./query-client";

const createContext = cache(async () => {
   const heads = new Headers();
   heads.set("x-trpc-source", "rsc");

   return createTRPCContext({
      headers: heads,
   });
});

const getQueryClient = cache(createQueryClient);

export const trpc = createTRPCOptionsProxy<AppRouter>({
   router: appRouter,
   ctx: createContext,
   queryClient: getQueryClient,
});

export const caller = createCaller(createContext);

export const HydrateClient: React.FC<{ children: React.ReactNode }> = (
   props,
) => {
   const queryClient = getQueryClient();
   return (
      <HydrationBoundary state={dehydrate(queryClient)}>
         {props.children}
      </HydrationBoundary>
   );
};

export const prefetch = <T extends ReturnType<TRPCQueryOptions<any>>>(
   queryOptions: T,
) => {
   const queryClient = getQueryClient();
   if (queryOptions.queryKey[1]?.type === "infinite") {
      return queryClient.prefetchInfiniteQuery(queryOptions as any);
   } else {
      return queryClient.prefetchQuery(queryOptions);
   }
};
