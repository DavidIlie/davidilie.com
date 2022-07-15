import React from "react";
import { motion } from "framer-motion";

const SplitText = ({ children, ...rest }: { children: any }) => {
   let words = children.split(" ");
   return words.map((word: string, i: number) => {
      return (
         <div
            key={children + i}
            style={{ display: "inline-block", overflow: "hidden" }}
         >
            <motion.div
               {...rest}
               style={{
                  display: "inline-block",
                  willChange: "transform",
               }}
               custom={i}
            >
               {word + (i !== words.length - 1 ? "\u00A0" : "")}
            </motion.div>
         </div>
      );
   });
};

export default SplitText;
