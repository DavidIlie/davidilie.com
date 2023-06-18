import { Metadata } from "next";
import { allBlogs, Blog } from "contentlayer/generated";

import PostCard from "./_components/PostCard";

export const metadata: Metadata = {
   title: "Blog",
};

const Page = () => {
   const featuredPost = allBlogs[0] as Blog;
   return (
      <div className="flex flex-grow items-center justify-center sm:px-6 lg:px-8">
         <div className="container mx-auto mb-12 mt-32 max-w-4xl">
            <h1 className="gradient-text text-center text-5xl font-bold">
               The David Ones
            </h1>
            <p className="mb-6 mt-4 px-6 text-center sm:mb-0 md:px-12 md:text-lg">
               I&apos;ve been writing blog posts since 2020, mostly about my
               random technologic encounters during my day-to-day life.
               Currently there are {allBlogs.length} blog post
               {allBlogs.length > 1 && "s"}.
            </p>
            {/*
               // @ts-expect-error Server Component*/}
            <PostCard {...featuredPost} featured />
            <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:px-2.5">
               {allBlogs
                  .sort((a, b) => {
                     if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
                        return -1;
                     }
                     return 1;
                  })
                  .filter((s) => s.slug !== featuredPost.slug)
                  .map((post) => (
                     // @ts-expect-error Server Component*/
                     <PostCard {...post} key={post.slug} />
                  ))}
            </div>
         </div>
      </div>
   );
};

export default Page;
