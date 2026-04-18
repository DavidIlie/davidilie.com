"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
   AnimatePresence,
   motion,
   useInView,
   useReducedMotion,
   type Variants,
} from "motion/react";
import {
   Check,
   Code2,
   Eye,
   Mail,
   Rocket,
   Sparkles,
} from "lucide-react";

const ease = [0.23, 1, 0.32, 1] as const;

type Day = {
   id: number;
   day: string;
   label: string;
   icon: React.ElementType;
   title: string;
   body: string;
   visual: "email" | "commit" | "staging" | "polish" | "ship";
};

const days: Day[] = [
   {
      id: 0,
      day: "Monday",
      label: "Day 1",
      icon: Mail,
      title: "Your email hits my inbox",
      body: "Two sentences about what you want, links to anything you like. I reply with a price and a start date, same day. No SOW, no discovery call unless you want one.",
      visual: "email",
   },
   {
      id: 1,
      day: "Tuesday",
      label: "Day 2",
      icon: Code2,
      title: "First commit on main",
      body: "No kickoff theater. Repo goes up, Next.js + Tailwind scaffolded, GitHub invite in your inbox. You can watch the commits land in real time.",
      visual: "commit",
   },
   {
      id: 2,
      day: "Thursday",
      label: "Day 4",
      icon: Eye,
      title: "Staging URL to click around",
      body: "Real preview on a staging URL. Click everything, break it if you can, leave Loom feedback. First round of fixes is usually same-day.",
      visual: "staging",
   },
   {
      id: 3,
      day: "Saturday",
      label: "Day 6",
      icon: Sparkles,
      title: "The details that sell",
      body: "Micro-interactions, loading states, hover feedback, the stuff you only notice when it's missing. I care about this part more than I probably should.",
      visual: "polish",
   },
   {
      id: 4,
      day: "Sunday",
      label: "Day 7",
      icon: Rocket,
      title: "Live. Repo yours. Done.",
      body: "Domain pointing. Repo transferred to your GitHub. Deployment handed over. Loom walkthrough of everything. You never need me again.",
      visual: "ship",
   },
];

const AUTOPLAY_MS = 4000;

export const Timeline = () => {
   const reduceMotion = useReducedMotion();
   const rootRef = useRef<HTMLDivElement>(null);
   const inView = useInView(rootRef, { amount: 0.25, once: false });
   const [active, setActive] = useState(0);
   const [paused, setPaused] = useState(false);
   const [touched, setTouched] = useState(false);
   const day = days[active];

   const next = useCallback(() => {
      setActive((i) => (i + 1) % days.length);
   }, []);

   useEffect(() => {
      if (!inView || paused || reduceMotion) return;
      const t = setTimeout(next, AUTOPLAY_MS);
      return () => clearTimeout(t);
   }, [active, inView, paused, reduceMotion, next]);

   useEffect(() => {
      if (inView && !touched) setTouched(true);
   }, [inView, touched]);

   return (
      <div
         ref={rootRef}
         className="overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-card/80 via-card/40 to-muted/30"
         onMouseEnter={() => setPaused(true)}
         onMouseLeave={() => setPaused(false)}
         onFocus={() => setPaused(true)}
      >
         {/* Tab rail */}
         <div className="border-b border-border/60 bg-background/40 backdrop-blur-sm">
            <div className="flex gap-1 overflow-x-auto p-2 sm:gap-2 sm:p-3">
               {days.map((d, i) => {
                  const Icon = d.icon;
                  const isActive = active === d.id;
                  return (
                     <button
                        key={d.id}
                        onClick={() => setActive(d.id)}
                        className="relative flex-shrink-0 rounded-xl px-3 py-2.5 text-left transition-colors sm:flex-1 sm:px-4 sm:py-3"
                     >
                        {isActive && (
                           <motion.span
                              layoutId="active-day"
                              className="absolute inset-0 rounded-xl border border-brand/30 bg-brand-muted"
                              transition={{
                                 type: "spring",
                                 stiffness: 380,
                                 damping: 32,
                              }}
                           />
                        )}
                        <span className="relative flex items-center gap-2.5">
                           <Icon
                              className={`h-4 w-4 shrink-0 ${
                                 isActive
                                    ? "text-brand"
                                    : "text-muted-foreground"
                              }`}
                           />
                           <span className="flex flex-col">
                              <span
                                 className={`font-mono text-[0.65rem] uppercase tracking-wider ${
                                    isActive
                                       ? "text-brand"
                                       : "text-muted-foreground/70"
                                 }`}
                              >
                                 {d.label}
                              </span>
                              <span
                                 className={`text-xs font-medium sm:text-sm ${
                                    isActive
                                       ? "text-foreground"
                                       : "text-muted-foreground"
                                 }`}
                              >
                                 {d.day}
                              </span>
                           </span>
                        </span>
                        {/* Progress bar for active */}
                        {isActive && !reduceMotion && (
                           <motion.span
                              key={`progress-${active}-${paused}`}
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: paused ? 0 : 1 }}
                              transition={{
                                 duration: paused ? 0 : AUTOPLAY_MS / 1000,
                                 ease: "linear",
                              }}
                              className="absolute bottom-1 left-2 right-2 h-0.5 origin-left rounded-full bg-brand/60"
                           />
                        )}
                        <span className="sr-only">
                           Switch to {d.label}: {d.title}
                        </span>
                     </button>
                  );
               })}
            </div>
         </div>

         {/* Panel */}
         <div className="grid gap-0 md:grid-cols-[1fr_1.1fr]">
            {/* Text */}
            <div className="flex flex-col justify-center p-8 sm:p-12 md:p-14">
               <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                     key={day.id}
                     initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                     animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                     exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                     transition={{ duration: 0.35, ease }}
                  >
                     <div className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-brand">
                        {day.label} &middot; {day.day}
                     </div>
                     <h3 className="mb-5 text-3xl font-bold leading-[1.05] sm:text-4xl md:text-[2.75rem]">
                        {day.title}
                     </h3>
                     <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                        {day.body}
                     </p>
                  </motion.div>
               </AnimatePresence>
            </div>

            {/* Visual */}
            <div className="relative flex min-h-[380px] items-center justify-center overflow-hidden border-t border-border/60 bg-gradient-to-br from-muted/40 via-background/60 to-muted/20 p-8 sm:min-h-[440px] sm:p-10 md:border-l md:border-t-0">
               <AnimatePresence mode="wait" initial={false}>
                  {touched && (
                     <motion.div
                        key={day.visual}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3, ease }}
                        className="w-full max-w-md"
                     >
                        {day.visual === "email" && <EmailVisual />}
                        {day.visual === "commit" && <CommitVisual />}
                        {day.visual === "staging" && <StagingVisual />}
                        {day.visual === "polish" && <PolishVisual />}
                        {day.visual === "ship" && <ShipVisual />}
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>
         </div>
      </div>
   );
};

