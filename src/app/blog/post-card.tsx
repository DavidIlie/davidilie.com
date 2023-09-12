import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Blog } from "contentlayer/generated";
import { formatDistance } from "date-fns";

import { shimmer } from "~/lib/shimmer";

import { Tags } from "~/components/tag";
import { insertPostInDbIfNotExist } from "~/server/blog";
import { prisma } from "~/server/db";

type Type = Blog & { featured?: boolean };

const PostCard = async (props: Type) => {
   await insertPostInDbIfNotExist(props.slug);

   const post = (await prisma.post.findFirst({
      where: { slug: props.slug },
      select: { views: true },
   })) as { views: number };

   const postMeta = `${formatDistance(new Date(props.publishedAt), new Date(), {
      addSuffix: true,
   })}, ${post.views} view${post.views !== 1 ? "s" : ""}`;

   return (
      <Link href={`/blog/${props.slug}`}>
         <div
            className={`hidden ${
               props.featured && "mt-14 hidden rounded-tl-sm sm:block"
            } hoverItem mx-3 mb-4 flex transform cursor-pointer flex-row justify-center gap-4 rounded-xl border-2 border-gray-200 bg-gray-100 duration-150 dark:border-gray-700 dark:bg-gray-800 md:px-3 md:py-2`}
         >
            <h1 className="absolute -left-0.5 -top-9 z-10 rounded-t border-2 border-blue-200 bg-blue-300 px-4 py-1 font-semibold text-blue-900 dark:border-blue-700 dark:bg-blue-600 dark:bg-opacity-50 dark:text-blue-100">
               Featured Post
            </h1>
            <div className="flex gap-2">
               <Image
                  alt={props.title}
                  className="rounded object-cover shadow-xl"
                  src={(props.structuredData as any).image}
                  blurDataURL={shimmer(1920, 1080)}
                  placeholder="blur"
                  height={180}
                  width={400}
               />
               <div className="px-2 py-1 md:max-w-sm md:px-0">
                  {props.tags.map((tag, index) => (
                     <Tags tag={tag} key={index} />
                  ))}
                  <h1 className="text-section mb-1 mt-1 text-xl font-semibold md:text-2xl">
                     {props.title}
                  </h1>
                  <p className="text-gray-800 dark:text-gray-300">
                     {props.summary}
                  </p>
                  <h1 className="mt-0.5 text-sm text-gray-800 dark:text-gray-400">
                     {postMeta}
                  </h1>
               </div>
            </div>
         </div>
         <div
            className={`${
               props.featured && "sm:hidden"
            } hoverItem mb-3 rounded-lg border-2 border-gray-200 bg-gray-100 shadow-2xl duration-200 dark:border-gray-700 dark:bg-gray-800`}
         >
            <Image
               src={(props.structuredData as any).image}
               alt={props.title}
               width={500}
               height={300}
               blurDataURL={shimmer(1920, 1080)}
               placeholder="blur"
               className="rounded-lg rounded-b-none"
            />
            <div className="-mt-0.5 border-t-2 border-gray-700 px-4 py-2">
               <h2 className="line-clamp-2 h-16 text-2xl font-semibold tracking-normal">
                  {props.title}
               </h2>
               <p className="text-md mb-3 mt-2 line-clamp-5 text-gray-800 dark:text-gray-200">
                  {props.summary}
               </p>
               {props.tags.map((tag, index) => (
                  <Tags tag={tag} key={index} />
               ))}
               <div className="mb-1 mr-1 mt-1 flex items-center">
                  <span className="text-sm text-gray-800 dark:text-gray-400">
                     {postMeta}
                  </span>
               </div>
            </div>
         </div>
      </Link>
   );
};

export default PostCard;
