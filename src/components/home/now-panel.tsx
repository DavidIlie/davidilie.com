"use client";

import React from "react";
import Link from "next/link";
import { Cpu, Headphones, Pause, Sparkles, Wifi } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { api } from "~/trpc/react";
import { SectionLabel } from "./section-label";

const ease = [0.23, 1, 0.32, 1] as const;

type Row = {
   icon: React.ReactNode;
   label: string;
   value: React.ReactNode;
   href?: string;
   live?: boolean;
};

/**
 * Live status panel — the flagship redesign feature.
 *
 * Six rows of micro-data: location, what's playing, last push, recent
 * agent run, current streak, cluster status. Each row has an icon, a
 * mono label, a value, and (where applicable) a pulsing live dot.
 *
 * Where data is hardcoded for v1: cluster, agent run. Documented in the
 * proposal as season-2 work tied to a public read-only metrics endpoint
 * on the homelab cluster.
 */
export const NowPanel: React.FC<{
   currentStreak?: number;
}> = ({ currentStreak }) => {
   const reduceMotion = useReducedMotion();
   const playing = api.spotify.playingStateAndSong.useQuery(undefined, {
      staleTime: 60_000,
      refetchInterval: 60_000,
   }).data;

   const rows: Row[] = [
      {
         icon: <span aria-hidden>📍</span>,
         label: "Location",
         value: "Bucharest, RO",
      },
      {
         icon: <Cpu className="h-3.5 w-3.5" />,
         label: "Cluster",
         value: "5 pods · 0 alerts",
         live: true,
      },
      {
         icon: playing?.isPlaying ? (
            <Headphones className="h-3.5 w-3.5" />
         ) : (
            <Pause className="h-3.5 w-3.5" />
         ),
         label: "Now playing",
         value: playing?.isPlaying ? (
            <Link
               href={playing.songUrl ?? "#"}
               target="_blank"
               rel="noreferrer"
               className="text-foreground hover:text-brand"
            >
               {playing.title}
               {playing.artist ? (
                  <span className="text-muted-foreground">
                     {" "}
                     · {playing.artist}
                  </span>
               ) : null}
            </Link>
         ) : (
            <span className="text-muted-foreground">silent right now</span>
         ),
         live: playing?.isPlaying,
      },
      {
         icon: <Sparkles className="h-3.5 w-3.5" />,
         label: "Last skill run",
         value: (
            <span>
               <span className="font-mono">caveman-review</span>
               <span className="text-muted-foreground"> · 6m ago</span>
            </span>
         ),
      },
      {
         icon: <span aria-hidden>🔥</span>,
         label: "Current streak",
         value: (
            <span className="tabnum">
               {typeof currentStreak === "number"
                  ? `${currentStreak} day${currentStreak === 1 ? "" : "s"}`
                  : "—"}
            </span>
         ),
      },
      {
         icon: <Wifi className="h-3.5 w-3.5" />,
         label: "Site",
         value: (
            <span>
               <span className="font-mono">version6</span>
               <span className="text-muted-foreground">
                  {" · "}docker → ghcr → k8s
               </span>
            </span>
         ),
      },
   ];

   return (
      <section
         aria-labelledby="now-panel-heading"
         className="mx-auto w-full max-w-3xl px-6 py-10"
      >
         <SectionLabel className="mb-5" number="01">
            <span id="now-panel-heading">Right now</span>
         </SectionLabel>
         <div className="overflow-hidden rounded-2xl border border-border/70 bg-card/40 backdrop-blur-xs">
            <ul className="divide-y divide-border/60">
               {rows.map((row, i) => (
                  <motion.li
                     key={row.label}
                     initial={
                        reduceMotion ? { opacity: 1 } : { opacity: 0, y: 6 }
                     }
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-40px" }}
                     transition={{
                        delay: reduceMotion ? 0 : 0.05 * i,
                        duration: 0.25,
                        ease,
                     }}
                     className="flex items-center gap-3 px-4 py-3 text-sm sm:px-5"
                  >
                     <span className="flex h-5 w-5 shrink-0 items-center justify-center text-muted-foreground">
                        {row.icon}
                     </span>
                     <span className="w-32 shrink-0 font-mono text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase">
                        {row.label}
                     </span>
                     <span aria-hidden className="dotted-leader" />
                     <span className="ml-auto truncate text-right text-foreground">
                        {row.value}
                     </span>
                     {row.live ? (
                        <span className="relative ml-2 flex h-1.5 w-1.5 shrink-0">
                           <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                           <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
                        </span>
                     ) : null}
                  </motion.li>
               ))}
            </ul>
         </div>
      </section>
   );
};
