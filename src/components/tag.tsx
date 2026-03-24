"use client";

import React from "react";

// HSL palette matching the old Tailwind color names
const palette = [
   { bg: "hsl(0 72% 51%)", text: "hsl(0 86% 97%)" },        // red
   { bg: "hsl(25 95% 53%)", text: "hsl(34 100% 96%)" },      // orange
   { bg: "hsl(38 92% 50%)", text: "hsl(48 100% 96%)" },      // amber
   { bg: "hsl(48 96% 53%)", text: "hsl(55 92% 95%)" },       // yellow
   { bg: "hsl(84 81% 44%)", text: "hsl(79 81% 96%)" },       // lime
   { bg: "hsl(142 71% 45%)", text: "hsl(138 76% 97%)" },     // green
   { bg: "hsl(160 84% 39%)", text: "hsl(152 81% 96%)" },     // emerald
   { bg: "hsl(173 80% 40%)", text: "hsl(166 76% 97%)" },     // teal
   { bg: "hsl(189 94% 43%)", text: "hsl(183 100% 96%)" },    // cyan
   { bg: "hsl(199 89% 48%)", text: "hsl(204 100% 97%)" },    // sky
   { bg: "hsl(217 91% 60%)", text: "hsl(214 95% 93%)" },     // blue
   { bg: "hsl(239 84% 67%)", text: "hsl(226 100% 97%)" },    // indigo
];

export const Tags: React.FC<{
   tag: string;
   className?: string;
}> = ({ tag, className }) => {
   const color = palette[(tag.charCodeAt(1) + tag.charCodeAt(1)) % palette.length];

   return (
      <span
         className={`mr-2 mb-1 inline-flex items-center justify-center rounded-md px-2 py-2 text-sm font-bold leading-none ${className ?? ""}`}
         style={{ backgroundColor: color.bg, color: color.text }}
      >
         {tag}
      </span>
   );
};
