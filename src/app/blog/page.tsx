import { Metadata } from "next";
import { blogs, type Blog } from "#velite";

import { env } from "~/env.mjs";

import { api, HydrateClient } from "~/trpc/server";
import PostCard from "./post-card";

export const metadata: Metadata = {
   title: "Blog",
};

const Page = async () => {
   void api.spotify.playingStateAndSong.prefetch();

   const posts =
      env.NODE_ENV === "production"
         ? blogs.filter((s) => s.published)
         : blogs;

   const featuredPost = posts[0] as Blog;

   return (
      <HydrateClient>
         <div className="flex flex-grow items-center justify-center">
            <div className="container mx-auto mb-12 mt-32 max-w-4xl">
               <h1 className="text-center text-5xl font-bold text-brand">
                  The David Ones
               </h1>
               <p className="mb-6 mt-4 px-2 text-center text-muted-foreground sm:mb-0 md:px-12 md:text-lg">
                  I&apos;ve been writing blog posts since 2020, mostly about my
                  random technologic encounters during my day-to-day life.
                  Currently there are {posts.length} blog post
                  {posts.length > 1 && "s"}.
               </p>
               <PostCard {...featuredPost} featured />
               <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:px-2.5">
                  {posts
                     .toSorted((a, b) =>
                        new Date(b.publishedAt).getTime() -
                        new Date(a.publishedAt).getTime()
                     )
                     .filter((s) => s.slug !== featuredPost.slug)
                     .map((post) => (
                        <PostCard {...post} key={post.slug} />
                     ))}
               </div>
            </div>
         </div>
      </HydrateClient>
   );
};

export default Page;
