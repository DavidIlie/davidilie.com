import React from "react";
import Image from "next/image";

import { AiOutlineLink } from "react-icons/ai";

export interface TimelineItemProps {
   title: string;
   description: React.ReactNode;
   link?: string;
   imageSrc: string;
   small?: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
   title,
   description,
   link,
   imageSrc,
   small = false,
}) => {
   const widthStyle = small ? "w-24 h-24" : "w-64 w-64";

   return (
      <div className="relative flex items-center gap-12">
         <div className="absolute w-1 h-full bg-gray-300 left-[7.8rem]"></div>
         <div className={`relative z-50 flex-shrink-0 ${small && "ml-20"}`}>
            <div
               className={`flex items-center justify-center ${widthStyle} bg-gray-600 p-1 rounded-full`}
            >
               <Image
                  src={imageSrc}
                  alt={title}
                  className={`object-scale-down ${widthStyle} rounded-full`}
                  width={small ? 24 * 6 : 64 * 6}
                  height={small ? 24 * 6 : 64 * 6}
               />
            </div>
         </div>
         <div className="px-4 py-2 bg-gray-800 border-2 border-gray-700 rounded-md">
            <div className="flex flex-row items-center gap-2 mb-1">
               <div className="relative">
                  <span className="text-3xl font-medium gradient-text">
                     {title}
                  </span>
                  <div className="absolute w-[105%] mx-auto ml-[-0.125rem] h-3 bg-blue-500/20 top-[1.25rem]" />
               </div>
               {link && (
                  <a
                     href={link}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="mt-1 text-xl text-gray-400 duration-150 hover:text-gray-500"
                  >
                     <AiOutlineLink />
                  </a>
               )}
            </div>
            <p className="text-gray-300">{description}</p>
         </div>
      </div>
   );
};

export default TimelineItem;
