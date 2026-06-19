import { Metadata } from "next";
import { blogs, type Blog } from "#velite";

import { env } from "~/env.mjs";

import { prisma } from "~/server/db";
import { api, HydrateClient } from "~/trpc/server";
import PostCard from "./post-card";

export const metadata: Metadata = {
   title: "Blog",
};

const Page = async () => {
   void api.spotify.playingStateAndSong.prefetch();

   const posts = (
      env.NODE_ENV === "production" ? blogs.filter((s) => s.published) : blogs
   ).toSorted(
      (a, b) =>
         new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
   );

   const featuredPost = posts[0] as Blog;

   let totalViews = 0;
   try {
      const rows = await prisma.post.findMany({
         where: { slug: { in: posts.map((p) => p.slug) } },
         select: { views: true },
      });
      totalViews = rows.reduce((sum, r) => sum + r.views, 0);
   } catch (err) {
      console.error("blog index: failed to read total views", err);
   }

   return (
      <HydrateClient>
         <div className="flex flex-grow items-center justify-center">
            <div className="container mx-auto mt-24 mb-12 max-w-4xl px-6 sm:mt-32">
               <div className="flex flex-col items-center gap-3 text-center">
                  <span className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">
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
                     Blog posts since 2020, mostly about whatever broke last
                     week or whichever rabbit hole I fell into.
                     {posts.length > 0 && (
                        <>
                           {" "}
                           <span className="tabnum text-foreground/80">
                              {posts.length} posts
                           </span>
                           {totalViews > 0 && (
                              <>
                                 {" "}
                                 &middot;{" "}
                                 <span className="tabnum text-foreground/80">
                                    {totalViews.toLocaleString("en-US")} reads
                                 </span>
                              </>
                           )}
                           .
                        </>
                     )}
                  </p>
               </div>
               <PostCard {...featuredPost} featured />
               <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:px-2.5">
                  {posts.slice(1).map((post) => (
                     <PostCard {...post} key={post.slug} />
                  ))}
               </div>
            </div>
         </div>
      </HydrateClient>
   );
};

export default Page;
