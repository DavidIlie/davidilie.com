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
         setTop(window.scrollY <= 10);
      };
      window.addEventListener("scroll", scrollHandler, { passive: true });
      return () => window.removeEventListener("scroll", scrollHandler);
   }, []);

   const [clickMobileMenu, setClickMobileMenu] = useState<boolean>(false);

   return (
      <nav
         className={`fixed z-50 w-full pb-4 backdrop-blur-lg backdrop-filter duration-300 ${
            !top
               ? "bg-card/60 shadow-sm hover:bg-card/80"
               : ""
         }`}
      >
         {isBlogPage && (
            <div className="absolute w-full">
               <div className="relative">
                  <div className="flex h-1 overflow-hidden text-xs">
                     <div
                        style={{
                           width: `${width}%`,
                           backgroundColor: "var(--brand)",
                        }}
                        className={`flex flex-col justify-center whitespace-nowrap text-center shadow-none ${
                           width > 99 ? "duration-200" : ""
                        }`}
                     ></div>
                  </div>
               </div>
            </div>
         )}
         <div
            className={clickMobileMenu ? "bg-card/50" : ""}
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
                              className={`cursor-pointer text-3xl font-semibold text-foreground ${
                                 pathname === "/" ? "pointer-events-none" : ""
                              }`}
                           >
                              David Ilie
                           </Link>
                        )}
                     </div>
                     <div className="hidden gap-3 sm:flex">
                        {pages.map((page, index) => {
                           const isActive =
                              page.url === "/"
                                 ? pathname === "/"
                                 : pathname.startsWith(page.url);
                           const isExact = pathname === page.url;
                           return (
                              <Link
                                 href={page.url}
                                 key={index}
                                 className={cn(
                                    isExact && "pointer-events-none",
                                 )}
                              >
                                 <Button
                                    variant={isActive ? "secondary" : "link"}
                                    disabled={isExact}
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
               <div className="min-h-[50vh] text-center md:hidden">
                  <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                     {pages.map((page, index) => (
                        <Link
                           href={page.url}
                           key={index}
                           onClick={() => setClickMobileMenu(false)}
                           className={
                              (page.url === "/" ? pathname === "/" : pathname.startsWith(page.url))
                                 ? `${
                                      !(isBlogPage && page.name === "Blog")
                                         ? "cursor-pointer"
                                         : ""
                                   } block rounded-md bg-brand px-3 py-2 text-base font-medium text-brand-foreground`
                                 : "block cursor-pointer rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-brand/80 hover:text-brand-foreground"
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
