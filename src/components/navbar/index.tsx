"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { cn } from "~/lib/utils";

import useScrollPosition from "~/hooks/use-scroll-position";
import { Button } from "../ui/button";
import AnimatedName from "./animated-name";
import ThemeDropdown from "./theme-dropdown";

const pages = [
   { name: "Home", url: "/" },
   { name: "Blog", url: "/blog" },
   { name: "Projects", url: "/projects" },
   { name: "Music", url: "/music" },
];

const NavBar: React.FC = () => {
   const { y, max } = useScrollPosition();
   const pathname = usePathname();
   const params = useParams();

   const [width, setWidth] = useState(0);

   const isBlogPage = !!params?.slug;

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
                  <div className="mt-6 flex items-center gap-10">
                     <div className="flex-shrink-0">
                        {!clickMobileMenu ? (
                           <AnimatedName />
                        ) : (
                           <Link
                              href="/"
                              className={`cursor-pointer text-3xl font-semibold text-black dark:text-white ${
                                 pathname === "/" && "pointer-events-none"
                              }`}
                           >
                              David Ilie
                           </Link>
                        )}
                     </div>
                     <div className="hidden gap-3 sm:flex">
                        {pages.map((page, index) => {
                           const selected = pathname === page.url;
                           return (
                              <Link
                                 href={page.url}
                                 key={index}
                                 className={cn(
                                    selected && "pointer-events-none",
                                 )}
                              >
                                 <Button
                                    variant={selected ? "secondary" : "link"}
                                    disabled={selected}
                                 >
                                    {page.name}
                                 </Button>
                              </Link>
                           );
                        })}
                     </div>
                  </div>
                  <div className="ml-10 mt-8 hidden space-x-4 sm:block">
                     <ThemeDropdown />
                  </div>
                  <div className="block sm:hidden">
                     <div className="-mr-2 mt-6 flex items-center gap-2 md:hidden">
                        <ThemeDropdown />
                        <Button
                           onClick={() => {
                              setClickMobileMenu(!clickMobileMenu);
                           }}
                           variant="secondary"
                        >
                           {clickMobileMenu ? <X /> : <Menu />}
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
            {clickMobileMenu && (
               <div className="h-screen text-center md:hidden">
                  <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                     {pages.map((page, index) => (
                        <Link
                           href={page.url}
                           key={index}
                           onClick={() => setClickMobileMenu(false)}
                           className={
                              pathname === page.url
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
