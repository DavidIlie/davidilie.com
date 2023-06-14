import { Metadata } from "next";

import { Blog, allBlogs } from "contentlayer/generated";
import PostCard from "./_components/PostCard";

export const metadata: Metadata = {
   title: "Blog",
};

const Page = () => {
   const featuredPost = allBlogs[0] as Blog;
   return (
      <div className="flex items-center justify-center flex-grow sm:px-6 lg:px-8">
         <div className="container max-w-4xl mx-auto mt-32 mb-12">
            <h1 className="text-5xl font-bold text-center gradient-text">
               The David Ones
            </h1>
            <p className="px-6 mt-4 mb-6 text-center md:text-lg md:px-12 sm:mb-0">
               I&apos;ve been writing blog posts since 2020, mostly about my
               random technologic encounters during my day-to-day life.
               Currently there are {allBlogs.length} blog post
               {allBlogs.length > 1 && "s"}.
            </p>
            <div className="px-4 sm:px-1">
               {/*
                  // @ts-expect-error Server Component*/}
               <PostCard {...featuredPost} featured />
            </div>
            <div className="grid grid-cols-1 gap-2 px-4 mt-5 sm:grid-cols-2">
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
