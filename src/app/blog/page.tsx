import { Metadata } from "next";
import { allBlogs, Blog } from "contentlayer/generated";

import { env } from "~/env.mjs";

import PostCard from "./post-card";

export const metadata: Metadata = {
   title: "Blog",
};

const Page = async () => {
   const posts =
      env.NODE_ENV === "production"
         ? allBlogs.filter((s) => s.published)
         : allBlogs;

   const featuredPost = posts[0] as Blog;
   return (
      <div className="flex flex-grow items-center justify-center">
         <div className="container mx-auto mb-12 mt-32 max-w-4xl">
            <h1 className="gradient-text text-center text-5xl font-bold">
               The David Ones
            </h1>
            <p className="mb-6 mt-4 px-2 text-center sm:mb-0 md:px-12 md:text-lg">
               I&apos;ve been writing blog posts since 2020, mostly about my
               random technologic encounters during my day-to-day life.
               Currently there are {posts.length} blog post
               {posts.length > 1 && "s"}.
            </p>
            <PostCard {...featuredPost} featured />
            <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:px-2.5">
               {posts
                  .sort((a, b) => {
                     if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
                        return -1;
                     }
                     return 1;
                  })
                  .filter((s) => s.slug !== featuredPost.slug)
                  .map((post) => (
                     <PostCard {...post} key={post.slug} />
                  ))}
            </div>
         </div>
      </div>
   );
};

export default Page;
