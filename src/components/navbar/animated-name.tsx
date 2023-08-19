"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AnimatedName: React.FC = () => {
   const [isHover, setHover] = useState<boolean>(false);
   const pathname = usePathname();

   return (
      <div
         className="relative cursor-pointer"
         onMouseEnter={() => setHover(true)}
         onMouseLeave={() => setHover(false)}
      >
         <Link
            href="/"
            className={`cursor-pointer text-3xl font-semibold text-black dark:text-white ${
               pathname === "/" && "pointer-events-none"
            }`}
         >
            David Ilie
            <svg
               className={`absolute stroke-current text-blue-500 ${
                  isHover && "underlineDash"
               }`}
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 265 43"
               fill="none"
               strokeWidth="5px"
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeMiterlimit="10"
               style={{
                  height: "27px",
                  bottom: "-18px",
                  left: "-22px",
                  transition: "all 0.2s",
               }}
            >
               <path
                  className="animated-underline"
                  d="M16.7 20.2c76.5 4.4 153.6-9.7 229.8-4.1 5.4.4 12.4 2.1 11.7 5.6-67.3 1.7-134.5 5.5-201.2 11.5l87.7-.9c35.2-.4 70.8-.7 104.9 4.6"
               />
            </svg>
         </Link>
      </div>
   );
};

export default AnimatedName;
