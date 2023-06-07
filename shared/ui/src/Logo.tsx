import React from "react";

export const Logo: React.FC<{
   showSlug?: boolean;
}> = ({ showSlug = false }) => {
   return (
      <h1
         className={`relative flex flex-row items-baseline text-2xl font-bold`}
      >
         <span className="tracking-tight hover:cursor-pointer">
            upload
            <span className="text-sky-600 underline decoration-destructive decoration-wavy decoration-from-font underline-offset-[6px]">
               ting
            </span>
         </span>
         {showSlug && (
            <sup className="absolute top-0 left-[calc(100%+.1rem)] text-xs font-bold text-black">
               [selfhostable]
            </sup>
         )}
      </h1>
   );
};
