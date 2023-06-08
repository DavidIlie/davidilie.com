"use client";

import React, { useState, useEffect } from "react";
import { Slide, Fade } from "react-awesome-reveal";

import { SplitText } from "./components/SplitText";
import ScrollDown from "./components/ScrollDown";

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
                     <span className="absolute text-3xl -right-6 -top-4">
                        🇪🇸
                     </span>
                  </Slide>
               )}
               <SplitText
                  //@ts-ignore
                  initial={{ y: "100%" }}
                  animate="visible"
                  className="text-3xl font-bold sm:text-5xl gradient-text"
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
                  <p className="h-9 insisible"></p>
               )}
            </div>
            <Fade delay={750} duration={750} triggerOnce>
               <div className="flex justify-center w-full mt-6">
                  <ScrollDown />
               </div>
            </Fade>
         </div>
      </div>
   );
};

export default Header;
