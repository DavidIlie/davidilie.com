// API stuff
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "./api/root";
import { appRouter } from "./api/root";
import { createCallerFactory } from "./api/trpc";

export { appRouter, type AppRouter } from "./api/root";
export { createTRPCContext } from "./api/trpc";

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export const createCaller = createCallerFactory(appRouter);
