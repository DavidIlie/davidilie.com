"use client";

import { useEffect, useRef } from "react";
import { usePlausible } from "next-plausible";

import { api } from "~/trpc/react";

type BlogPlausibleEvents = {
   "blog-post-viewed": { slug: string };
};

export default function ViewCounter({
   slug,
   trackView,
}: {
   slug: string;
   trackView: boolean;
}) {
   const plausible = usePlausible<BlogPlausibleEvents>();
   const trackedPlausibleSlugRef = useRef<string | null>(null);
   const [data] = api.blog.get.useSuspenseQuery({ slug });
   const views = (data && data.views) || 0;

   const mutation = api.blog.change.useMutation();

   useEffect(() => {
      if (!trackView) return;

      if (trackedPlausibleSlugRef.current !== slug) {
         plausible("blog-post-viewed", {
            props: { slug },
         });
         trackedPlausibleSlugRef.current = slug;
      }
   }, [slug, trackView, plausible]);

   useEffect(() => {
      if (!trackView) return;

      const key = `viewed-${slug}`;
      const hasTracked = localStorage.getItem(key);
      if (hasTracked !== "true") {
         localStorage.setItem(key, "true");
         mutation.mutate({ slug });
      }
   }, [slug, trackView, mutation]);

   return (
      <span className="font-mono text-sm tracking-tighter text-muted-foreground tabular-nums">
         {data
            ? `${views.toLocaleString()} view${views !== 1 ? "s" : ""}`
            : "​"}
      </span>
   );
}
