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
               props.featured ? "relative mt-10 hidden sm:block" : "hidden"
            } mx-3 mb-2`}
         >
            <h1 className="absolute -left-0.5 -top-8 z-10 rounded-t border border-blue-200/60 bg-blue-50/80 px-4 py-1 text-sm font-medium text-blue-700 dark:border-blue-800/40 dark:bg-blue-950/30 dark:text-blue-300">
               Featured Post
            </h1>
            <div className="flex cursor-pointer items-stretch overflow-hidden rounded-xl border border-border/80 bg-card/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:shadow-md">
               <Image
                  alt={props.title}
                  className="w-[45%] flex-shrink-0 object-cover"
                  src={getPostImage(props)}
                  blurDataURL={shimmer(1920, 1080)}
                  placeholder="blur"
                  height={300}
                  width={500}
               />
               <div className="flex-1 px-5 py-4">
                  <div className="flex flex-wrap">
                     {props.tags.map((tag, index) => (
                        <Tags tag={tag} key={index} />
                     ))}
                  </div>
                  <h1 className="text-section mb-1 mt-1 text-xl font-semibold md:text-2xl">
                     {props.title}
                  </h1>
                  <p className="text-muted-foreground">
                     {props.summary}
                  </p>
                  <h1 className="mt-0.5 text-sm text-muted-foreground">
                     {postMeta}
                  </h1>
               </div>
            </div>
         </div>
         {/* Mobile / regular card layout */}
         <div
            className={`${
               props.featured ? "sm:hidden" : ""
            } group overflow-hidden rounded-xl border border-border/80 bg-card/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:shadow-md`}
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
            <div className="border-t border-border/80 px-4 py-3">
               <h2 className="line-clamp-2 h-14 text-lg font-semibold leading-snug tracking-normal sm:text-xl">
                  {props.title}
               </h2>
               <p className="mb-3 mt-2 line-clamp-3 text-sm text-muted-foreground">
                  {props.summary}
               </p>
               {props.tags.map((tag, index) => (
                  <Tags tag={tag} key={index} />
               ))}
               <div className="mb-1 mr-1 mt-1 flex items-center">
                  <span className="text-xs text-muted-foreground">
                     {postMeta}
                  </span>
               </div>
            </div>
         </div>
      </Link>
   );
};

export default PostCard;
