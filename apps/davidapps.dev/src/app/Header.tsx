"use client";

import React, { useEffect, useState } from "react";
import { Fade, Slide } from "react-awesome-reveal";

import { SplitText } from "@david/ui";

import ScrollDown from "~/components/ScrollDown";

const Header: React.FC<{ showSpain: boolean }> = ({ showSpain }) => {
   const [secondVisible, setSecondVisible] = useState<boolean>(false);

   useEffect(() => {
      setTimeout(() => {
         setSecondVisible(true);
      }, 600);
   }, []);

   return (
      <div className="flex items-center text-center">
         <div>
            <div className="relative">
               {showSpain && (
                  <Slide direction="right" triggerOnce delay={300}>
                     <span className="absolute -right-6 -top-4 text-3xl">
                        🇪🇸
                     </span>
                  </Slide>
               )}
               <SplitText
                  //@ts-ignore
                  initial={{ y: "100%" }}
                  animate="visible"
                  className="gradient-text text-3xl font-bold sm:text-5xl"
                  variants={{
                     //@ts-ignore
                     visible: (i) => ({
                        y: 0,
                        transition: {
                           delay: i * 0.15,
                        },
                     }),
                  }}
               >
                  David Ilie Apps Platform
               </SplitText>
            </div>
            <div>
               {secondVisible ? (
                  <SplitText
                     //@ts-ignore
                     initial={{ y: "100%" }}
                     animate="visible"
                     className="text-lg font-medium sm:text-xl"
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
                     My own personal CLOUD
                  </SplitText>
               ) : (
                  <p className="insisible h-9"></p>
               )}
            </div>
            <Fade delay={750} duration={750} triggerOnce>
               <div className="mt-6 flex w-full justify-center">
                  <ScrollDown />
               </div>
            </Fade>
         </div>
      </div>
   );
};

export default Header;
