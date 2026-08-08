import React from "react";

export const LoadingSpinner: React.FC = () => {
   return (
      <div className="flex min-h-[calc(100vh-10rem)] flex-1 items-center justify-center">
         <div role="status">
            <div
               aria-hidden
               className="size-8 animate-spin rounded-full border-2 border-muted border-t-brand"
               style={{ animationDuration: "0.6s" }}
            />
            <span className="sr-only">Loading</span>
         </div>
      </div>
   );
};
