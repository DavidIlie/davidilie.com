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

      const width = window.innerWidth;
      if (width > 500) {
         setName("I'm David Ilie");
      } else {
         setName("I'm David");
      }

      window.addEventListener("resize", () => {
         const width = window.innerWidth;
         if (width > 500) {
            setName("I'm David Ilie");
         } else {
            setName("I'm David");
         }
      });
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
      <div className="flex min-h-screen flex-grow items-center justify-center px-4 text-center">
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
                        className="gradient-text visible text-7xl font-semibold"
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
                     <h1 className="invisible text-7xl font-semibold">
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
      </div>
   );
};

export default Header;
