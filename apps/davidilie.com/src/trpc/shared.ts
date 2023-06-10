import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import superjson from "superjson";
import { type AppRouter } from "~/server/api/root";

export const transformer = superjson;

function getBaseUrl() {
   if (typeof window !== "undefined") return "";
   const vc = process.env.NEXT_PUBLIC_APP_URL;
   if (vc) return vc;
   return "http://localhost:3000";
}

export function getUrl() {
   return getBaseUrl() + "/api/trpc";
}

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
