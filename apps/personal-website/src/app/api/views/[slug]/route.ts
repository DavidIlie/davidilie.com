import { NextRequest, NextResponse } from "next/server";

import { prisma } from "~/server/db";
import { insertPostInDbIfNotExist } from "~/server/lib/insertPostInDbIfNotExist";

export const GET = async (
   _req: NextRequest,
   { params }: { params: { slug: string } },
) => {
   if (!params.slug)
      return NextResponse.json({ message: "no slug" }, { status: 404 });

   await insertPostInDbIfNotExist(params.slug);

   const post = await prisma.post.findFirst({
      where: { slug: params.slug },
      select: { views: true },
   });

   if (!post) throw new Error("this is impossible");

   return NextResponse.json({ total: post.views });
};

export const POST = async (
   _req: NextRequest,
   { params }: { params: { slug: string } },
) => {
   if (!params.slug)
      return NextResponse.json({ message: "no slug" }, { status: 404 });

   await insertPostInDbIfNotExist(params.slug);

   const post = await prisma.post.findFirst({
      where: { slug: params.slug },
   });

   if (!post) throw new Error("this is impossible");

   await prisma.post.update({
      where: { slug: post.slug },
      data: { views: post.views + 1 },
   });

   return NextResponse.json({ total: post.views + 1 });
};
