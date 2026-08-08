"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Flame, GitCommit, Trophy } from "lucide-react";
import {
   animate,
   m,
   useInView,
   useMotionValue,
   useTransform,
   type Variants,
} from "motion/react";

import { MotionProvider } from "~/components/motion";
import type {
   ContributionData,
   ContributionDay,
} from "~/server/github-contributions";

const ease = [0.23, 1, 0.32, 1] as const;

const levelClass: Record<0 | 1 | 2 | 3 | 4, string> = {
   0: "bg-muted/60",
   1: "bg-brand/25",
   2: "bg-brand/45",
   3: "bg-brand/70",
   4: "bg-brand",
};

const weekVariants: Variants = {
   hidden: {},
   show: {
      transition: { staggerChildren: 0.015 },
   },
};

const dayVariants: Variants = {
   hidden: { opacity: 0, scale: 0.3, y: -4 },
   show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.45, ease },
   },
};

const containerVariants: Variants = {
   hidden: {},
   show: {
      transition: { staggerChildren: 0.018 },
   },
};

function CountUp({
   value,
   inView,
   className,
}: {
   value: number;
   inView: boolean;
   className?: string;
}) {
   const count = useMotionValue(0);
   const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());
   useEffect(() => {
      if (!inView) return;
      const controls = animate(count, value, {
         duration: 1.6,
         ease,
      });
      return () => controls.stop();
   }, [inView, value, count]);
   return <m.span className={className}>{rounded}</m.span>;
}

function formatDate(iso: string) {
   const d = new Date(iso);
   return d.toLocaleDateString("en", {
      weekday: "short",
      month: "long",
      day: "numeric",
   });
}

