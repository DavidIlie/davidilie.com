import React from "react";

import Header from "./Header";
import TimelineItem from "~//components/TimelineItem";
import { items } from "~/data/timeline";

const Page = () => {
   return (
      <>
         <div className="flex items-center justify-center flex-grow min-h-screen px-4 text-center">
            <Header showSpain={process.env.SHOW_SPAIN === "true"} />
         </div>
         <div className="flex justify-center w-full pb-12 border-t-2 border-gray-300 dark:border-gray-700">
            <div>
               <div className="container relative flex flex-col max-w-3xl px-4 py-8 mx-auto space-y-10 sm:space-y-20 sm:px-0">
                  {items.map((item, index) => (
                     <>
                        {index !== 0 && (
                           <div className="absolute sm:block hidden z-0 top-0 bottom-0 w-1 bg-gray-800 dark:bg-gray-300 left-[7.8rem]"></div>
                        )}
                        <TimelineItem key={index} {...(item as any)} />
                     </>
                  ))}
               </div>
               <h1 className="mt-6 text-3xl font-medium text-center sm:text-5xl gradient-text">
                  That's it...
               </h1>
            </div>
         </div>
      </>
   );
};

export default Page;
