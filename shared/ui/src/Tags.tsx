"use client";

import React from "react";
import { useTheme } from "next-themes";

import { colors } from "./lib/colors";

export const Tags: React.FC<{
   tag: string;
   className?: string;
}> = ({ tag, className }) => {
   const { resolvedTheme } = useTheme();

   const color = colors[(tag.charCodeAt(1) + tag.charCodeAt(1)) % 11];

   return (
      <span
         className={`mr-2 inline-flex items-center justify-center px-2 py-2 text-sm font-bold leading-none text-${color}-${
            resolvedTheme === "dark" ? "100" : "50"
         } bg-${color}-${
            resolvedTheme === "dark" ? "800" : "600"
         } mb-1 rounded-md ${className ? className : ""}`}
      >
         {tag}
      </span>
   );
};
