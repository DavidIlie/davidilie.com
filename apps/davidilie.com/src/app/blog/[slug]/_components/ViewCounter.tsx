"use client";

import { useEffect } from "react";
import useSWR from "swr";

type PostView = {
   total: number;
};

async function fetcher<JSON = any>(
   input: RequestInfo,
   init?: RequestInit,
): Promise<JSON> {
   const res = await fetch(input, init);
   // eslint-disable-next-line @typescript-eslint/no-unsafe-return
   return res.json();
}

export default function ViewCounter({
   slug,
   trackView,
}: {
   slug: string;
   trackView: boolean;
}) {
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [slug]);

   return (
      <p className="font-mono text-sm tracking-tighter text-neutral-500">
         {data
            ? `${views.toLocaleString()} view${views !== 1 ? "s" : ""}`
            : "​"}
      </p>
   );
}
