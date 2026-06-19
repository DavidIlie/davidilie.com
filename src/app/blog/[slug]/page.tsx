import React, { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogs } from "#velite";

import { buildMetadata } from "~/lib/metadata";

import { Tags } from "~/components/tag";
import { api, HydrateClient } from "~/trpc/server";
import { Mdx } from "./mdx";
import ViewCounter from "./view-counter";

export function generateStaticParams() {
   return blogs.map((post) => ({
      slug: post.slug,
   }));
}

export async function generateMetadata({
   params,
}: {
   params: Promise<{ slug: string }>;
}): Promise<Metadata> {
   const awaitedParams = await params;

   const post = blogs.find((post) => post.slug === awaitedParams.slug);
   if (!post) {
      return { title: "not found" };
   }

   return buildMetadata({
      title: post.title,
      description: post.summary,
      path: `/blog/${post.slug}`,
      image: post.image,
      type: "article",
      publishedTime: post.publishedAt,
   });
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
   const awaitedParams = await params;
   const post = blogs.find((post) => post.slug === awaitedParams.slug);

   if (!post) return notFound();

   void api.blog.get.prefetch({ slug: awaitedParams.slug });
   void api.spotify.playingStateAndSong.prefetch();

   return (
      <HydrateClient>
         <section>
            <div className="flex flex-wrap">
               {post.tags.map((tag, index) => (
                  <Tags tag={tag} key={index} />
               ))}
            </div>
            <h1 className="mt-2 font-display text-3xl leading-[1.1] font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
               {post.title}
            </h1>
            <div className="mt-4 mb-8 flex items-center gap-3 text-sm text-muted-foreground">
               <time
                  dateTime={post.publishedAt}
                  className="font-mono tracking-tighter tabular-nums"
               >
                  {post.publishedAt}
               </time>
               <span aria-hidden className="size-1 rounded-full bg-border" />
               <Suspense
                  fallback={
                     <span className="font-mono text-sm tracking-tighter text-muted-foreground">
                        ···
                     </span>
                  }
               >
                  <ViewCounter trackView />
               </Suspense>
            </div>
            <Mdx code={post.body} />
            <div className="my-4" />
         </section>
      </HydrateClient>
   );
};

export default Page;
