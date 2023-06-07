import React from "react";
import { AiOutlineLink } from "react-icons/ai";

export interface TimelineItemProps {
   title: string;
   description: string;
   link?: string;
   imageSrc: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
   title,
   description,
   link,
   imageSrc,
}) => {
   return (
      <div className="relative flex items-center gap-12">
         <div className="absolute w-1 h-full bg-gray-300 left-4"></div>
         <div className="relative z-50 flex-shrink-0">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-500 rounded-full">
               <img
                  src={imageSrc}
                  alt={title}
                  className="w-8 h-8 rounded-full"
               />
            </div>
         </div>
         <div className="">
            <div className="flex flex-row items-center gap-2 mb-1">
               <div className="relative">
                  <span className="text-3xl font-medium gradient-text">
                     {title}
                  </span>
                  <div className="absolute w-[105%] mx-auto -ml-1 h-3 bg-blue-500 top-[1.25rem] opacity-20" />
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
            <p className="text-gray-600">{description}</p>
         </div>
      </div>
   );
};

export default TimelineItem;
