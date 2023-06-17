import { prisma } from "~/server/db";

export const GET = async () => {
   const posts = await prisma.post.findMany();
   return new Response(JSON.stringify(posts));
};
