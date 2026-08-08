import React, { cache, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import type { Blog } from "#velite";
import { formatDistance } from "date-fns";

import { shimmer } from "~/lib/shimmer";

import { Tags } from "~/components/tag";
import { Skeleton } from "~/components/ui/skeleton";
import { insertPostInDbIfNotExist } from "~/server/blog";
import { prisma } from "~/server/db";

type Type = Blog & { featured?: boolean };

const getPostImage = (props: Type) =>
   props.image ?? `/og?title=${encodeURIComponent(props.title)}`;

const FeaturedBadge = () => (
   <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/80 px-2.5 py-1 text-[0.7rem] font-medium tracking-wide text-foreground uppercase shadow-sm backdrop-blur-md">
      <span aria-hidden className="size-1.5 rounded-full bg-brand" />
      Featured
   </span>
);

const cardBase =
   "group relative overflow-hidden rounded-2xl border border-border/70 bg-card/60 transition-[transform,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 hover:border-border hover:shadow-[0_12px_36px_-18px_rgb(0_0_0/0.35)] active:scale-[0.997]";

// Deduped per request: both card layouts render a ViewsMeta for the same slug.
const getPostViews = cache(async (slug: string) => {
   await insertPostInDbIfNotExist(slug);
   const post = await prisma.post.findFirst({
      where: { slug },
      select: { views: true },
   });
   return post?.views ?? 0;
});

// Prisma is unreachable during the Docker build, and the relative date
// reads the current time — both must wait for a real request.
const ViewsMeta = async ({
   slug,
   publishedAt,
   variant,
}: {
   slug: string;
   publishedAt: string;
   variant: "featured" | "regular";
}) => {
   await connection();

   const views = await getPostViews(slug);
   const relativeDate = formatDistance(new Date(publishedAt), new Date(), {
      addSuffix: true,
   });
   const viewsLabel = `${views} view${views !== 1 ? "s" : ""}`;

   if (variant === "featured")
      return (
         <>
            <time dateTime={publishedAt}>{relativeDate}</time>
            <span aria-hidden className="size-1 rounded-full bg-border" />
            <span>{viewsLabel}</span>
         </>
      );

   return (
      <span className="text-xs whitespace-nowrap text-muted-foreground">
         {relativeDate} · {viewsLabel}
      </span>
   );
};

const PostCard = (props: Type) => {
   return (
      <Link href={`/blog/${props.slug}`} aria-label={props.title}>
         {/* Desktop featured layout */}
         <article
            className={`${
               props.featured ? "mt-8 mb-3 hidden sm:flex" : "hidden"
            } ${cardBase} mx-3 items-stretch`}
         >
            <FeaturedBadge />
            <div className="relative w-[44%] flex-shrink-0 overflow-hidden">
               <Image
                  alt={props.title}
                  src={getPostImage(props)}
                  blurDataURL={shimmer(1920, 1080)}
                  placeholder="blur"
                  height={300}
                  width={500}
                  className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03]"
               />
            </div>
            <div className="flex flex-1 flex-col px-6 py-5">
               <div className="flex flex-wrap">
                  {props.tags.map((tag, index) => (
                     <Tags tag={tag} key={index} />
                  ))}
               </div>
               <h2 className="mt-1.5 font-display text-2xl leading-tight font-semibold tracking-tight text-balance md:text-[1.7rem]">
                  {props.title}
               </h2>
               <p className="mt-2 line-clamp-3 text-muted-foreground">
                  {props.summary}
               </p>
               <div className="mt-auto flex items-center gap-2 pt-3 text-xs text-muted-foreground">
                  <Suspense fallback={<Skeleton className="h-3 w-24" />}>
                     <ViewsMeta
                        slug={props.slug}
                        publishedAt={props.publishedAt}
                        variant="featured"
                     />
                  </Suspense>
               </div>
            </div>
         </article>

         {/* Mobile / regular card layout */}
         <article
            className={`${props.featured ? "sm:hidden" : ""} ${cardBase}`}
         >
            {props.featured && <FeaturedBadge />}
            <div className="relative overflow-hidden">
               <Image
                  src={getPostImage(props)}
                  alt={props.title}
                  width={500}
                  height={300}
                  blurDataURL={shimmer(1920, 1080)}
                  placeholder="blur"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03]"
               />
            </div>
            <div className="border-t border-border/70 px-4 py-4">
               <h3 className="line-clamp-2 font-display text-lg leading-snug font-semibold tracking-tight text-balance sm:text-xl">
                  {props.title}
               </h3>
               <p className="mt-1.5 line-clamp-3 text-sm text-muted-foreground">
                  {props.summary}
               </p>
               <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap">
                     {props.tags.map((tag, index) => (
                        <Tags tag={tag} key={index} />
                     ))}
                  </div>
                  <Suspense fallback={<Skeleton className="h-3 w-24" />}>
                     <ViewsMeta
                        slug={props.slug}
                        publishedAt={props.publishedAt}
                        variant="regular"
                     />
                  </Suspense>
               </div>
            </div>
         </article>
      </Link>
   );
};

export default PostCard;
