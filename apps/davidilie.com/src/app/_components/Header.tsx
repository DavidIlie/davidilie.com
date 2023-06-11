"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Socials, SplitText } from "ui";

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
      <div className="flex items-center justify-center flex-grow min-h-screen px-4 text-center">
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
                        className="visible font-semibold text-7xl gradient-text"
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
                     <h1 className="invisible font-semibold text-7xl">
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
                        <Socials font="1.75" invisible={false} />
                     </motion.div>
                  ) : (
                     <Socials invisible font="1.75" />
                  )}
               </div>
            </AnimatePresence>
         </div>
      </div>
   );
};

export default Header;
