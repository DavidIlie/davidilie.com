import React, { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogs } from "#velite";
import Balancer from "react-wrap-balancer";

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

   const {
      title,
      publishedAt: publishedTime,
      summary: description,
      image,
      slug,
   } = post;

   const ogImage = image
      ? `https://davidilie.com${image}`
      : `https://davidilie.com/og?title=${title}`;

   return {
      title,
      description,
      openGraph: {
         title,
         description,
         type: "article",
         publishedTime,
         url: `https://davidilie.com/blog/${slug}`,
         images: [
            {
               url: ogImage,
            },
         ],
      },
      twitter: {
         card: "summary_large_image",
         title,
         description,
         images: [ogImage],
      },
   };
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
            {post.tags.map((tag, index) => (
               <Tags tag={tag} key={index} />
            ))}
            <h1 className="gradient-text mt-1 text-3xl font-bold ">
               <Balancer>{post.title}</Balancer>
            </h1>
            <div className="mb-6 mt-2 grid grid-cols-[auto_1fr_auto] items-center font-mono text-sm">
               <div className="rounded-md bg-neutral-100 px-2 py-1 tracking-tighter dark:bg-gray-800">
                  {post.publishedAt}
               </div>
               <div className="mx-2 h-[0.2em] bg-neutral-100 dark:bg-gray-700" />
               <Suspense
                  fallback={
                     <div className="font-mono text-sm tracking-tighter text-neutral-500 dark:text-neutral-300">
                        ...
                     </div>
                  }
               >
                  <h1 className="font-mono text-sm tracking-tighter text-neutral-500 dark:text-neutral-300">
                     <ViewCounter trackView />
                  </h1>
               </Suspense>
            </div>
            <Mdx code={post.body} />
            <div className="my-4" />
         </section>
      </HydrateClient>
   );
};

export default Page;
