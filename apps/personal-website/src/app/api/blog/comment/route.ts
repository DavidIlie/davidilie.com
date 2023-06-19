import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";
import { z } from "zod";

import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db";

import { commentSchema } from "~/schema";

export const POST = async (req: NextRequest) => {
   try {
      const session = await getServerAuthSession();

      if (!session?.user) {
         return new Response("Unauthorized", { status: 401 });
      }

      const body = await req.json();
      const { slug, comment } = commentSchema.parse(body);

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

      revalidatePath(`/blog/${slug}`);

      return new Response("OK");
   } catch (error) {
      if (error instanceof z.ZodError) {
         return new Response(error.message, { status: 400 });
      }
      return new Response("Could not post this comment", { status: 500 });
   }
};
