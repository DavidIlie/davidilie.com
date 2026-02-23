"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import { SplitText } from "~/components/split-text";
import { Button } from "~/components/ui/button";

const Header: React.FC = () => {
   const [headerVisible, setHeaderVisible] = useState(false);
   const [metricsVisible, setMetricsVisible] = useState(false);

   useEffect(() => {
      setTimeout(() => {
         setHeaderVisible(true);
      }, 100);
      setTimeout(() => {
         setMetricsVisible(true);
      }, 200);
   }, []);

   const fadeIn = {
      hidden: { opacity: 0, y: 20 },
      show: {
         opacity: 1,
         y: 0,
         transition: {
            duration: 0.6,
            ease: "easeOut",
         },
      },
   };

   const scrollDown = () => {
      window.scrollTo({
         top: window.innerHeight * 0.8,
         behavior: "smooth",
      });
   };
   return (
      <div className="relative mt-32 flex min-h-[80vh] flex-grow items-center justify-center px-4 text-center sm:mt-24">
         <div className="mx-auto mt-5 sm:max-w-5xl">
            <div className="relative">
               <AnimatePresence>
                  <div className="mb-6">
                     <SplitText
                        //@ts-ignore
                        initial={{ y: "100%" }}
                        animate="visible"
                        className="text-xl font-medium text-gray-600 dark:text-gray-300 md:text-3xl"
                        variants={{
                           //@ts-ignore
                           visible: (i: number) => ({
                              y: 0,
                              transition: {
                                 delay: i * 0.05,
                              },
                           }),
                        }}
                     >
                        Your videos deserve
                     </SplitText>
                  </div>
               </AnimatePresence>
               <AnimatePresence>
                  <div className="mb-8">
                     {headerVisible && (
                        <SplitText
                           //@ts-ignore
                           initial={{ y: "100%" }}
                           animate="visible"
                           className="gradient-text text-4xl font-bold tracking-tight md:text-8xl"
                           variants={{
                              //@ts-ignore
                              visible: (i: number) => ({
                                 y: 0,
                                 transition: {
                                    delay: i * 0.08,
                                 },
                              }),
                           }}
                        >
                           PROFESSIONAL EDITING
                        </SplitText>
                     )}
                  </div>
               </AnimatePresence>
               <AnimatePresence>
                  <div className="mb-12">
                     {metricsVisible && (
                        <motion.div
                           variants={fadeIn}
                           initial="hidden"
                           animate="show"
                        >
                           <div className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300 md:text-2xl">
                              <p className="mb-4 leading-relaxed">
                                 <span className="font-semibold text-blue-600 dark:text-blue-400">
                                    7+ years
                                 </span>{" "}
                                 of crafting videos that captivate. Trusted by
                                 creators with{" "}
                                 <span className="font-bold text-blue-600 dark:text-blue-400">
                                    millions of subscribers
                                 </span>
                                 .
                              </p>
                              <p className="text-base text-gray-500 dark:text-gray-400">
                                 Fast delivery • Professional quality •
                                 Europe-based
                              </p>
                           </div>
                        </motion.div>
                     )}
                  </div>
               </AnimatePresence>
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
               >
                  <div className="mb-12 flex flex-col justify-center gap-4 sm:flex-row">
                     <Button
                        asChild
                        size="lg"
                        className="bg-blue-600 px-8 py-3 text-lg text-white hover:bg-blue-700"
                     >
                        <Link href="mailto:david@davidilie.com">
                           Get a Quote
                        </Link>
                     </Button>
                     <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="border-2 border-blue-600 px-8 py-3 text-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                     >
                        <Link href="#portfolio">See My Work</Link>
                     </Button>
                  </div>
               </motion.div>
            </div>
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.6, duration: 0.8 }}
            >
               <div
                  className="mb-4 flex cursor-pointer flex-col items-center text-gray-400 transition-colors duration-300 hover:text-blue-500 dark:text-gray-500 sm:mb-0"
                  onClick={scrollDown}
               >
                  <p className="mb-3 text-sm font-medium tracking-wide">
                     DISCOVER MORE
                  </p>
                  <div className="flex flex-col items-center">
                     <div className="mb-2 h-8 w-0.5 bg-gradient-to-b from-gray-300 to-transparent dark:from-gray-600"></div>
                     <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{
                           duration: 2,
                           repeat: Infinity,
                           ease: "easeInOut",
                        }}
                     >
                        <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-current">
                           <div className="h-1 w-1 rounded-full bg-current"></div>
                        </div>
                     </motion.div>
                  </div>
               </div>
            </motion.div>
         </div>
         <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-10 top-20 h-32 w-32 rounded-full bg-blue-500/5 blur-xl"></div>
            <div className="absolute bottom-20 right-20 h-48 w-48 rounded-full bg-purple-500/5 blur-xl"></div>
            <div className="absolute left-1/4 top-1/2 h-24 w-24 rounded-full bg-cyan-500/5 blur-lg"></div>
         </div>
      </div>
   );
};

export default Header;
