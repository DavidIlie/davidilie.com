import Image from "next/image";
import { format } from "date-fns";

import { getServerAuthSession } from "~/server/auth";
import { prisma } from "~/server/db";
import { shimmer } from "~/lib/shimmer";

import { Linkify } from "@david/ui";

import CommentDelete from "./CommentDelete";

const Comments = async ({ slug }: { slug: string }) => {
   const session = await getServerAuthSession();

   const comments = await prisma.comment.findMany({
      where: { postSlug: slug },
      include: { user: true },
      orderBy: { createdAt: "desc" },
   });

   return comments.map((comment, index) => (
      <div
         className={`flex gap-4 rounded-md border border-gray-200 bg-gray-50 px-4 py-4 dark:border-gray-700 dark:bg-gray-800 ${
            index !== comments.length - 1 && "mb-4"
         }`}
         key={index}
      >
         <Image
            src={comment.user.image || ""}
            width={50}
            height={50}
            blurDataURL={shimmer(55, 24)}
            placeholder="blur"
            className="rounded-full"
            alt={`${comment.user.name}'s profile image`}
         />
         <div>
            <div className="w-full">
               <Linkify>{comment.comment}</Linkify>
            </div>
            <div className="flex items-center space-x-2">
               <span className="text-sm text-gray-500 duration-150 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-500">
                  {comment.user.name}
               </span>
               <span className="text-gray-800 dark:text-gray-200">/</span>
               <p className="text-sm text-gray-400 dark:text-gray-300">
                  {format(
                     new Date(comment.createdAt),
                     "d MMM yyyy 'at' h:mm bb",
                  )}
               </p>
               {(comment.userId === session?.user?.id ||
                  session?.user?.isAdmin) && <CommentDelete id={comment.id} />}
            </div>
         </div>
      </div>
   ));
};

export default Comments;
