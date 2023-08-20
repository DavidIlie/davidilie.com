// API stuff
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "./api/root";

export { appRouter, type AppRouter } from "./api/root";
export { createTRPCContext } from "./api/trpc";

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
