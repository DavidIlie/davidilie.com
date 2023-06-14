import React from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDistance } from "date-fns";

import { Tags } from "@david/ui";
import { shimmer } from "~/lib/shimmer";
import type { Blog } from "contentlayer/generated";
import { prisma } from "~/server/db";
import { insertPostInDbIfNotExist } from "~/server/lib/insertPostInDbIfNotExist";

type Type = Blog & { featured?: boolean };

const PostCard = async (props: Type) => {
   await insertPostInDbIfNotExist(props.slug);
   const comments = await prisma.comment.count({
      where: { postSlug: props.slug },
   });
   const post = (await prisma.post.findFirst({
      where: { slug: props.slug },
      select: { views: true },
   })) as { views: number };

   const postMeta = `${formatDistance(new Date(props.publishedAt), new Date(), {
      addSuffix: true,
   })} ${post.views} view${post.views !== 1 ? "s" : ""} • ${comments} comment${
      comments !== 1 ? "s" : ""
   }`;

   return (
      <Link href={`/blog/${props.slug}`}>
         <div
            className={`hidden ${
               props.featured && "mt-14 rounded-tl-sm sm:block hidden"
            } flex flex-row justify-center gap-4 mx-3 mb-4 transform bg-gray-100 border-2 border-gray-200 cursor-pointer dark:bg-gray-800 dark:border-gray-700 rounded-xl md:px-3 md:py-2 hoverItem duration-150`}
         >
            <h1 className="z-10 absolute -top-9 -left-0.5 bg-blue-300 dark:bg-blue-600 text-blue-900 dark:text-blue-100 dark:bg-opacity-50 py-1 px-4 rounded-t font-semibold border-2 border-blue-200 dark:border-blue-700">
               Featured Post
            </h1>
            <div className="flex gap-2">
               <Image
                  alt={props.title}
                  className="object-cover rounded shadow-xl"
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
                  <h1 className="mt-1 mb-1 text-xl font-semibold md:text-2xl text-section">
                     {props.title}
                  </h1>
                  <p className="text-gray-800 dark:text-gray-300">
                     {props.summary}
                  </p>
                  <h1 className="text-gray-800 dark:text-gray-400 mt-0.5 text-sm">
                     {postMeta}
                  </h1>
               </div>
            </div>
         </div>
         <div
            className={`${
               props.featured && "sm:hidden"
            } mb-3 duration-200 bg-gray-100 border-2 border-gray-200 rounded-lg shadow-2xl dark:bg-gray-800 dark:border-gray-700 hoverItem`}
         >
            <div className="md:flex-shrink-0">
               <Image
                  src={(props.structuredData as any).image}
                  alt={props.title}
                  width={500}
                  height={300}
                  blurDataURL={shimmer(1920, 1080)}
                  placeholder="blur"
                  className="object-cover rounded-lg rounded-b-none"
               />
            </div>
            <div className="px-4 py-2 -mt-0.5 border-t-2 border-gray-700">
               <h2 className="h-16 text-2xl font-semibold tracking-normal line-clamp-2">
                  {props.title}
               </h2>
               <p className="mt-2 mb-3 text-gray-800 text-md dark:text-gray-200 line-clamp-5">
                  {props.summary}
               </p>
               {props.tags.map((tag, index) => (
                  <Tags tag={tag} key={index} />
               ))}
               <div className="flex items-center mt-1 mb-1 mr-1">
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
