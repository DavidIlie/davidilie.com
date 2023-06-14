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
         <div className="absolute left-[7.8rem] hidden h-full w-1 bg-gray-800 dark:bg-gray-300 sm:block" />
         <div
            className={`relative z-50 flex-shrink-0 ${
               small && "sm:ml-20"
            } mb-6 sm:mb-0`}
         >
            <div
               className={`mx-auto flex items-center justify-center ${widthStyle} rounded-full bg-gray-100 p-1 dark:bg-gray-600`}
            >
               {typeof rest.image !== "string" ? (
                  <rest.image className="text-6xl" />
               ) : (
                  <Image
                     src={rest.image}
                     alt={title}
                     className={`${widthStyle} rounded-full object-cover`}
                     width={small ? 24 * 6 : 64 * 6}
                     height={small ? 24 * 6 : 64 * 6}
                  />
               )}
            </div>
         </div>
         <div className="rounded-md border-2 border-gray-100 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-1 flex flex-row items-center gap-2">
               <div className="relative">
                  <span className="gradient-text text-3xl font-medium">
                     {title}
                  </span>
                  <div className="absolute top-[1.25rem] mx-auto ml-[-0.075rem] h-3 w-[102%] bg-blue-500/20" />
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
            <div className="text-gray-900 dark:text-gray-200">
               {description}
            </div>
         </div>
      </div>
   );
};

export default TimelineItem;
