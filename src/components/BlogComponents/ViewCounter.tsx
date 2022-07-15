/* eslint-disable react-hooks/exhaustive-deps */
import { trpc } from "@/lib/trpc";
import React, { useEffect } from "react";

const ViewCounter: React.FC<{ slug: string; views: number }> = ({
   slug,
   views,
}) => {
   const viewMutation = trpc.useMutation(["blog.addViews"]);
   const utils = trpc.useContext();

   useEffect(() => {
      const alreadyViewed = localStorage.getItem(`viewed-${slug}`);
      const registerView = async () => {
         if (alreadyViewed !== "true") {
            await viewMutation.mutateAsync({ slug });
            localStorage.setItem(`viewed-${slug}`, "true");
            utils.invalidateQueries(["blog.getStats", { slug }]);
         }
      };
      registerView();
   }, [slug]);

   return (
      <span>{`${views > 0 ? views.toLocaleString() : "–––"} view${
         views !== 1 ? "s" : ""
      }`}</span>
   );
};

export default ViewCounter;
