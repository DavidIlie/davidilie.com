import React from "react";
import Link from "next/link";

import ExternalLink from "./external-link";
import { Button } from "./ui/button";

export const ServicesButtons: React.FC = () => {
   return (
      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
         <Link href="/editing-portfolio">
            <Button
               variant="outline"
               size="lg"
               className="w-full rounded-xl border-2 border-gray-200 bg-white px-8 py-3 font-semibold text-gray-900 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md dark:hover:text-black/80 sm:w-auto"
            >
               📹 Editing Portfolio
            </Button>
         </Link>
         <Link href="/developer-portfolio">
            <Button
               variant="outline"
               size="lg"
               className="w-full rounded-xl border-2 border-gray-200 bg-white px-8 py-3 font-semibold text-gray-900 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md dark:hover:text-black/80 sm:w-auto"
            >
               💻 Developer Portfolio
            </Button>
         </Link>
      </div>
   );
};

export const CallToAction: React.FC = () => {
   return (
      <div className="border-t border-gray-200 bg-secondary dark:border-gray-800 dark:bg-gray-800/20">
         <div className="container max-w-4xl px-6 py-16">
            <div className="space-y-6 text-center">
               <div className="relative flex w-full items-center justify-center">
                  <h1 className="gradient-text p-1 text-4xl font-medium sm:text-5xl">
                     I&apos;d love to work with you!
                  </h1>
                  <span className="text-4xl">🚀</span>
                  <div className="absolute top-[1.6rem] mx-auto ml-[0.25rem] h-6 bg-blue-500/20 sm:ml-[-0.075rem] sm:w-[65%]" />
               </div>
               <div className="mx-auto max-w-2xl space-y-4">
                  <p className="text-xl font-medium text-gray-700 dark:text-gray-300 sm:text-2xl">
                     Check out the portfolios below to see what I can do for you
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                     Or send me an email so we can chat about your project! ✨
                  </p>
               </div>
               <ServicesButtons />
               <div className="pt-8">
                  <div className="mx-auto max-w-md rounded-2xl border border-gray-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80">
                     <p className="mb-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                        Or you can contact me at:
                     </p>
                     <ExternalLink
                        url="mailto:david@davidilie.com"
                        className="inline-flex items-center gap-2 text-xl font-semibold text-blue-600 transition-colors duration-200 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                     >
                        📧 david@davidilie.com
                     </ExternalLink>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
