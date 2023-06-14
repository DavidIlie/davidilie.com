import React from "react";

import { Socials } from "./Socials";

export const Footer: React.FC<{ children: React.ReactNode }> = ({
   children,
}) => {
   return (
      <footer className="w-full bg-slate-200 bg-opacity-40 pt-5 pb-5 text-black dark:bg-slate-800 dark:bg-opacity-50 dark:text-white">
         <div className="mx-12 flex flex-wrap items-center justify-center sm:justify-evenly">
            {children}
            <p className="mb-2 text-lg sm:mb-0">
               Powered by{" "}
               <a
                  href="https://davidapps.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium duration-150 hover:text-blue-500"
               >
                  David Ilie Apps Platform
               </a>
            </p>
            <Socials font="1.5" />
         </div>
      </footer>
   );
};
