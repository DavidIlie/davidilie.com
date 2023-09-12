"use client";

import React from "react";

import { colors } from "~/lib/colors";

export const Tags: React.FC<{
   tag: string;
   className?: string;
}> = ({ tag, className }) => {
   const color = colors[(tag.charCodeAt(1) + tag.charCodeAt(1)) % 11];

   return (
      <span
         className={`mr-2 inline-flex items-center justify-center px-2 py-2 text-sm font-bold leading-none text-${color}-50 bg-${color}-600 mb-1 rounded-md ${
            className ? className : ""
         }`}
      >
         {tag}
      </span>
   );
};
