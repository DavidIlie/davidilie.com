import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allBlogs } from "contentlayer/generated";
import { AiOutlineUser } from "react-icons/ai";
import Balancer from "react-wrap-balancer";

import { getServerAuthSession } from "~/server/auth";
import { insertPostInDbIfNotExist } from "~/server/lib/insertPostInDbIfNotExist";
import { env } from "~/env.mjs";

import { Button, Tags } from "@david/ui";

import { Mdx } from "../_components/mdx";
import Comments from "./_components/Comments";
import ViewCounter from "./_components/ViewCounter";

export function generateStaticParams() {
   return allBlogs.map((post) => ({
      slug: post.slug,
   }));
}

export function generateMetadata({ params }): Metadata {
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
      ? `${env.NEXT_PUBLIC_APP_URL}${image}`
      : `${env.NEXT_PUBLIC_APP_URL}/api/og?title=${title}`;

   return {
      title,
      description,
      openGraph: {
         title,
         description,
         type: "article",
         publishedTime,
         url: `${env.NEXT_PUBLIC_APP_URL}/blog/${slug}`,
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

const Page = async ({ params }: { params: { slug: string } }) => {
   const post = allBlogs.find((post) => post.slug === params.slug);

   if (!post) return notFound();

   await insertPostInDbIfNotExist(params.slug);

   const session = await getServerAuthSession();

   return (
      <section>
         <script type="application/ld+json">
            {JSON.stringify(post.structuredData)}
         </script>
         {post.tags.map((tag, index) => (
            <Tags tag={tag} key={index} />
         ))}
         <h1 className="gradient-text mt-1 max-w-[650px] text-3xl font-bold">
            <Balancer>{post.title}</Balancer>
         </h1>
         <div className="mb-6 mt-2 grid max-w-[650px] grid-cols-[auto_1fr_auto] items-center font-mono text-sm">
            <div className="rounded-md bg-neutral-100 px-2 py-1 tracking-tighter dark:bg-gray-800">
               {post.publishedAt}
            </div>
            <div className="mx-2 h-[0.2em] bg-neutral-100 dark:bg-gray-700" />
            <h1 className="font-mono text-sm tracking-tighter text-neutral-500 dark:text-neutral-300">
               <ViewCounter slug={params.slug} trackView />
            </h1>
         </div>
         <Mdx code={post.body.code} />
         <div className="mb-6 mt-4 max-w-[650px] border-t-2 border-neutral-100 pt-4 dark:border-gray-700 ">
            <h1 className="gradient-text py-1 text-3xl font-bold sm:text-5xl">
               What do you think?
            </h1>
            <div className="my-4 w-full rounded border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
               <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 md:text-xl">
                  Leave a comment
               </h2>
               <p className="my-1 text-gray-800 dark:text-gray-200">
                  Share your opinion regarding this post for other people to
                  see.
               </p>
               <div className="mt-2">
                  {!session ? (
                     <Button asChild variant="secondary">
                        <Link
                           href={`/sign-in?returnUrl=${encodeURIComponent(
                              `/blog/${post.slug}`,
                           )}`}
                           className="flex items-center gap-2"
                        >
                           <AiOutlineUser />
                           Sign In
                        </Link>
                     </Button>
                  ) : !session.user.canComment ? (
                     <p className="font-semibold text-red-500">
                        You are currently restricted from commenting.
                     </p>
                  ) : (
                     <div />
                  )}
               </div>
            </div>
            {/*
               // @ts-expect-error Server Component*/}
            <Comments slug={post.slug} />
         </div>
      </section>
   );
};

export default Page;