import React from "react";
import Image from "next/image";

import type { IconType } from "react-icons";
import { AiOutlineLink } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";

export type TimelineItemProps = {
   title: string;
   description: React.ReactNode;
   link?: string;
   image: string | IconType;
   small?: boolean;
};

const TimelineItem: React.FC<TimelineItemProps> = ({
   title,
   description,
   link,
   small = false,
   ...rest
}) => {
   const widthStyle = small ? "w-24 h-24" : "w-64 w-64";

   return (
      <div className="relative gap-12 sm:flex">
         <div className="absolute w-1 h-full bg-gray-300 left-[7.8rem] sm:block hidden" />
         <div
            className={`relative z-50 flex-shrink-0 ${
               small && "sm:ml-20"
            } sm:mb-0 mb-6`}
         >
            <div
               className={`flex items-center justify-center mx-auto ${widthStyle} p-1 bg-gray-600 rounded-full`}
            >
               {typeof rest.image !== "string" ? (
                  <rest.image className="text-6xl" />
               ) : (
                  <Image
                     src={rest.image}
                     alt={title}
                     className={`${widthStyle} object-cover rounded-full`}
                     width={small ? 24 * 6 : 64 * 6}
                     height={small ? 24 * 6 : 64 * 6}
                  />
               )}
            </div>
         </div>
         <div className="px-4 py-2 bg-gray-800 border-2 border-gray-700 rounded-md">
            <div className="flex flex-row items-center gap-2 mb-1">
               <div className="relative">
                  <span className="text-3xl font-medium gradient-text">
                     {title}
                  </span>
                  <div className="absolute w-[102%] mx-auto ml-[-0.075rem] h-3 bg-blue-500/20 top-[1.25rem]" />
               </div>
               {link && (
                  <a
                     href={link}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="mt-1 text-xl text-gray-400 duration-150 hover:text-gray-500"
                  >
                     {link.includes("github.com") ? (
                        <FaGithub className="ml-1" />
                     ) : (
                        <AiOutlineLink />
                     )}
                  </a>
               )}
            </div>
            <p className="text-gray-200">{description}</p>
         </div>
      </div>
   );
};

export default TimelineItem;
