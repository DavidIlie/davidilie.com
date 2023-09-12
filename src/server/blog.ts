import { allBlogs } from "contentlayer/generated";

import { prisma } from "./db";

export const insertPostInDbIfNotExist = async (slug: string) => {
   if (allBlogs.filter((s) => s.slug === slug).length === 0)
      throw new Error(`not valid slug ${slug}`);

   const get = await prisma.post.findFirst({ where: { slug } });
   if (get) return;

   await prisma.post.create({ data: { slug } });
   return;
};
