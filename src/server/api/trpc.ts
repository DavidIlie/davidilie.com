import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { prisma } from "../db";

interface CreateContextOptions {
   headers: Headers;
}

const createInnerTRPCContext = (opts: CreateContextOptions) => {
   return {
      prisma: prisma,
      ...opts,
   };
};

export const createTRPCContext = async (headers: Headers) => {
   return createInnerTRPCContext({ headers });
};

const t = initTRPC.context<typeof createTRPCContext>().create({
   transformer: superjson,
   errorFormatter({ shape, error }) {
      return {
         ...shape,
         data: {
            ...shape.data,
            zodError:
               error.cause instanceof ZodError ? error.cause.flatten() : null,
         },
      };
   },
});

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;
