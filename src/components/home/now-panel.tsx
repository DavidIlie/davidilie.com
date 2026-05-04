"use client";

import React from "react";
import Link from "next/link";
import { formatDistanceToNowStrict } from "date-fns";
import {
   Boxes,
   Flame,
   GitCommit,
   Headphones,
   MapPin,
   MonitorPlay,
   Pause,
   Server,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { api } from "~/trpc/react";
import { SectionLabel } from "./section-label";

const ease = [0.23, 1, 0.32, 1] as const;

type Row = {
   key: string;
   icon: React.ReactNode;
   label: string;
   value: React.ReactNode;
   live?: boolean;
};

/**
 * Live status panel.
 *
 * Six rows of micro-data: location, cluster, what's playing, last push,
 * current streak, deploy target. Every row resolves to real data — no
 * hardcoded "fake live" values. The flame and headphones live-dots only
 * appear when the underlying state is genuinely live.
 *
 * Pattern adapted from jhey.dev (pixel-mono live panel) for an infra-AI
 * engineer.
 */
export const NowPanel: React.FC<{
   currentStreak?: number;
   /** ISO date string of the most recent contribution day. */
   lastPushAt?: string;
}> = ({ currentStreak, lastPushAt }) => {
   const reduceMotion = useReducedMotion();
   const playing = api.spotify.playingStateAndSong.useQuery(undefined, {
      staleTime: 60_000,
      refetchInterval: 60_000,
   }).data;
   const ytStats = api.cron.statistics.useQuery(undefined, {
      staleTime: 60 * 60_000,
   }).data;

   const lastPushLabel = lastPushAt
      ? formatDistanceToNowStrict(new Date(lastPushAt), { addSuffix: true })
      : null;

   const formatCount = (n: number): string => {
      if (n >= 1_000_000)
         return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
      if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
      return `${n}`;
   };

   const rows: Row[] = [
      {
         key: "location",
         icon: <MapPin className="h-3.5 w-3.5" />,
         label: "Location",
         value: (
            <span>
               <span className="text-foreground">UK</span>
               <span className="text-muted-foreground"> · Spain · Romania</span>
            </span>
         ),
      },
      {
         key: "cluster",
         icon: <Boxes className="h-3.5 w-3.5" />,
         label: "Cluster",
         value: (
            <span>
               <Link
                  href="https://github.com/davidilie/home-cluster"
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-foreground hover:text-brand"
               >
                  home-cluster
               </Link>
               <span className="text-muted-foreground">
                  {" · "}
                  <span className="font-mono">davidapps-cluster</span>
                  {" (private)"}
               </span>
            </span>
         ),
      },
      {
         key: "now-playing",
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
         key: "last-push",
         icon: <GitCommit className="h-3.5 w-3.5" />,
         label: "Last push",
         value: lastPushLabel ? (
            <span>
               <span className="text-foreground">{lastPushLabel}</span>
               <span className="text-muted-foreground"> · github</span>
            </span>
         ) : (
            <span className="text-muted-foreground">-</span>
         ),
         live: Boolean(lastPushLabel),
      },
      {
         key: "streak",
         icon: <Flame className="h-3.5 w-3.5" />,
         label: "Current streak",
         value: (
            <span className="tabnum">
               {typeof currentStreak === "number" && currentStreak > 0
                  ? `${currentStreak} day${currentStreak === 1 ? "" : "s"}`
                  : "-"}
            </span>
         ),
      },
      {
         key: "youtube",
         icon: <MonitorPlay className="h-3.5 w-3.5" />,
         label: "YouTube",
         value: ytStats ? (
            <Link
               href="https://www.youtube.com/@davidilie"
               target="_blank"
               rel="noreferrer"
               className="text-foreground hover:text-brand"
            >
               <span className="tabnum">
                  {formatCount(ytStats.subscribers)}
               </span>
               <span className="text-muted-foreground">
                  {" subs · "}
                  <span className="tabnum">{formatCount(ytStats.views)}</span>
                  {" views · "}
                  <span className="tabnum">{ytStats.videos}</span>
                  {" videos"}
               </span>
            </Link>
         ) : (
            <span className="text-muted-foreground">-</span>
         ),
      },
      {
         key: "site",
         icon: <Server className="h-3.5 w-3.5" />,
         label: "This site",
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
         className="mx-auto w-full max-w-3xl px-6 py-10 sm:py-16"
      >
         <SectionLabel className="mb-5" number="01">
            <span id="now-panel-heading">Right now</span>
         </SectionLabel>
         <div className="overflow-hidden rounded-2xl border border-border/70 bg-card/40 backdrop-blur-xs">
            <ul className="divide-y divide-border/60">
               {rows.map((row, i) => (
                  <motion.li
                     key={row.key}
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
                     <span className="w-20 shrink-0 font-mono text-[0.6rem] tracking-[0.18em] text-muted-foreground uppercase sm:w-28 sm:text-[0.65rem]">
                        {row.label}
                     </span>
                     <span
                        aria-hidden
                        className="dotted-leader hidden sm:block"
                     />
                     <span className="ml-auto flex min-w-0 flex-1 items-center justify-end gap-2 sm:flex-none">
                        <span className="min-w-0 text-right text-foreground sm:truncate">
                           {row.value}
                        </span>
                        {row.live ? (
                           <span className="relative flex h-1.5 w-1.5 shrink-0">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
                           </span>
                        ) : null}
                     </span>
                  </motion.li>
               ))}
            </ul>
         </div>
      </section>
   );
};
