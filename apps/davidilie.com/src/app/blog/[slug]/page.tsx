import type { Metadata } from "next";
import Balancer from "react-wrap-balancer";
import { notFound } from "next/navigation";

import { allBlogs } from "contentlayer/generated";
import { env } from "~/env.mjs";
import { insertPostInDbIfNotExist } from "~/server/lib/insertPostInDbIfNotExist";
import { prisma } from "~/server/db";

import { Tags } from "@david/ui";
import { Mdx } from "~/app/blog/_components/mdx";

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

   const comments = await prisma.comment.findMany({
      where: { postSlug: params.slug },
   });
   const postDb = (await prisma.post.findFirst({
      where: { slug: params.slug },
      select: { views: true },
   })) as { views: number };

   return (
      <section>
         <script type="application/ld+json">
            {JSON.stringify(post.structuredData)}
         </script>
         {post.tags.map((tag, index) => (
            <Tags tag={tag} key={index} />
         ))}
         <h1 className="font-bold text-3xl max-w-[650px] mt-1 gradient-text">
            <Balancer>{post.title}</Balancer>
         </h1>
         <div className="grid grid-cols-[auto_1fr_auto] items-center mt-2 mb-6 font-mono text-sm max-w-[650px]">
            <div className="px-2 py-1 tracking-tighter rounded-md bg-neutral-100 dark:bg-gray-800">
               {post.publishedAt}
            </div>
            <div className="h-[0.2em] bg-neutral-100 dark:bg-gray-700 mx-2" />
            <h1 className="font-mono text-sm tracking-tighter text-neutral-500 dark:text-neutral-300">
               {postDb.views} view{postDb.views !== 1 ? "s" : ""}
            </h1>
         </div>
         <Mdx code={post.body.code} />
         <div className="mt-4 mb-6 border-t-2 max-w-[650px] pt-4 border-neutral-100 dark:border-gray-700 ">
            <h1 className="py-1 text-3xl font-bold sm:text-5xl gradient-text">
               What do you think?
            </h1>
            <p>TBD</p>
         </div>
      </section>
   );
};

export default Page;
