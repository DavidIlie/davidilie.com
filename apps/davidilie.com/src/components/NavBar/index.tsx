"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useParams } from "next/navigation";
import Link from "next/link";

import useScrollPosition from "~/hooks/useScrollPosition";
import AnimatedName from "./AnimatedName";
import Dropdown from "./Dropdown";

const pages = [
   { name: "Home", url: "/" },
   { name: "Blog", url: "/blog" },
   { name: "Projects", url: "/projects" },
   { name: "Gear", url: "/gear" },
   { name: "Music", url: "/music" },
];

const NavBar: React.FC = () => {
   const { y, max } = useScrollPosition();
   const pathname = usePathname();
   const params = useParams();

   const [width, setWidth] = useState<number>(0);

   const isBlogPage = params.slug;

   useEffect(() => {
      if (isBlogPage) {
         const newWidth = y / max;
         if (newWidth !== width) {
            setWidth(newWidth * 100);
         }
      }
   }, [y, max, width, isBlogPage]);

   const [top, setTop] = useState<boolean>(true);

   useEffect(() => {
      const scrollHandler = () => {
         window.pageYOffset > 10 ? setTop(false) : setTop(true);
      };
      window.addEventListener("scroll", scrollHandler);
      return () => window.removeEventListener("scroll", scrollHandler);
   }, [top]);

   const [clickMobileMenu, setClickMobileMenu] = useState<boolean>(false);

   return (
      <nav
         className={`w-full fixed duration-300 z-50 backdrop-filter backdrop-blur-lg pb-4 ${
            !top &&
            "backdrop-filter backdrop-blur-lg bg-blue-100/50 dark:bg-cyan-900/10 hover:bg-blue-100/100 dark:hover:bg-cyan-900/30 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.3)] shadow-black"
         }`}
      >
         {isBlogPage && (
            <div className="absolute w-full">
               <div className="relative">
                  <div className="flex h-1 overflow-hidden text-xs">
                     <div
                        style={{
                           width: `${width}%`,
                        }}
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-black dark:text-white justify-center ${
                           width > 99 && "duration-200"
                        } bg-${width >= 100 ? "green-500" : "blue-700"}`}
                     ></div>
                  </div>
               </div>
            </div>
         )}
         <div
            className={`${
               clickMobileMenu && "bg-white/40 dark:bg-gray-800/50"
            }`}
         >
            <div className="px-8 pl-8 mx-auto -mt-1 max-w-7xl sm:px-6 sm:pl-8 lg:pl-8">
               <div className="flex items-center justify-between h-16 mb-2">
                  <div className="flex">
                     <div
                        className={`${
                           clickMobileMenu && "mt-[1.25rem]"
                        } flex-shrink-0`}
                     >
                        {!clickMobileMenu ? (
                           <AnimatedName />
                        ) : (
                           <Link
                              href="/"
                              className={`text-3xl font-medium text-black cursor-pointer dark:text-white ${
                                 pathname === "/" && "pointer-events-none"
                              }`}
                           >
                              David Ilie
                           </Link>
                        )}
                     </div>
                     <div className="hidden sm:block">
                        <div className="flex items-baseline gap-4 mt-6 ml-10">
                           {pages.map((page, index) => (
                              <Link
                                 href={page.url}
                                 key={index}
                                 className={
                                    pathname === page.url ||
                                    (isBlogPage && page.name === "Blog")
                                       ? `${
                                            !(
                                               isBlogPage &&
                                               page.name === "Blog"
                                            ) &&
                                            "pointer-events-none cursor-not-allowed"
                                         } bg-gray-600 dark:bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium duration-200`
                                       : "cursor-pointer cursor-pointertext-gray-900 dark:text-gray-200 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-900 px-3 py-2 rounded-md text-sm font-medium duration-200"
                                 }
                              >
                                 {page.name}
                              </Link>
                           ))}
                        </div>
                     </div>
                  </div>
                  <div className="hidden mt-8 ml-10 space-x-4 sm:block">
                     <Dropdown />
                  </div>
                  <div className="block sm:hidden">
                     <div className="flex items-center mt-6 -mr-2 md:hidden">
                        <div className="mt-1.5 mr-5">
                           <Dropdown />
                        </div>
                        <button
                           type="button"
                           className="inline-flex items-center justify-center p-2 text-gray-500 bg-gray-200 rounded-md dark:bg-gray-800 hover:bg-gray-300 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
                           onClick={() => {
                              setClickMobileMenu(!clickMobileMenu);
                           }}
                        >
                           {clickMobileMenu ? (
                              <svg
                                 className="block w-6 h-6"
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor"
                                 aria-hidden="true"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                 />
                              </svg>
                           ) : (
                              <svg
                                 className="block w-6 h-6"
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor"
                                 aria-hidden="true"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                 />
                              </svg>
                           )}
                        </button>
                     </div>
                  </div>
               </div>
            </div>
            {clickMobileMenu && (
               <div className="h-screen text-center md:hidden">
                  <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                     {pages.map((page, index) => (
                        <Link
                           href={page.url}
                           key={index}
                           onClick={() => setClickMobileMenu(false)}
                           className={
                              pathname === page.url ||
                              (isBlogPage && page.name === "Blog")
                                 ? `${
                                      !(isBlogPage && page.name === "Blog") &&
                                      "cursor-pointer"
                                   } bg-cyan-600 dark:bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium`
                                 : "text-gray-800 dark:text-gray-300 hover:bg-cyan-800 dark:hover:bg-cyan-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                           }
                        >
                           {page.name}
                        </Link>
                     ))}
                  </div>
               </div>
            )}
         </div>
      </nav>
   );
};

export default NavBar;
