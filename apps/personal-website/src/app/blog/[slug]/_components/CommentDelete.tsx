"use client";

import { useEffect, useState } from "react";

import { Tooltip } from "@david/ui";

const CommentDelete = ({ id }: { id: string }) => {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);

   useEffect(() => {
      if (error) {
         setTimeout(() => {
            setError(false);
            setLoading(false);
         }, 2000);
      }
   }, [error]);
   return (
      <>
         <span className="text-gray-800 dark:text-gray-200">/</span>
         {error ? (
            <p className="text-sm text-red-600 dark:text-red-500">
               Error deleting comment.
            </p>
         ) : (
            <Tooltip content="Double click to delete">
               <button
                  className="text-sm text-red-600 dark:text-red-500"
                  onDoubleClick={async () => {
                     if (loading) return;
                     const r = await fetch(`/api/blog/comment?id=${id}`, {
                        credentials: "include",
                        method: "DELETE",
                     });
                     setLoading(false);
                     if (r.status !== 200) return setError(true);
                     alert("deleted!");
                  }}
               >
                  {loading ? "Deleting" : "Delete"}
               </button>
            </Tooltip>
         )}
      </>
   );
};

export default CommentDelete;
