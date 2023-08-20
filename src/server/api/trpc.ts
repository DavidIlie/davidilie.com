import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

interface CreateContextOptions {}

const createInnerTRPCContext = (opts: CreateContextOptions) => {
   return {};
};

export const createTRPCContext = async (opts: { req?: Request }) => {
   const source = opts.req?.headers.get("x-trpc-source") ?? "unknown";
   console.log(">>> tRPC Request from", source);
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

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;
