import { createTRPCReact } from "@trpc/react-query";

import { type AppRouter } from "~/server";

export const api = createTRPCReact<AppRouter>();

export { type RouterInputs, type RouterOutputs } from "~/server";
