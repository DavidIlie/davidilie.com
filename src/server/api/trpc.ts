import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { prisma } from "../db";

interface CreateContextOptions {}

const createInnerTRPCContext = (opts: CreateContextOptions) => {
   return {
      prisma: prisma,
   };
};

export const createTRPCContext = async () => {
   return createInnerTRPCContext({});
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
