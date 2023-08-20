import React from "react";

import ExternalLink from "./external-link";
import { Socials } from "./socials";

const Footer: React.FC = () => {
   return (
      <footer className="w-full bg-slate-200 bg-opacity-40 pb-5 pt-5 text-black dark:bg-slate-800 dark:bg-opacity-50 dark:text-white">
         <div className="flex flex-col items-center sm:mx-32 sm:flex-row sm:justify-evenly">
            <p className="mb-2 text-center sm:mb-0 sm:w-1/3 sm:text-left">
               Built with{" "}
               <ExternalLink className="font-bold" url="https://nextjs.org">
                  Next.js
               </ExternalLink>
               ,{" "}
               <ExternalLink className="font-bold" url="https://trpc.io">
                  tRPC
               </ExternalLink>{" "}
               and{" "}
               <ExternalLink
                  className="font-bold"
                  url="https://tailwindcss.com"
               >
                  Tailwind
               </ExternalLink>
            </p>
            <h2 className="mb-2 text-center text-[1.2rem] sm:mb-0 sm:w-1/3">
               Powered by{" "}
               <a
                  href="https://davidapps.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium duration-150 hover:text-blue-500"
               >
                  David Ilie Apps Platform
               </a>
            </h2>
            <div className="flex justify-center sm:mb-0 sm:w-1/3">
               <Socials font="1.5" />
            </div>
         </div>
      </footer>
   );
};

export default Footer;