/* ---------- VISUALS ---------- */

const WindowChrome = ({ children }: { children: React.ReactNode }) => (
   <div className="overflow-hidden rounded-xl border border-border/80 bg-card shadow-lg shadow-black/5">
      <div className="flex items-center gap-1.5 border-b border-border/60 bg-muted/60 px-3 py-2.5">
         <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
         <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
         <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/20" />
      </div>
      {children}
   </div>
);

const lineStagger: Variants = {
   hidden: { opacity: 1 },
   show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
   },
};
const lineItem: Variants = {
   hidden: { opacity: 0, y: 6 },
   show: { opacity: 1, y: 0, transition: { duration: 0.3, ease } },
};

const EmailVisual = () => (
   <WindowChrome>
      <motion.div
         variants={lineStagger}
         initial="hidden"
         animate="show"
         className="space-y-3 p-5"
      >
         <motion.div
            variants={lineItem}
            className="flex items-center gap-2 text-xs text-muted-foreground"
         >
            <span className="font-mono">From:</span>
            <span className="rounded bg-muted px-1.5 py-0.5 text-foreground">
               you@company.com
            </span>
         </motion.div>
         <motion.div variants={lineItem} className="text-sm font-semibold">
            Website for our new product
         </motion.div>
         <motion.div variants={lineItem} className="h-px bg-border/70" />
         <motion.p
            variants={lineItem}
            className="text-xs leading-relaxed text-muted-foreground"
         >
            Hey David — we need a landing page for our launch.
         </motion.p>
         <motion.p
            variants={lineItem}
            className="text-xs leading-relaxed text-muted-foreground"
         >
            Hero + features + pricing + waitlist form. Similar vibe to{" "}
            <span className="text-brand">linear.app</span>.
         </motion.p>
         <motion.div variants={lineItem} className="pt-2">
            <motion.div
               initial={{ width: 0 }}
               animate={{ width: "auto" }}
               transition={{ delay: 1.1, duration: 0.6, ease }}
               className="inline-flex items-center gap-1.5 overflow-hidden whitespace-nowrap rounded-md bg-brand-muted px-2.5 py-1 text-[0.7rem] font-medium text-brand"
            >
               <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.4, type: "spring", stiffness: 400 }}
               >
                  <Check className="h-3 w-3" />
               </motion.span>
               Quote sent in 4h 12m
            </motion.div>
         </motion.div>
      </motion.div>
   </WindowChrome>
);

const commits = [
   { hash: "a1b3f0e", msg: "chore: init next 16 + tailwind v4" },
   { hash: "9c7d2a1", msg: "feat: hero section w/ stagger motion" },
   { hash: "3f88e4c", msg: "feat: pricing cards + stripe stub" },
   { hash: "71e0b5d", msg: "fix: mobile nav focus trap" },
];

