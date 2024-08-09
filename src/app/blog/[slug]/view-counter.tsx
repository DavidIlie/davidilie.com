"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

import { api } from "~/trpc/react";

export default function ViewCounter({ trackView }: { trackView: boolean }) {
   const params = useParams();
   const { slug } = params as { slug: string };
   const data = api.blog.get.useQuery({ slug });
   const views = (data && data.data?.views) || 0;

   const mutation = api.blog.change.useMutation();

   useEffect(() => {
      const registerView = async () => await mutation.mutateAsync({ slug });

      if (trackView) {
         const key = `viewed-${slug}`;
         const hasTracked = localStorage.getItem(key);
         if (hasTracked !== "true") {
            localStorage.setItem(key, "true");
            void registerView();
         }
      }
   }, [slug, trackView, mutation]);

   return (
      <p className="font-mono text-sm tracking-tighter text-neutral-500">
         {data
            ? `${views.toLocaleString()} view${views !== 1 ? "s" : ""}`
            : "​"}
      </p>
   );
}
