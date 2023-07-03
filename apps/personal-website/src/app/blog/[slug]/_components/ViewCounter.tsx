/* eslint-disable @typescript-eslint/no-unsafe-return */
"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";

type PostView = {
   total: number;
};

async function fetcher<JSON = any>(
   input: RequestInfo,
   init?: RequestInit,
): Promise<JSON> {
   const res = await fetch(input, init);
   return res.json();
}

export default function ViewCounter({ trackView }: { trackView: boolean }) {
   const params = useParams();
   const { slug } = params as { slug: string };
   const { data } = useSWR<PostView>(`/api/views/${slug}`, fetcher);
   const views = (data && data.total) || 0;

   useEffect(() => {
      const registerView = () =>
         fetch(`/api/views/${slug}`, {
            method: "POST",
         });

      if (trackView) {
         const key = `viewed-${slug}`;
         const hasTracked = localStorage.getItem(key);
         if (hasTracked !== "true") {
            localStorage.setItem(key, "true");
            void registerView();
         }
      }
   }, [slug, trackView]);

   return (
      <p className="font-mono text-sm tracking-tighter text-neutral-500">
         {data
            ? `${views.toLocaleString()} view${views !== 1 ? "s" : ""}`
            : "​"}
      </p>
   );
}