const CommitVisual = () => (
   <WindowChrome>
      <div className="bg-card p-4 font-mono text-[0.7rem]">
         <motion.div
            variants={lineStagger}
            initial="hidden"
            animate="show"
            className="space-y-2"
         >
            {commits.map((c) => (
               <motion.div
                  key={c.hash}
                  variants={lineItem}
                  className="flex items-start gap-2.5"
               >
                  <span className="text-brand">●</span>
                  <span className="text-muted-foreground">{c.hash}</span>
                  <span className="flex-1 text-foreground/90">{c.msg}</span>
               </motion.div>
            ))}
            <motion.div
               variants={lineItem}
               className="flex items-center gap-2 pt-2 text-muted-foreground"
            >
               <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{
                     duration: 1.2,
                     repeat: Infinity,
                     ease: "easeInOut",
                  }}
                  className="text-foreground"
               >
                  _
               </motion.span>
            </motion.div>
         </motion.div>
      </div>
   </WindowChrome>
);

const StagingVisual = () => (
   <WindowChrome>
      <div className="bg-background/60 p-3">
         <div className="mb-3 flex items-center gap-2 rounded-md border border-border/60 bg-muted/50 px-2.5 py-1.5 text-[0.65rem] font-mono text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            <span>
               yoursite.<span className="text-brand">davidapps.dev</span>
            </span>
         </div>
         <div className="space-y-2">
            <motion.div
               initial={{ opacity: 0, y: 8 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3, duration: 0.4, ease }}
               className="h-16 rounded-lg bg-gradient-to-br from-brand/30 to-brand/10"
            />
            <div className="grid grid-cols-3 gap-2">
               {[0, 1, 2].map((i) => (
                  <motion.div
                     key={i}
                     initial={{ opacity: 0, y: 8 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{
                        delay: 0.5 + i * 0.1,
                        duration: 0.4,
                        ease,
                     }}
                     className="h-12 rounded-md bg-muted/80"
                  />
               ))}
            </div>
            <motion.div
               initial={{ opacity: 0, y: 8 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.9, duration: 0.4, ease }}
               className="h-8 rounded-md bg-muted/60"
            />
            {/* cursor */}
            <motion.div
               initial={{ x: -20, y: -40, opacity: 0 }}
               animate={{ x: 90, y: -30, opacity: [0, 1, 1, 1, 0] }}
               transition={{
                  delay: 1.2,
                  duration: 1.8,
                  times: [0, 0.1, 0.5, 0.9, 1],
                  ease,
               }}
               className="relative left-0"
            >
               <div className="absolute inline-flex h-3 w-3 -rotate-12 items-center justify-center rounded-full bg-brand shadow-md shadow-brand/30">
                  <div className="h-1.5 w-1.5 rounded-full bg-brand-foreground/80" />
               </div>
            </motion.div>
         </div>
      </div>
   </WindowChrome>
);

const PolishVisual = () => (
   <div className="flex flex-col items-center gap-5">
      <motion.div
         animate={{
            scale: [1, 1.03, 1],
            boxShadow: [
               "0 0 0 0 rgba(0, 112, 243, 0)",
               "0 0 0 12px rgba(0, 112, 243, 0.12)",
               "0 0 0 0 rgba(0, 112, 243, 0)",
            ],
         }}
         transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
         }}
         className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-medium text-brand-foreground"
      >
         <motion.span
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{
               duration: 1.4,
               repeat: Infinity,
               ease: "easeInOut",
            }}
         >
            <Sparkles className="h-4 w-4" />
         </motion.span>
         Ship it
      </motion.div>
      <div className="space-y-1.5 text-center">
         {[
            "loading spinner → skeleton",
            "400ms ease-out on hover",
            "focus ring that matches brand",
         ].map((t, i) => (
            <motion.div
               key={t}
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{
                  delay: 0.3 + i * 0.15,
                  duration: 0.4,
                  ease,
               }}
               className="font-mono text-[0.7rem] text-muted-foreground"
            >
               <span className="text-brand">+</span> {t}
            </motion.div>
         ))}
      </div>
   </div>
);

const ShipVisual = () => (
   <div className="relative flex items-center justify-center">
      {/* Ripples */}
      {[0, 1, 2].map((i) => (
         <motion.div
            key={i}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 2.2, opacity: [0, 0.35, 0] }}
            transition={{
               duration: 2.2,
               repeat: Infinity,
               delay: i * 0.6,
               ease: "easeOut",
            }}
            className="absolute h-28 w-28 rounded-full border-2 border-brand"
         />
      ))}
      <motion.div
         initial={{ scale: 0, rotate: -45 }}
         animate={{ scale: 1, rotate: 0 }}
         transition={{
            type: "spring",
            stiffness: 260,
            damping: 18,
            delay: 0.1,
         }}
         className="relative flex h-20 w-20 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-xl shadow-brand/30"
      >
         <Check className="h-10 w-10" strokeWidth={3} />
      </motion.div>
      <motion.div
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.5, duration: 0.4, ease }}
         className="absolute -bottom-12 inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand-muted px-3 py-1 text-[0.7rem] font-mono uppercase tracking-wider text-brand"
      >
         <span className="h-1.5 w-1.5 rounded-full bg-brand" />
         Live in prod
      </motion.div>
   </div>
);
