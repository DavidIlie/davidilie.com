import React from "react";

import { items } from "~/data/timeline";

import TimelineItem from "~/components/TimelineItem";
import Header from "./Header";

const Page = () => {
   return (
      <>
         <div className="flex min-h-screen flex-grow items-center justify-center px-4 text-center">
            <Header showSpain={process.env.SHOW_SPAIN === "true"} />
         </div>
         <div className="flex w-full justify-center border-t-2 border-gray-300 pb-12 dark:border-gray-700">
            <div>
               <div className="container relative mx-auto flex max-w-3xl flex-col space-y-10 px-4 py-8 sm:space-y-20 sm:px-0">
                  {items.map((item, index) => (
                     <div key={index}>
                        {index !== 0 && (
                           <div className="absolute bottom-0 left-[8.8rem] top-0 z-0 hidden w-1 bg-gray-800 dark:bg-gray-300 sm:block"></div>
                        )}
                        <TimelineItem {...(item as any)} />
                     </div>
                  ))}
               </div>
               <h1 className="gradient-text mt-6 text-center text-3xl font-medium sm:text-5xl">
                  That&apos;s it...
               </h1>
            </div>
         </div>
      </>
   );
};

export default Page;
