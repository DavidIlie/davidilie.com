"use client";

import React from "react";
import Link from "next/link";
import { motion, type Variants } from "motion/react";

import { Button } from "~/components/ui/button";

const ease = [0.23, 1, 0.32, 1] as const;

const container: Variants = {
   hidden: { opacity: 0 },
   show: {
      opacity: 1,
      transition: {
         staggerChildren: 0.09,
         delayChildren: 0.1,
      },
   },
};

const item: Variants = {
   hidden: { opacity: 0, y: 24, filter: "blur(12px)" },
   show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease },
   },
};

const Header: React.FC = () => {
   return (
      <section className="relative flex min-h-[85vh] flex-grow items-center justify-center overflow-hidden px-4 text-center">
         {/* Ambient glow */}
         <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
         >
            <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-[120px]" />
         </div>

         <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="relative mx-auto max-w-4xl"
         >
            <motion.p
               variants={item}
               className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground sm:text-sm"
            >
               Your viewers stop watching at 0:15
            </motion.p>

            <motion.h1
               variants={item}
               className="mb-8 text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl"
            >
               Let&apos;s fix
               <br />
               <span className="text-brand">that.</span>
            </motion.h1>

            <motion.p
               variants={item}
               className="mx-auto mb-10 max-w-xl text-base text-muted-foreground sm:text-lg"
            >
               The best cuts are the ones nobody notices.
            </motion.p>

            <motion.div
               variants={item}
               className="flex flex-col justify-center gap-3 sm:flex-row"
            >
               <Button
                  asChild
                  size="lg"
                  className="bg-brand px-7 text-brand-foreground hover:bg-brand/90"
               >
                  <Link href="mailto:david@davidilie.com?subject=Editing%20project">
                     Send the footage
                  </Link>
               </Button>
               <Button asChild size="lg" variant="outline" className="px-7">
                  <Link href="#portfolio">Watch the work first</Link>
               </Button>
            </motion.div>
         </motion.div>
      </section>
   );
};

export default Header;
