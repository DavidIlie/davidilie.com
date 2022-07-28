import { TRPCError } from "@trpc/server";
import { createRouter } from "./context";
import { z } from "zod";

import { doesPostExist, getAllFilesFrontMatter } from "@/lib/mdx";
import { generateRssFeed } from "@/lib/generateRssFeed";

export const blogRouter = createRouter()
   .query("getStats", {
      input: z.object({
         slug: z.string(),
      }),
      async resolve({ ctx, input }) {
         let post = await ctx.prisma.post.findFirst({
            where: { slug: input.slug },
            include: {
               _count: {
                  select: {
                     comments: true,
                  },
               },
            },
         });
         if (!post) {
            const slugExists = await doesPostExist(input.slug);

            if (!slugExists)
               return {
                  views: 0,
                  comments: 0,
               };

            post = await ctx.prisma.post.create({
               data: { slug: input.slug },
               include: {
                  _count: {
                     select: {
                        comments: true,
                     },
                  },
               },
            });

            return {
               views: post.views,
               comments: post._count.comments,
            };
         }
         return {
            views: post.views,
            comments: post._count.comments,
         };
      },
   })
   .query("getComments", {
      input: z.object({
         slug: z.string(),
      }),
      async resolve({ ctx, input }) {
         return ctx.prisma.comment.findMany({
            where: { postSlug: input.slug },
            include: { user: true },
         });
      },
   })
   .mutation("addViews", {
      input: z.object({
         slug: z.string(),
      }),
      async resolve({ ctx, input }) {
         const newOrUpdatedValue = await ctx.prisma.post.upsert({
            where: { slug: input.slug },
            create: { slug: input.slug },
            update: { views: { increment: 1 } },
         });
         return {
            total: newOrUpdatedValue.views,
         };
      },
   })
   .middleware(async ({ ctx, next }) => {
      if (!ctx.session) {
         throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      return next();
   })
   .mutation("createComment", {
      input: z.object({
         slug: z.string(),
         comment: z.string().max(1000),
      }),
      async resolve({ ctx, input }) {
         const post = await ctx.prisma.post.findFirst({
            where: { slug: input.slug },
         });
         if (!post) return new TRPCError({ code: "NOT_FOUND" });

         const comment = await ctx.prisma.comment.findFirst({
            where: { comment: input.comment },
         });
         if (comment)
            return new TRPCError({
               code: "CONFLICT",
               message:
                  "To prevent overpopulating my database, please differentiate your comment.",
            });

         await ctx.prisma.comment.create({
            data: {
               postSlug: post.slug,
               comment: input.comment,
               userId: ctx.session!.user!.id,
            },
         });
         return;
      },
   })
   .mutation("deleteComment", {
      input: z.object({
         id: z.string().uuid(),
      }),
      async resolve({ ctx, input }) {
         const comment = await ctx.prisma.comment.findFirst({
            where: { id: input.id },
         });
         if (!comment) return new TRPCError({ code: "NOT_FOUND" });
         if (
            ctx.session!.user!.id !== comment.userId &&
            !ctx.session!.user!.isAdmin
         )
            return new TRPCError({ code: "FORBIDDEN" });
         await ctx.prisma.comment.delete({ where: { id: comment.id } });
         return;
      },
   });
