"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
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

import {
   HoverCard,
   HoverCardContent,
   HoverCardTrigger,
} from "~/components/ui/hover-card";
import { Skeleton } from "~/components/ui/skeleton";
import { useTRPC } from "~/trpc/react";
import { SectionLabel } from "./section-label";

const fmtTime = (ms: number): string => {
   const total = Math.max(0, Math.floor(ms / 1000));
   const m = Math.floor(total / 60);
   const s = total % 60;
   return `${m}:${s.toString().padStart(2, "0")}`;
};

const NowPlayingHoverCard: React.FC<{
   title: string;
   artist?: string;
   album?: string;
   albumImageUrl?: string;
   progressMs?: number;
   durationMs?: number;
   fetchedAt?: number;
}> = ({
   title,
   artist,
   album,
   albumImageUrl,
   progressMs = 0,
   durationMs = 0,
   fetchedAt,
}) => {
   const [now, setNow] = React.useState(() => Date.now());
   React.useEffect(() => {
      const id = setInterval(() => setNow(Date.now()), 1000);
      return () => clearInterval(id);
   }, []);

   const elapsed =
      fetchedAt && durationMs
         ? Math.min(durationMs, progressMs + (now - fetchedAt))
         : progressMs;
   const pct = durationMs ? Math.min(100, (elapsed / durationMs) * 100) : 0;

   return (
      <div>
         <div className="flex gap-3">
            {albumImageUrl ? (
               <Image
                  src={albumImageUrl}
                  alt={album ?? ""}
                  width={80}
                  height={80}
                  className="h-20 w-20 shrink-0 rounded-md object-cover ring-1 ring-border/60"
               />
            ) : null}
            <div className="flex min-w-0 flex-1 flex-col justify-center">
               <span className="truncate text-sm font-medium text-foreground">
                  {title}
               </span>
               {artist ? (
                  <span className="truncate text-xs text-muted-foreground">
                     {artist}
                  </span>
               ) : null}
               {album ? (
                  <span className="mt-1 truncate font-mono text-[0.6rem] tracking-[0.14em] text-muted-foreground/80 uppercase">
                     {album}
                  </span>
               ) : null}
            </div>
         </div>
         {durationMs ? (
            <div className="mt-3">
               <div
                  className="h-1 w-full overflow-hidden rounded-full bg-border/60"
                  role="progressbar"
                  aria-valuenow={Math.round(pct)}
                  aria-valuemin={0}
                  aria-valuemax={100}
               >
                  <motion.div
                     className="h-full rounded-full bg-brand"
                     initial={false}
                     animate={{ width: `${pct}%` }}
                     transition={{ ease: "linear", duration: 0.9 }}
                  />
               </div>
               <div className="tabnum mt-1.5 flex justify-between font-mono text-[0.6rem] text-muted-foreground">
                  <span>{fmtTime(elapsed)}</span>
                  <span>{fmtTime(durationMs)}</span>
               </div>
            </div>
         ) : null}
      </div>
   );
};

const ease = [0.23, 1, 0.32, 1] as const;

type Row = {
   key: string;
   icon: React.ReactNode;
   label: string;
   labelHref?: string;
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
   const trpc = useTRPC();

   // Both queries are server-prefetched (see page.tsx) and streamed to the
   // client. useSuspenseQuery makes the server suspend until the data resolves
   // and stream the finished markup, so server HTML and client render match —
   // no hydration mismatch. Requires a <Suspense> boundary around <NowPanel>.
   const { data: playing } = useSuspenseQuery(
      trpc.spotify.playingStateAndSong.queryOptions(undefined, {
         staleTime: 60_000,
         refetchInterval: 60_000,
      }),
   );
   const { data: ytStats } = useSuspenseQuery(
      trpc.cron.statistics.queryOptions(undefined, {
         staleTime: 60 * 60_000,
      }),
   );

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
            <HoverCard openDelay={120} closeDelay={80}>
               <HoverCardTrigger asChild>
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
               </HoverCardTrigger>
               <HoverCardContent side="top" align="end">
                  <NowPlayingHoverCard
                     title={playing.title ?? ""}
                     artist={playing.artist}
                     album={playing.album}
                     albumImageUrl={playing.albumImageUrl}
                     progressMs={playing.progressMs}
                     durationMs={playing.durationMs}
                     fetchedAt={playing.fetchedAt}
                  />
               </HoverCardContent>
            </HoverCard>
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
               <span className="text-muted-foreground"> · </span>
               <Link
                  href="https://github.com/davidilie"
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-brand"
               >
                  github
               </Link>
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
         labelHref: "https://www.youtube.com/@davidilie",
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
         labelHref: "https://github.com/davidilie/davidilie.com",
         value: (
            <Link
               href="https://github.com/davidilie/davidilie.com"
               target="_blank"
               rel="noreferrer"
               className="text-foreground hover:text-brand"
            >
               <span className="font-mono">version6</span>
               <span className="text-muted-foreground">
                  {" · "}docker → ghcr → k8s
               </span>
            </Link>
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
                     {row.labelHref ? (
                        <Link
                           href={row.labelHref}
                           target="_blank"
                           rel="noreferrer"
                           className="w-20 shrink-0 font-mono text-[0.6rem] tracking-[0.18em] text-muted-foreground uppercase transition-colors hover:text-brand sm:w-28 sm:text-[0.65rem]"
                        >
                           {row.label}
                        </Link>
                     ) : (
                        <span className="w-20 shrink-0 font-mono text-[0.6rem] tracking-[0.18em] text-muted-foreground uppercase sm:w-28 sm:text-[0.65rem]">
                           {row.label}
                        </span>
                     )}
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

const fallbackValueWidths = [
   "w-24",
   "w-32",
   "w-20",
   "w-28",
   "w-16",
   "w-24",
   "w-20",
];

/** Skeleton shown by the <Suspense> boundary while NowPanel's data streams in. */
export const NowPanelFallback: React.FC = () => (
   <section
      aria-labelledby="now-panel-heading"
      className="mx-auto w-full max-w-3xl px-6 py-10 sm:py-16"
   >
      <SectionLabel className="mb-5" number="01">
         <span id="now-panel-heading">Right now</span>
      </SectionLabel>
      <div className="overflow-hidden rounded-2xl border border-border/70 bg-card/40 backdrop-blur-xs">
         <ul className="divide-y divide-border/60">
            {fallbackValueWidths.map((width, i) => (
               <li
                  key={i}
                  className="flex items-center gap-3 px-4 py-3 sm:px-5"
               >
                  <Skeleton
                     className="size-5 shrink-0 rounded-md"
                     style={{ animationDelay: `${i * 40}ms` }}
                  />
                  <Skeleton
                     className="h-3 w-20 shrink-0 rounded sm:w-28"
                     style={{ animationDelay: `${i * 40}ms` }}
                  />
                  <Skeleton
                     className={`ml-auto h-3 rounded ${width}`}
                     style={{ animationDelay: `${i * 40}ms` }}
                  />
               </li>
            ))}
         </ul>
      </div>
   </section>
);
