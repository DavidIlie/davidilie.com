import * as z from "zod";

import { insertPostInDbIfNotExist } from "~/server/blog";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const blogRouter = createTRPCRouter({
   get: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ ctx, input }) => {
         await insertPostInDbIfNotExist(input.slug);
         return await ctx.prisma.post.findFirst({
            where: { slug: input.slug },
            select: { views: true },
         });
      }),
   change: publicProcedure
      .input(z.object({ slug: z.string() }))
      .mutation(async ({ ctx, input }) => {
         // DO RATE LIMITING ONE DAY

         await insertPostInDbIfNotExist(input.slug);

         const post = await ctx.prisma.post.findFirst({
            where: { slug: input.slug },
         });

         await ctx.prisma.post.update({
            where: { slug: post!.slug },
            data: { views: post!.views + 1 },
         });

         return post!.views + 1;
      }),
});
