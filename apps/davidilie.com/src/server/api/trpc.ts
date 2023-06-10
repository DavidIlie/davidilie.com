import { experimental_createServerActionHandler } from "@trpc/next/app-dir/server";
import { initTRPC, TRPCError } from "@trpc/server";
import { type FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { headers } from "next/headers";
import superjson from "superjson";
import { ZodError } from "zod";
import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db";

type CreateContextOptions = {
   headers: Headers;
};

export const createInnerTRPCContext = async (opts: CreateContextOptions) => {
   const session = await getServerAuthSession();

   return {
      session,
      headers: opts.headers,
      prisma,
   };
};

export const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
   return await createInnerTRPCContext({
      headers: opts.req.headers,
   });
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

export const createAction = experimental_createServerActionHandler(t, {
   async createContext() {
      const ctx = await createInnerTRPCContext({
         headers: headers(),
      });
      return ctx;
   },
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
   if (!ctx.session || !ctx.session.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
   }
   return next({
      ctx: {
         session: { ...ctx.session, user: ctx.session.user },
      },
   });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
