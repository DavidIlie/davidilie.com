"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";

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

const sideLinks = [
   { name: "Editing", url: "/editing-portfolio" },
   { name: "Developer", url: "/developer-portfolio" },
   { name: "Email", url: "mailto:david@davidilie.com" },
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

   const [open, setOpen] = useState<boolean>(false);

   // Close on route change
   useEffect(() => {
      setOpen(false);
   }, [pathname]);

   // Lock body scroll + escape-to-close while overlay is open
   useEffect(() => {
      if (!open) return;
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
         if (e.key === "Escape") setOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
         document.body.style.overflow = original;
         window.removeEventListener("keydown", onKey);
      };
   }, [open]);

   return (
      <>
         <nav
            className={cn(
               "fixed z-50 w-full pb-4 backdrop-blur-lg backdrop-filter duration-300",
               !top && !open ? "bg-card/60 shadow-sm hover:bg-card/80" : "",
            )}
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
                           className={cn(
                              "flex flex-col justify-center text-center whitespace-nowrap shadow-none",
                              width > 99 ? "duration-200" : "",
                           )}
                        />
                     </div>
                  </div>
               </div>
            )}
            <div className="mx-auto -mt-1 flex h-16 max-w-7xl items-center justify-between px-4 pt-2 sm:px-6 lg:px-8">
               <div className="flex items-center gap-10">
                  <div className="flex-shrink-0">
                     <AnimatedName />
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
                              prefetch={true}
                              className={cn(isExact && "pointer-events-none")}
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
               <div className="hidden sm:block">
                  <ThemeDropdown />
               </div>
               <div className="flex items-center gap-2 sm:hidden">
                  <ThemeDropdown />
                  <Button
                     onClick={() => setOpen((v) => !v)}
                     variant="secondary"
                     aria-label={open ? "Close menu" : "Open menu"}
                     aria-expanded={open}
                     aria-controls="mobile-menu"
                  >
                     {open ? <X /> : <Menu />}
                  </Button>
               </div>
            </div>
         </nav>

         {open && (
            <div
               id="mobile-menu"
               role="dialog"
               aria-modal="true"
               aria-label="Mobile navigation"
               className="nav-sheet fixed inset-0 z-40 flex flex-col bg-background/95 px-6 pt-24 pb-10 backdrop-blur-xl sm:hidden"
            >
               <ul className="flex flex-col gap-1">
                  {pages.map((page, index) => {
                     const isActive =
                        page.url === "/"
                           ? pathname === "/"
                           : pathname.startsWith(page.url);
                     return (
                        <li
                           key={page.url}
                           className="nav-item"
                           style={{
                              animationDelay: `${60 + index * 40}ms`,
                           }}
                        >
                           <Link
                              href={page.url}
                              prefetch={true}
                              onClick={() => setOpen(false)}
                              className={cn(
                                 "flex items-baseline justify-between rounded-2xl px-4 py-4 font-display text-3xl font-semibold tracking-tight transition-colors",
                                 isActive
                                    ? "bg-brand text-brand-foreground"
                                    : "text-foreground/90 hover:bg-muted/60 active:scale-[0.99]",
                              )}
                           >
                              <span>{page.name}</span>
                              <span
                                 className={cn(
                                    "font-mono text-[0.65rem] tracking-[0.2em] uppercase",
                                    isActive
                                       ? "text-brand-foreground/70"
                                       : "text-muted-foreground/60",
                                 )}
                              >
                                 0{index + 1}
                              </span>
                           </Link>
                        </li>
                     );
                  })}
               </ul>

               <div
                  className="nav-item mt-auto pt-10"
                  style={{ animationDelay: `${60 + pages.length * 40 + 40}ms` }}
               >
                  <p className="mb-3 font-mono text-[0.65rem] tracking-[0.2em] text-muted-foreground/70 uppercase">
                     Elsewhere
                  </p>
                  <ul className="flex flex-col gap-2">
                     {sideLinks.map((link) => {
                        const external = link.url.startsWith("mailto:");
                        return (
                           <li key={link.url}>
                              <Link
                                 href={link.url}
                                 onClick={() => setOpen(false)}
                                 className="flex items-center justify-between rounded-xl px-4 py-3 text-base text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
                              >
                                 <span>{link.name}</span>
                                 <ArrowUpRight
                                    className={cn(
                                       "h-4 w-4",
                                       external && "rotate-0",
                                    )}
                                 />
                              </Link>
                           </li>
                        );
                     })}
                  </ul>
               </div>
            </div>
         )}
      </>
   );
};

export default NavBar;
