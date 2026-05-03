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
      env.NODE_ENV === "production" ? blogs.filter((s) => s.published) : blogs;

   const featuredPost = posts[0] as Blog;

   return (
      <HydrateClient>
         <div className="flex flex-grow items-center justify-center">
            <div className="container mx-auto mt-32 mb-12 max-w-4xl">
               <div className="flex flex-col items-center gap-3 text-center">
                  <span className="inline-flex items-center gap-2 text-[0.7rem] font-medium tracking-[0.18em] text-muted-foreground uppercase">
                     <span
                        aria-hidden
                        className="h-px w-6 bg-gradient-to-r from-transparent to-border"
                     />
                     writing since 2020
                     <span
                        aria-hidden
                        className="h-px w-6 bg-gradient-to-l from-transparent to-border"
                     />
                  </span>
                  <h1 className="font-display text-5xl leading-[1.05] font-semibold tracking-tight text-balance text-brand sm:text-6xl">
                     The David Ones
                  </h1>
                  <p className="mt-1 max-w-2xl px-2 text-muted-foreground md:text-lg">
                     I&apos;ve been writing blog posts since 2020, mostly about
                     my random technologic encounters during my day-to-day life.
                     Currently there are {posts.length} blog post
                     {posts.length > 1 && "s"}.
                  </p>
               </div>
               <PostCard {...featuredPost} featured />
               <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:px-2.5">
                  {posts
                     .toSorted(
                        (a, b) =>
                           new Date(b.publishedAt).getTime() -
                           new Date(a.publishedAt).getTime(),
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
