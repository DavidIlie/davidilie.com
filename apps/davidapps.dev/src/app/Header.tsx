"use client";

import React from "react";

import { SplitText } from "./components/SplitText";

const Header: React.FC = () => {
   return (
      <div>
         <SplitText
            //@ts-ignore
            initial={{ y: "100%" }}
            animate="visible"
            className="text-3xl font-bold text-center sm:text-5xl gradient-text"
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
   );
};

export default Header;
