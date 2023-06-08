import React, { useState } from "react";

const ScrollDown: React.FC = () => {
   const [isHovered, setIsHovered] = useState(false);

   const handleHover = () => {
      setIsHovered(true);
   };

   const handleHoverExit = () => {
      setIsHovered(false);
   };

   return (
      <div
         className={`flex flex-col items-center justify-center h-16 w-32 cursor-pointer transform transition-transform duration-300 ${
            isHovered ? "rotate-180" : ""
         }`}
         onMouseEnter={handleHover}
         onMouseLeave={handleHoverExit}
      >
         <svg
            className={`h-6 w-6 text-gray-400 transition-transform duration-300 ${
               isHovered ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
         >
            <path
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeWidth={2}
               d="M19 9l-7 7-7-7"
            />
         </svg>
         <span
            className={`text-gray-400 mt-1 transition-opacity duration-300 ${
               isHovered ? "opacity-0" : "opacity-100"
            }`}
         >
            Scroll down...
         </span>
      </div>
   );
};

export default ScrollDown;
