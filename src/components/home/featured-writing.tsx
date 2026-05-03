import Link from "next/link";
import { blogs } from "#velite";
import { ArrowRight } from "lucide-react";

import { prisma } from "~/server/db";
import { SectionLabel } from "./section-label";

/**
 * Top-N essays by Prisma `Post.views`, rendered as a tabular list with
 * dotted leader lines (mxstbr.com pattern). Honest, specific, social-proofy.
 *
 * Server component — reads Prisma directly. Falls back to publication date
 * order when the views table is unavailable (e.g. local dev without DB).
 */
export const FeaturedWriting: React.FC = async () => {
   const published = blogs.filter((b) => b.published);
   if (published.length === 0) return null;

   let viewMap: Record<string, number> = {};
   try {
      const rows = await prisma.post.findMany({
         where: { slug: { in: published.map((b) => b.slug) } },
         select: { slug: true, views: true },
      });
      viewMap = Object.fromEntries(rows.map((r) => [r.slug, r.views]));
   } catch (err) {
      console.error("featured-writing: failed to read post views", err);
   }

   const ranked = [...published]
      .map((b) => ({ ...b, views: viewMap[b.slug] ?? 0 }))
      .sort((a, b) => {
         if (b.views !== a.views) return b.views - a.views;
         return (
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
         );
      })
      .slice(0, 4);

   const totalViews = Object.values(viewMap).reduce((a, b) => a + b, 0);

   return (
      <section
         aria-labelledby="featured-writing-heading"
         className="mx-auto w-full max-w-3xl px-6 py-4 sm:py-6"
      >
         <SectionLabel className="mb-6" number="06">
            <span id="featured-writing-heading">Most-read writing</span>
         </SectionLabel>

         <ul className="space-y-1">
            {ranked.map((post) => (
               <li key={post.slug}>
                  <Link
                     href={`/blog/${post.slug}`}
                     className="group flex items-baseline gap-3 rounded-md px-1 py-2 transition-colors hover:bg-muted/50"
                  >
                     <span className="flex-1 truncate text-base font-medium text-foreground transition-colors group-hover:text-brand sm:text-lg">
                        {post.title}
                     </span>
                     <span aria-hidden className="dotted-leader" />
                     <span className="tabnum text-xs text-muted-foreground sm:text-sm">
                        {post.views.toLocaleString("en-US")} views
                     </span>
                  </Link>
               </li>
            ))}
         </ul>

         <div className="mt-5 flex items-center justify-between text-sm text-muted-foreground">
            <span className="tabnum">
               {totalViews.toLocaleString("en-US")} reads across{" "}
               {published.length} post{published.length === 1 ? "" : "s"}
            </span>
            <Link
               href="/blog"
               className="inline-flex items-center gap-1 font-medium text-foreground transition-colors hover:text-brand"
            >
               All writing
               <ArrowRight className="h-3.5 w-3.5" />
            </Link>
         </div>
      </section>
   );
};
