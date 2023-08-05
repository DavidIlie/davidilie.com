import { NextResponse } from "next/server";

import { prisma } from "~/server/db";

export const GET = async () => {
   const posts = await prisma.post.findMany();
   return NextResponse.json(posts);
};

export const dynamic = "force-dynamic";
