import { NextRequest } from "next/server";
import { z } from "zod";

import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db";
import { insertPostInDbIfNotExist } from "~/server/lib/insertPostInDbIfNotExist";

import { commentSchema } from "~/schema";

export const POST = async (req: NextRequest) => {
   try {
      const session = await getServerAuthSession();

      if (!session?.user) {
         return new Response("Unauthorized", { status: 401 });
      }

      const body = await req.json();
      const { slug, comment } = commentSchema.parse(body);

      await insertPostInDbIfNotExist(slug);

      const blog = await prisma.post.findFirst({
         where: { slug },
      });

      if (!blog)
         return new Response("Could not find blog post", { status: 404 });

      const commentCheck = await prisma.comment.findFirst({
         where: {
            postSlug: slug,
            comment: comment,
            userId: session.user.id,
         },
      });

      if (commentCheck)
         return new Response("You've already posted something identical!", {
            status: 409,
         });

      await prisma.comment.create({
         data: { userId: session.user.id, comment, postSlug: slug },
      });

      return new Response("OK");
   } catch (error) {
      if (error instanceof z.ZodError) {
         return new Response(error.message, { status: 400 });
      }
      return new Response("Could not post this comment", { status: 500 });
   }
};

export const DELETE = async (req: NextRequest) => {
   const id = req.nextUrl.searchParams.get("id");
   if (!id) return new Response("Cannot find ID", { status: 409 });

   const session = await getServerAuthSession();

   if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
   }

   const comment = await prisma.comment.findFirst({
      where: { id, userId: session.user.id },
   });

   if (!comment) return new Response("Cannot find comment", { status: 404 });

   await prisma.comment.delete({ where: { id } });

   return new Response("OK");
};
