"use client";

import React from "react";

export const Tags: React.FC<{
   tag: string;
   className?: string;
}> = ({ tag, className }) => {
   return (
      <span
         className={`mr-2 mb-1 inline-flex items-center justify-center rounded-md bg-secondary px-2 py-1.5 text-xs leading-none font-medium text-secondary-foreground ${className ?? ""}`}
      >
         {tag}
      </span>
   );
};
