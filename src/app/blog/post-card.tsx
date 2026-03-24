import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Blog } from "#velite";
import { formatDistance } from "date-fns";

import { shimmer } from "~/lib/shimmer";

import { Tags } from "~/components/tag";
import { insertPostInDbIfNotExist } from "~/server/blog";
import { prisma } from "~/server/db";

type Type = Blog & { featured?: boolean };

const getPostImage = (props: Type) =>
   props.image ?? `/og?title=${encodeURIComponent(props.title)}`;

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
         {/* Desktop featured layout */}
         <div
            className={`${
               props.featured ? "relative mt-14 hidden sm:flex" : "hidden"
            } mx-3 mb-4 transform cursor-pointer flex-row justify-center gap-4 rounded-xl border border-gray-200/80 bg-white/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md dark:border-gray-700/50 dark:bg-gray-800/40 dark:hover:border-gray-600 md:px-3 md:py-2`}
         >
            <h1 className="absolute -left-0.5 -top-9 z-10 rounded-t border border-blue-200/60 bg-blue-50/80 px-4 py-1 text-sm font-medium text-blue-700 dark:border-blue-800/40 dark:bg-blue-950/30 dark:text-blue-300">
               Featured Post
            </h1>
            <div className="flex items-center gap-4">
               <Image
                  alt={props.title}
                  className="max-w-[50%] flex-shrink-0 rounded-lg object-cover"
                  src={getPostImage(props)}
                  blurDataURL={shimmer(1920, 1080)}
                  placeholder="blur"
                  height={180}
                  width={400}
               />
               <div className="flex-1 px-2 py-1 md:px-0">
                  {props.tags.map((tag, index) => (
                     <Tags tag={tag} key={index} />
                  ))}
                  <h1 className="text-section mb-1 mt-1 text-xl font-semibold md:text-2xl">
                     {props.title}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                     {props.summary}
                  </p>
                  <h1 className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                     {postMeta}
                  </h1>
               </div>
            </div>
         </div>
         {/* Mobile / regular card layout */}
         <div
            className={`${
               props.featured ? "sm:hidden" : ""
            } group overflow-hidden rounded-xl border border-gray-200/80 bg-white/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md dark:border-gray-700/50 dark:bg-gray-800/40 dark:hover:border-gray-600`}
         >
            <Image
               src={getPostImage(props)}
               alt={props.title}
               width={500}
               height={300}
               blurDataURL={shimmer(1920, 1080)}
               placeholder="blur"
               className="w-full rounded-t-xl object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <div className="border-t border-gray-200/80 px-4 py-3 dark:border-gray-700/50">
               <h2 className="line-clamp-2 h-14 text-lg font-semibold leading-snug tracking-normal sm:text-xl">
                  {props.title}
               </h2>
               <p className="mb-3 mt-2 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
                  {props.summary}
               </p>
               {props.tags.map((tag, index) => (
                  <Tags tag={tag} key={index} />
               ))}
               <div className="mb-1 mr-1 mt-1 flex items-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                     {postMeta}
                  </span>
               </div>
            </div>
         </div>
      </Link>
   );
};

export default PostCard;
