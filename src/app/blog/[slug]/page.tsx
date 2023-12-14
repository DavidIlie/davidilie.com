import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allBlogs } from "contentlayer/generated";
import Balancer from "react-wrap-balancer";

import { Tags } from "~/components/tag";
import { Mdx } from "./mdx";
import ViewCounter from "./view-counter";

export function generateStaticParams() {
   return allBlogs.map((post) => ({
      slug: post.slug,
   }));
}

export function generateMetadata({
   params,
}: {
   params: { slug: string };
}): Metadata {
   const post = allBlogs.find((post) => post.slug === params.slug);
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

const Page = ({ params }: { params: { slug: string } }) => {
   const post = allBlogs.find((post) => post.slug === params.slug);

   if (!post) return notFound();

   return (
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
            <h1 className="font-mono text-sm tracking-tighter text-neutral-500 dark:text-neutral-300">
               <ViewCounter trackView />
            </h1>
         </div>
         <Mdx code={post.body.code} />
         <div className="my-4" />
      </section>
   );
};

export default Page;
