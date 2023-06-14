"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

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
         className={`fixed z-50 w-full pb-4 backdrop-blur-lg backdrop-filter duration-300 ${
            !top &&
            "bg-blue-100/50 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.3)] shadow-black backdrop-blur-lg backdrop-filter hover:bg-blue-100/100 dark:bg-cyan-900/10 dark:hover:bg-cyan-900/30"
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
                        className={`flex flex-col justify-center whitespace-nowrap text-center text-black shadow-none dark:text-white ${
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
            <div className="mx-auto -mt-1 max-w-7xl px-8 pl-8 sm:px-6 sm:pl-8 lg:pl-8">
               <div className="mb-2 flex h-16 items-center justify-between">
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
                              className={`cursor-pointer text-3xl font-medium text-black dark:text-white ${
                                 pathname === "/" && "pointer-events-none"
                              }`}
                           >
                              David Ilie
                           </Link>
                        )}
                     </div>
                     <div className="hidden sm:block">
                        <div className="mt-6 ml-10 flex items-baseline gap-4">
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
                                         } rounded-md bg-gray-600 px-3 py-2 text-sm font-medium text-white duration-200 dark:bg-gray-800`
                                       : "cursor-pointertext-gray-900 cursor-pointer rounded-md px-3 py-2 text-sm font-medium duration-200 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-900 dark:hover:text-white"
                                 }
                              >
                                 {page.name}
                              </Link>
                           ))}
                        </div>
                     </div>
                  </div>
                  <div className="mt-8 ml-10 hidden space-x-4 sm:block">
                     <Dropdown />
                  </div>
                  <div className="block sm:hidden">
                     <div className="mt-6 -mr-2 flex items-center md:hidden">
                        <div className="mt-1.5 mr-5">
                           <Dropdown />
                        </div>
                        <button
                           type="button"
                           className="inline-flex items-center justify-center rounded-md bg-gray-200 p-2 text-gray-500 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                           onClick={() => {
                              setClickMobileMenu(!clickMobileMenu);
                           }}
                        >
                           {clickMobileMenu ? (
                              <svg
                                 className="block h-6 w-6"
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
                                 className="block h-6 w-6"
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
                  <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
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
                                   } block rounded-md bg-cyan-600 px-3 py-2 text-base font-medium text-white dark:bg-gray-900`
                                 : "block cursor-pointer rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-cyan-800 hover:text-white dark:text-gray-300 dark:hover:bg-cyan-900"
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
