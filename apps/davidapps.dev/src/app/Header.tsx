"use client";

import React, { useState, useEffect } from "react";
import { Fade } from "react-awesome-reveal";

import { SplitText } from "./components/SplitText";
import ScrollDown from "./components/ScrollDown";

const Header: React.FC = () => {
   const [secondVisible, setSecondVisible] = useState<boolean>(false);

   useEffect(() => {
      setTimeout(() => {
         setSecondVisible(true);
      }, 600);
   }, []);

   return (
      <div className="text-center">
         <div>
            {" "}
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
                  className="text-xl font-medium"
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
         <Fade delay={750} duration={750}>
            <div className="mt-[60%] flex w-full justify-center">
               <ScrollDown />
            </div>
         </Fade>
      </div>
   );
};

export default Header;
