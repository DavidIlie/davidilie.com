"use server";

import { getUrl, transformer } from "./shared";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { experimental_createTRPCNextAppDirServer } from "@trpc/next/app-dir/server";
import { headers } from "next/headers";
import { type AppRouter } from "~/server/api/root";

export const api = experimental_createTRPCNextAppDirServer<AppRouter>({
   config() {
      return {
         transformer,
         links: [
            loggerLink({
               enabled: (op) =>
                  process.env.NODE_ENV === "development" ||
                  (op.direction === "down" && op.result instanceof Error),
            }),
            httpBatchLink({
               url: getUrl(),
               headers() {
                  return {
                     ...Object.fromEntries(headers()),
                     "x-trpc-source": "rsc",
                  };
               },
            }),
         ],
      };
   },
});
