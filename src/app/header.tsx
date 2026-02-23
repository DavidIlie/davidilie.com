"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Socials } from "~/components/socials";
import { SplitText } from "../components/split-text";

const Header: React.FC = () => {
   const [secondVisible, setSecondVisible] = useState(false);
   const [thirdVisible, setThirdVisible] = useState(false);
   const [name, setName] = useState("I'm David Ilie");

   useEffect(() => {
      setTimeout(() => {
         setSecondVisible(true);
         setTimeout(() => {
            setThirdVisible(true);
         }, 500);
      }, 500);

      const handleResize = () => {
         const w = window.innerWidth;
         setName(w > 500 ? "I'm David Ilie" : "I'm David");
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
   }, []);
   const fadeIn = {
      hidden: { opacity: 0 },
      show: {
         opacity: 1,
         transition: {
            delay: 0.5,
         },
      },
   };

   return (
      <div className="relative flex min-h-screen flex-grow items-center justify-center px-4 text-center">
         <div className="mt-5">
            <AnimatePresence>
               <div className="h-10 text-center">
                  <SplitText
                     //@ts-ignore
                     initial={{ y: "100%" }}
                     animate="visible"
                     className="text-4xl"
                     variants={{
                        //@ts-ignore
                        visible: (i) => ({
                           y: 0,
                           transition: {
                              delay: i * 0.1,
                           },
                        }),
                     }}
                  >
                     Hello There!
                  </SplitText>
               </div>
            </AnimatePresence>
            <AnimatePresence>
               <div className="mt-2">
                  {secondVisible ? (
                     <SplitText
                        //@ts-ignore
                        initial={{ y: "100%" }}
                        animate="visible"
                        className="gradient-text visible text-5xl font-semibold sm:text-7xl"
                        variants={{
                           //@ts-ignore
                           visible: (i) => ({
                              y: 0,
                              transition: {
                                 delay: i * 0.25,
                              },
                           }),
                        }}
                     >
                        {name}
                     </SplitText>
                  ) : (
                     <h1 className="invisible text-5xl font-semibold sm:text-7xl">
                        {name}
                     </h1>
                  )}
               </div>
            </AnimatePresence>
            <AnimatePresence>
               <div className="mt-4">
                  {thirdVisible ? (
                     <motion.div
                        variants={fadeIn}
                        initial="hidden"
                        animate="show"
                     >
                        <Socials
                           className="flex w-full justify-center"
                           font="1.75"
                           invisible={false}
                        />
                     </motion.div>
                  ) : (
                     <Socials
                        className="flex w-full justify-center"
                        invisible
                        font="1.75"
                     />
                  )}
               </div>
            </AnimatePresence>
         </div>
         <AnimatePresence>
            {thirdVisible && (
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
               >
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                     <div className="flex flex-col items-center text-gray-400 dark:text-gray-500">
                        <span className="mb-2 text-[10px] font-medium uppercase tracking-widest">
                           Scroll
                        </span>
                        <motion.div
                           animate={{ y: [0, 6, 0] }}
                           transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                           }}
                        >
                           <div className="flex h-6 w-4 items-start justify-center rounded-full border-2 border-current pt-1">
                              <div className="h-1 w-1 rounded-full bg-current" />
                           </div>
                        </motion.div>
                     </div>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};

export default Header;
