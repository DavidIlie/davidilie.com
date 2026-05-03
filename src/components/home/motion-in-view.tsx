"use client";

import React from "react";
import {
   motion,
   useReducedMotion,
   type Variants,
} from "motion/react";

const ease = [0.23, 1, 0.32, 1] as const;

const fadeUp: Variants = {
   hidden: { opacity: 0, y: 14 },
   visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease },
   },
};

const staggerWrap: Variants = {
   hidden: {},
   visible: {},
};

/**
 * Single block that fades up when scrolled into view. Cheap, polite
 * motion for sections that don't deserve their own choreography.
 */
export const FadeUpInView: React.FC<{
   children: React.ReactNode;
   delay?: number;
   className?: string;
}> = ({ children, delay = 0, className }) => {
   const reduceMotion = useReducedMotion();
   if (reduceMotion) return <div className={className}>{children}</div>;
   return (
      <motion.div
         className={className}
         initial="hidden"
         whileInView="visible"
         viewport={{ once: true, margin: "-60px" }}
         transition={{ delay }}
         variants={fadeUp}
      >
         {children}
      </motion.div>
   );
};

/**
 * Parent that orchestrates a stagger across <StaggerItem /> children.
 */
export const StaggerInView: React.FC<{
   children: React.ReactNode;
   className?: string;
   delayChildren?: number;
   staggerChildren?: number;
}> = ({
   children,
   className,
   delayChildren = 0.05,
   staggerChildren = 0.06,
}) => {
   const reduceMotion = useReducedMotion();
   if (reduceMotion) return <div className={className}>{children}</div>;
   return (
      <motion.div
         className={className}
         initial="hidden"
         whileInView="visible"
         viewport={{ once: true, margin: "-60px" }}
         variants={{
            hidden: staggerWrap.hidden,
            visible: {
               transition: { delayChildren, staggerChildren },
            },
         }}
      >
         {children}
      </motion.div>
   );
};

export const StaggerItem: React.FC<{
   children: React.ReactNode;
   className?: string;
}> = ({ children, className }) => {
   const reduceMotion = useReducedMotion();
   if (reduceMotion) return <div className={className}>{children}</div>;
   return (
      <motion.div className={className} variants={fadeUp}>
         {children}
      </motion.div>
   );
};