export function GitHubGraph({ data }: { data: ContributionData }) {
   const rootRef = useRef<HTMLDivElement>(null);
   const inView = useInView(rootRef, { once: true, amount: 0.15 });
   const [hover, setHover] = useState<ContributionDay | null>(null);

   const totalWeeks = data.weeks.length;
   const MOBILE_WEEKS = 26; // last ~6 months on mobile
   const mobileStart = Math.max(0, totalWeeks - MOBILE_WEEKS);
   const mobileVisibleCount = totalWeeks - mobileStart;

   // Month labels — one per unique month, positioned at the first week it appears
   const monthLabels = useMemo(() => {
      const labels: { label: string; weekIndex: number }[] = [];
      let last = -1;
      data.weeks.forEach((w, i) => {
         const first = w.days[0];
         if (!first) return;
         const m = new Date(first.date).getUTCMonth();
         if (m !== last && i > 0) {
            labels.push({
               label: new Date(first.date).toLocaleString("en", {
                  month: "short",
               }),
               weekIndex: i,
            });
            last = m;
         } else if (last === -1) {
            last = m;
         }
      });
      return labels;
   }, [data.weeks]);

   // Mobile-only month labels — only months within the last MOBILE_WEEKS, repositioned
   const mobileMonthLabels = useMemo(
      () =>
         monthLabels
            .filter((m) => m.weekIndex >= mobileStart)
            .map((m) => ({
               label: m.label,
               leftPct:
                  ((m.weekIndex - mobileStart) / mobileVisibleCount) * 100,
            })),
      [monthLabels, mobileStart, mobileVisibleCount],
   );

   return (
      <MotionProvider>
         <div
            ref={rootRef}
            className="relative overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-br from-card/80 via-card/50 to-muted/30 p-5 sm:p-7"
         >
            {/* Decorative glow */}
            <div
               aria-hidden
               className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand/10 blur-3xl"
            />

            {/* Header */}
            <div className="relative mb-6 flex flex-wrap items-end justify-between gap-4">
               <div>
                  <div className="mb-1.5 flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase">
                     <GitCommit className="h-3 w-3" />
                     <span>live from github</span>
                     <span className="inline-flex items-center gap-1">
                        <span className="relative flex h-1.5 w-1.5">
                           <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                           <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
                        </span>
                     </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                     <CountUp
                        value={data.total}
                        inView={inView}
                        className="text-3xl font-bold tracking-tight sm:text-4xl"
                     />
                     <span className="text-sm text-muted-foreground">
                        contributions this year
                     </span>
                  </div>
                  <a
                     href={`https://github.com/${data.username}`}
                     target="_blank"
                     rel="noreferrer"
                     className="mt-1 inline-flex text-xs text-muted-foreground/80 transition-colors hover:text-brand"
                  >
                     @{data.username}
                  </a>
               </div>

               {/* Streak stats */}
               <div className="flex gap-3">
                  <StatPill
                     icon={<Flame className="h-3.5 w-3.5" />}
                     label="current"
                     value={`${data.currentStreak}d`}
                     inView={inView}
                     delay={0.2}
                  />
                  <StatPill
                     icon={<Trophy className="h-3.5 w-3.5" />}
                     label="longest"
                     value={`${data.longestStreak}d`}
                     inView={inView}
                     delay={0.3}
                  />
               </div>
            </div>

            {/* Graph — fluid width, no horizontal scroll */}
            <div className="relative">
               {/* Month labels — mobile (last 6 months) */}
               <div className="relative mb-2 ml-[28px] h-3 text-[0.65rem] text-muted-foreground sm:hidden">
                  {mobileMonthLabels.map(({ label, leftPct }, i) => (
                     <span
                        key={`m-${label}-${i}`}
                        className="absolute top-0 -translate-x-0.5"
                        style={{ left: `${leftPct}%` }}
                     >
                        {label}
                     </span>
                  ))}
               </div>
               {/* Month labels — desktop (full year) */}
               <div className="relative mb-2 hidden h-3 text-[0.65rem] text-muted-foreground sm:ml-8 sm:block">
                  {monthLabels.map(({ label, weekIndex }) => (
                     <span
                        key={`${label}-${weekIndex}`}
                        className="absolute top-0 -translate-x-0.5"
                        style={{
                           left: `${(weekIndex / totalWeeks) * 100}%`,
                        }}
                     >
                        {label}
                     </span>
                  ))}
               </div>

               {/* Grid row */}
               <div className="flex items-stretch gap-1.5">
                  {/* Day labels */}
                  <div className="flex w-[22px] shrink-0 flex-col justify-between py-0 text-[0.6rem] leading-none text-muted-foreground sm:w-6 sm:text-[0.65rem]">
                     {/* positioned to align with rows 1 (Mon), 3 (Wed), 5 (Fri) */}
                     <span className="h-[calc((100%-6*0.2rem)/7)]" />
                     <span className="h-[calc((100%-6*0.2rem)/7)] leading-[1]">
                        Mon
                     </span>
                     <span className="h-[calc((100%-6*0.2rem)/7)]" />
                     <span className="h-[calc((100%-6*0.2rem)/7)] leading-[1]">
                        Wed
                     </span>
                     <span className="h-[calc((100%-6*0.2rem)/7)]" />
                     <span className="h-[calc((100%-6*0.2rem)/7)] leading-[1]">
                        Fri
                     </span>
                     <span className="h-[calc((100%-6*0.2rem)/7)]" />
                  </div>

                  {/* Cells — each week = flex-1 column of 7 aspect-square cells */}
                  <m.div
                     variants={containerVariants}
                     initial="hidden"
                     animate={inView ? "show" : "hidden"}
                     className="flex flex-1 gap-[3px] sm:gap-1"
                  >
                     {data.weeks.map((w, wi) => (
                        <m.div
                           key={wi}
                           variants={weekVariants}
                           className={`min-w-0 flex-1 flex-col gap-[3px] sm:flex sm:gap-1 ${
                              wi < mobileStart ? "hidden" : "flex"
                           }`}
                        >
                           {Array.from({ length: 7 }).map((_, di) => {
                              const d = w.days.find((x) => x.weekday === di);
                              if (!d) {
                                 return (
                                    <div
                                       key={di}
                                       className="aspect-square w-full"
                                    />
                                 );
                              }
                              const isHot = hover?.date === d.date;
                              return (
                                 <m.button
                                    key={d.date}
                                    variants={dayVariants}
                                    type="button"
                                    aria-label={`${d.count} contributions on ${d.date}`}
                                    onMouseEnter={() => setHover(d)}
                                    onMouseLeave={() => setHover(null)}
                                    onFocus={() => setHover(d)}
                                    onBlur={() => setHover(null)}
                                    whileHover={{ scale: 1.4, zIndex: 5 }}
                                    transition={{
                                       type: "spring",
                                       stiffness: 400,
                                       damping: 18,
                                    }}
                                    className={`aspect-square w-full rounded-[3px] ring-offset-card transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand ${levelClass[d.level]} ${
                                       isHot
                                          ? "ring-2 ring-brand ring-offset-2"
                                          : ""
                                    }`}
                                 />
                              );
                           })}
                        </m.div>
                     ))}
                  </m.div>
               </div>
            </div>

            {/* Footer: tooltip swap + legend */}
            <div className="relative mt-5 flex flex-wrap items-center justify-between gap-3">
               <div className="min-h-[1.5rem] text-xs">
                  {hover ? (
                     <m.div
                        key={hover.date}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-baseline gap-2"
                     >
                        <span className="font-semibold text-foreground">
                           {hover.count}
                        </span>
                        <span className="text-muted-foreground">
                           {hover.count === 1
                              ? "contribution"
                              : "contributions"}{" "}
                           on {formatDate(hover.date)}
                        </span>
                     </m.div>
                  ) : data.busiestDay ? (
                     <m.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 1 }}
                        className="flex items-baseline gap-2 text-muted-foreground"
                     >
                        <span>Busiest day:</span>
                        <span className="font-semibold text-foreground">
                           {data.busiestDay.count}
                        </span>
                        <span>on {formatDate(data.busiestDay.date)}</span>
                     </m.div>
                  ) : null}
               </div>
               <div className="flex items-center gap-1.5 text-[0.65rem] text-muted-foreground">
                  <span>Less</span>
                  {[0, 1, 2, 3, 4].map((l) => (
                     <span
                        key={l}
                        className={`h-3 w-3 rounded-[3px] ${levelClass[l as 0 | 1 | 2 | 3 | 4]}`}
                     />
                  ))}
                  <span>More</span>
               </div>
            </div>
         </div>
      </MotionProvider>
   );
}

function StatPill({
   icon,
   label,
   value,
   inView,
   delay,
}: {
   icon: React.ReactNode;
   label: string;
   value: string;
   inView: boolean;
   delay: number;
}) {
   return (
      <m.div
         initial={{ opacity: 0, y: 8 }}
         animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
         transition={{ duration: 0.5, ease, delay }}
         className="flex items-center gap-2 rounded-full border border-border/80 bg-background/60 px-3 py-1.5 backdrop-blur-sm"
      >
         <span className="text-brand">{icon}</span>
         <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-semibold">{value}</span>
            <span className="font-mono text-[0.6rem] tracking-wider text-muted-foreground uppercase">
               {label}
            </span>
         </div>
      </m.div>
   );
}
