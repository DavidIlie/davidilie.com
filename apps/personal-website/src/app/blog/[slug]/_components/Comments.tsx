import { prisma } from "~/server/db";

const Comments = async ({ slug }: { slug: string }) => {
   const comments = await prisma.comment.findMany({
      where: { postSlug: slug },
   });

   return <div />;
};

export default Comments;
