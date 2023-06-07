import React from "react";
import Header from "./Header";
import TimelineItem from "./components/TimelineItem";

import { items } from "~/data/timeline";

const Page = () => {
   return (
      <>
         <div className="flex items-center justify-center flex-grow min-h-screen px-4 text-center">
            <Header />
         </div>
         <div className="flex justify-center w-full pb-12 border-t-2 border-gray-700">
            <div>
               <div className="container relative flex flex-col max-w-3xl py-8 mx-auto space-y-20">
                  {items.map((item, index) => (
                     <React.Fragment key={index}>
                        {index !== 0 && (
                           <div className="absolute top-0 bottom-0 w-1 bg-gray-300 left-[7.8rem]"></div>
                        )}
                        <TimelineItem {...item} />
                     </React.Fragment>
                  ))}
               </div>
            </div>
         </div>
      </>
   );
};

export default Page;
