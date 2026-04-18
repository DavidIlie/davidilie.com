"use client";

import React, {
   useEffect,
   useMemo,
   useRef,
   useState,
} from "react";
import {
   animate,
   AnimatePresence,
   motion,
   useInView,
   useMotionValue,
   useMotionValueEvent,
   useReducedMotion,
   useTransform,
   type Variants,
} from "motion/react";
import {
   Calendar,
   Clock,
   Film,
   Flame,
   MessageCircle,
   Scissors,
   Volume2,
   Wand2,
   Zap,
} from "lucide-react";

const ease = [0.23, 1, 0.32, 1] as const;

type Clip = {
   start: number;
   width: number;
   color: string;
   label: string;
};
type WaveClip = { start: number; width: number; color: string };

type Tracks = {
   v2: Clip[];
   v1: Clip[];
   a1: WaveClip[];
   a2: WaveClip[];
};

type Tier = {
   id: string;
   label: string;
   tagline: string;
   days: number;
   title: string;
   body: string;
   fit: string;
   icon: React.ReactNode;
   mood: string;
   tracks: Tracks;
   bin: string[];
};

const tiers: Tier[] = [
   {
      id: "rush",
      label: "Rush",
      tagline: "2 days",
      days: 2,
      title: "Short-form, yesterday.",
      body: "For when your Reel needs to go up by Friday. Hook in the first frame, aggressive pacing, cuts every second or two. No creative back-and-forth — one pass, it ships.",
      fit: "Shorts, TikToks, Reels · under 90s",
      icon: <Flame className="h-4 w-4" />,
      mood: "from-rose-500/30 via-amber-400/20 to-brand/30",
      tracks: {
         v2: [
            { start: 2, width: 10, color: "bg-brand/80", label: "title" },
            { start: 22, width: 8, color: "bg-brand/80", label: "caption" },
            { start: 44, width: 8, color: "bg-brand/80", label: "caption" },
            { start: 66, width: 10, color: "bg-brand/80", label: "CTA" },
            { start: 86, width: 10, color: "bg-brand/80", label: "logo" },
         ],
         v1: [
            { start: 0, width: 8, color: "bg-blue-500/70", label: "hook" },
            { start: 9, width: 6, color: "bg-purple-500/70", label: "B-roll" },
            { start: 16, width: 10, color: "bg-blue-500/70", label: "A-cam" },
            { start: 27, width: 5, color: "bg-amber-500/70", label: "pack shot" },
            { start: 33, width: 8, color: "bg-blue-500/70", label: "A-cam" },
            { start: 42, width: 6, color: "bg-purple-500/70", label: "B-roll" },
            { start: 49, width: 4, color: "bg-amber-500/70", label: "zoom" },
            { start: 54, width: 9, color: "bg-blue-500/70", label: "A-cam" },
            { start: 64, width: 5, color: "bg-purple-500/70", label: "B-roll" },
            { start: 70, width: 8, color: "bg-blue-500/70", label: "A-cam" },
            { start: 79, width: 5, color: "bg-amber-500/70", label: "glitch" },
            { start: 85, width: 10, color: "bg-blue-500/70", label: "outro" },
         ],
         a1: [
            { start: 0, width: 34, color: "bg-emerald-500/60" },
            { start: 36, width: 28, color: "bg-emerald-500/60" },
            { start: 66, width: 30, color: "bg-emerald-500/60" },
         ],
         a2: [{ start: 0, width: 96, color: "bg-pink-500/50" }],
      },
      bin: ["hook_v3.mp4", "broll_walk.mp4", "logo_anim.mov"],
   },
   {
      id: "standard",
      label: "Standard",
      tagline: "5 days",
      days: 5,
      title: "The weekly upload.",
      body: "For a proper YouTube video. One review round on staging, feedback on the rough cut, a polish pass, then delivery. The sweet spot for most channels.",
      fit: "Long-form YouTube · 5–15 minutes",
      icon: <Zap className="h-4 w-4" />,
      mood: "from-brand/30 via-indigo-500/25 to-cyan-400/20",
      tracks: {
         v2: [
            { start: 4, width: 12, color: "bg-brand/70", label: "intro" },
            { start: 30, width: 8, color: "bg-brand/70", label: "chapter" },
            { start: 58, width: 8, color: "bg-brand/70", label: "chapter" },
            { start: 82, width: 10, color: "bg-brand/70", label: "end card" },
         ],
         v1: [
            { start: 0, width: 14, color: "bg-blue-500/70", label: "cold open" },
            { start: 15, width: 10, color: "bg-purple-500/70", label: "B-roll" },
            { start: 26, width: 18, color: "bg-blue-500/70", label: "A-roll" },
            { start: 45, width: 8, color: "bg-purple-500/70", label: "graphic" },
            { start: 54, width: 16, color: "bg-blue-500/70", label: "A-roll" },
            { start: 71, width: 10, color: "bg-purple-500/70", label: "B-roll" },
            { start: 82, width: 13, color: "bg-blue-500/70", label: "outro" },
         ],
         a1: [
            { start: 0, width: 44, color: "bg-emerald-500/60" },
            { start: 46, width: 48, color: "bg-emerald-500/60" },
         ],
         a2: [{ start: 0, width: 96, color: "bg-pink-500/50" }],
      },
      bin: [
         "a_roll_take4.mp4",
         "broll_desk.mp4",
         "chapter_card.png",
         "music_upbeat.wav",
      ],
   },
   {
      id: "essay",
      label: "Essay",
      tagline: "10 days",
      days: 10,
      title: "Cinematic, narrative, slow.",
      body: "For the 25-minute essay that needs to feel like a film. Sound design, color grade, motion graphics, multiple revision passes. The kind of cut you feel more than you notice.",
      fit: "Video essays, mini-docs · 20 min+",
      icon: <Film className="h-4 w-4" />,
      mood: "from-amber-800/30 via-emerald-900/30 to-slate-900",
      tracks: {
         v2: [
            { start: 6, width: 24, color: "bg-brand/60", label: "title seq" },
            { start: 54, width: 14, color: "bg-brand/60", label: "lower third" },
            { start: 78, width: 16, color: "bg-brand/60", label: "credits" },
         ],
         v1: [
            { start: 0, width: 22, color: "bg-blue-500/70", label: "cold open" },
            { start: 23, width: 16, color: "bg-purple-500/70", label: "archive" },
            { start: 40, width: 20, color: "bg-blue-500/70", label: "interview" },
            { start: 61, width: 14, color: "bg-purple-500/70", label: "B-roll" },
            { start: 76, width: 20, color: "bg-blue-500/70", label: "voice-over" },
         ],
         a1: [{ start: 0, width: 96, color: "bg-emerald-500/60" }],
         a2: [
            { start: 0, width: 40, color: "bg-pink-500/50" },
            { start: 42, width: 54, color: "bg-pink-500/50" },
         ],
      },
      bin: [
         "vo_master_v7.wav",
         "archive_1998.mov",
         "interview_04.mp4",
         "grade_lut.cube",
         "score_theme.wav",
      ],
   },
];

// Scene lookup by clip label — drives the program monitor
const sceneMap: Record<string, { title: string; shot: string; mood?: string }> =
   {
      hook: { title: "HOOK", shot: "Face to camera · hard cut in" },
      "cold open": { title: "COLD OPEN", shot: "Wide establish · push-in" },
      "A-cam": { title: "A-CAM", shot: "Medium · eye-line match" },
      "A-roll": { title: "A-ROLL", shot: "Seated master · long lens" },
      "B-roll": {
         title: "B-ROLL",
         shot: "Handheld · natural light",
         mood: "from-purple-500/25 via-indigo-500/20 to-brand/15",
      },
      "pack shot": {
         title: "PACK SHOT",
         shot: "Product beauty · key light",
         mood: "from-amber-500/30 via-amber-300/20 to-brand/25",
      },
      zoom: {
         title: "SNAP ZOOM",
         shot: "Digital push · 3-frame",
         mood: "from-amber-500/30 via-rose-400/25 to-brand/30",
      },
      glitch: {
         title: "GLITCH",
         shot: "Datamosh · 4-frame flash",
         mood: "from-rose-500/40 via-amber-300/20 to-brand/30",
      },
      outro: { title: "OUTRO", shot: "Logo out · slow pull" },
      graphic: {
         title: "GRAPHIC",
         shot: "Motion card · key in",
         mood: "from-brand/40 via-indigo-500/25 to-cyan-400/20",
      },
      archive: {
         title: "ARCHIVE",
         shot: "Archival · slow push",
         mood: "from-amber-800/30 via-slate-700/30 to-slate-900",
      },
      interview: {
         title: "INTERVIEW",
         shot: "Close · two-shot cutaway",
      },
      "voice-over": {
         title: "VOICE-OVER",
         shot: "Montage · color grade",
      },
   };

type Feedback = {
   id: string;
   label: string;
   quote: string;
   apply: (t: Tracks) => Tracks;
};

const feedbacks: Feedback[] = [
   {
      id: "punch",
      label: "Make it punchier",
      quote: "Can we cut faster through the middle?",
      apply: (t) => ({
         ...t,
         v1: t.v1.flatMap((c) => {
            if (c.width < 8) return [c];
            const half = (c.width - 1) / 2;
            return [
               { ...c, width: half },
               {
                  ...c,
                  start: c.start + half + 1,
                  width: half,
               },
            ];
         }),
      }),
   },
   {
      id: "broll",
      label: "More b-roll",
      quote: "Can you cover this with more b-roll?",
      apply: (t) => ({
         ...t,
         v2: [
            ...t.v2,
            {
               start: 12,
               width: 7,
               color: "bg-purple-500/60",
               label: "b-roll",
            },
            {
               start: 38,
               width: 9,
               color: "bg-purple-500/60",
               label: "b-roll",
            },
            {
               start: 68,
               width: 7,
               color: "bg-purple-500/60",
               label: "b-roll",
            },
         ],
      }),
   },
   {
      id: "music",
      label: "Drop the music",
      quote: "Kill the music, let it breathe.",
      apply: (t) => ({ ...t, a2: [] }),
   },
   {
      id: "hook",
      label: "Louder opener",
      quote: "Open with something that stops the scroll.",
      apply: (t) => ({
         ...t,
         v1: t.v1.map((c, i) =>
            i === 0
               ? {
                    ...c,
                    color: "bg-amber-500/80",
                    label: "hook",
                 }
               : c,
         ),
         v2: [
            {
               start: 0,
               width: 4,
               color: "bg-brand",
               label: "BOOM",
            },
            ...t.v2,
         ],
      }),
   },
];

function formatDelivery(days: number) {
   const d = new Date();
   d.setDate(d.getDate() + days);
   return d.toLocaleDateString("en", {
      weekday: "short",
      month: "short",
      day: "numeric",
   });
}

const tabVariants: Variants = {
   hidden: { opacity: 0, y: 6 },
   show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
};

export function Turnaround() {
   const rootRef = useRef<HTMLDivElement>(null);
   const inView = useInView(rootRef, { amount: 0.2, once: false });
   const reduceMotion = useReducedMotion();
   const [activeId, setActiveId] = useState(tiers[1]!.id);
   const [touched, setTouched] = useState(false);

   const active = useMemo(
      () => tiers.find((t) => t.id === activeId) ?? tiers[1]!,
      [activeId],
   );

   const [tracks, setTracks] = useState<Tracks>(active.tracks);
   const [lastFeedback, setLastFeedback] = useState<Feedback | null>(null);
   const [activeClipIdx, setActiveClipIdx] = useState(-1);
   const activeClipRef = useRef(-1);

   useEffect(() => {
      if (inView) setTouched(true);
   }, [inView]);

   // Reset tracks when tier changes
   useEffect(() => {
      setTracks(active.tracks);
      setLastFeedback(null);
      setActiveClipIdx(-1);
      activeClipRef.current = -1;
   }, [active.id, active.tracks]);

   // Playhead as a shared motion value (0–100)
   const playhead = useMotionValue(0);
   const playheadLeft = useTransform(playhead, (v) => `${v}%`);

   // Drive playhead with a repeating linear animation
   useEffect(() => {
      if (!inView || !touched || reduceMotion) {
         playhead.set(0);
         return;
      }
      playhead.set(0);
      const duration = active.days * 1.1 + 2;
      const controls = animate(playhead, 100, {
         duration,
         ease: "linear",
         repeat: Infinity,
         repeatType: "loop",
      });
      return () => controls.stop();
   }, [active.id, active.days, inView, touched, reduceMotion, playhead]);

   // Watch playhead → find which V1 clip is under it → setState only on boundary crossings
   useMotionValueEvent(playhead, "change", (val) => {
      const hit = tracks.v1.findIndex(
         (c) => val >= c.start && val < c.start + c.width,
      );
      if (hit !== activeClipRef.current) {
         activeClipRef.current = hit;
         setActiveClipIdx(hit);
      }
   });

   const deliveryDate = useMemo(
      () => formatDelivery(active.days),
      [active.days],
   );

   const activeClip =
      activeClipIdx >= 0 ? tracks.v1[activeClipIdx] ?? null : null;
   const scene = activeClip ? sceneMap[activeClip.label] : undefined;
   const sceneTitle = scene?.title ?? "PROGRAM";
   const sceneShot = scene?.shot ?? "Waiting on playhead…";
   const sceneMood = scene?.mood ?? active.mood;
   const timecodeSec = Math.max(0, activeClip?.start ?? 0);

   const applyFeedback = (fb: Feedback) => {
      setTracks((t) => fb.apply(t));
      setLastFeedback(fb);
   };
   const resetTracks = () => {
      setTracks(active.tracks);
      setLastFeedback(null);
   };

   return (
      <div ref={rootRef} className="relative">
         {/* Tier picker */}
         <div className="mb-6 flex flex-wrap justify-center gap-2">
            {tiers.map((t) => {
               const isActive = t.id === activeId;
               return (
                  <button
                     key={t.id}
                     type="button"
                     onClick={() => setActiveId(t.id)}
                     className={`relative flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                        isActive
                           ? "border-brand/40 text-foreground"
                           : "border-border/80 text-muted-foreground hover:text-foreground"
                     }`}
                  >
                     {isActive && (
                        <motion.span
                           layoutId="turnaround-pill"
                           className="absolute inset-0 rounded-full bg-brand-muted"
                           transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 32,
                           }}
                        />
                     )}
                     <span className="relative flex items-center gap-2">
                        <span
                           className={
                              isActive ? "text-brand" : "text-muted-foreground"
                           }
                        >
                           {t.icon}
                        </span>
                        <span>{t.label}</span>
                        <span className="font-mono text-xs text-muted-foreground">
                           {t.tagline}
                        </span>
                     </span>
                  </button>
               );
            })}
         </div>

         {/* Premiere mock */}
         <div className="overflow-hidden rounded-2xl border border-border/80 bg-[#161616] text-white shadow-2xl">
            {/* Window chrome */}
            <div className="flex items-center gap-3 border-b border-white/5 bg-[#1c1c1c] px-4 py-2.5">
               <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-500/90" />
                  <span className="h-3 w-3 rounded-full bg-amber-400/90" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/90" />
               </div>
               <div className="flex flex-1 items-center justify-center gap-4 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-white/50">
                  <span className="hidden sm:inline">File</span>
                  <span className="hidden sm:inline">Edit</span>
                  <span className="hidden sm:inline">Clip</span>
                  <span>Sequence</span>
                  <span className="hidden sm:inline">Window</span>
               </div>
               <div className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-white/40">
                  {active.label}.prproj
               </div>
            </div>

            {/* Top row: program monitor + bin */}
            <div className="grid gap-px bg-white/5 md:grid-cols-[1.6fr_1fr]">
               {/* Program monitor — reacts to playhead */}
               <div className="relative aspect-video overflow-hidden bg-[#0d0d0d]">
                  <div className="absolute left-3 top-3 z-10 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/40">
                     Program
                  </div>

                  {/* Scene swap — instant cut, no flash */}
                  <AnimatePresence initial={false}>
                     {touched && (
                        <motion.div
                           key={`${active.id}-${activeClip?.label ?? "idle"}-${activeClipIdx}`}
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0 }}
                           transition={{ duration: 0.08, ease: "linear" }}
                           className="absolute inset-0"
                        >
                           <div
                              className={`absolute inset-0 bg-gradient-to-br ${sceneMood}`}
                           />
                           <div
                              aria-hidden
                              className="absolute inset-0 opacity-[0.08]"
                              style={{
                                 backgroundImage:
                                    "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.6) 0.5px, transparent 1px), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.5) 0.5px, transparent 1px)",
                                 backgroundSize: "3px 3px, 5px 5px",
                              }}
                           />
                           <div className="absolute bottom-4 left-4 right-4">
                              <div className="mb-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-brand">
                                 {sceneTitle}
                              </div>
                              <div className="text-sm font-medium text-white/90">
                                 {sceneShot}
                              </div>
                           </div>
                           <div
                              aria-hidden
                              className="absolute inset-6 border border-white/10"
                           />
                           <div
                              aria-hidden
                              className="absolute left-1/2 top-1/2 h-6 w-px -translate-x-1/2 -translate-y-1/2 bg-white/20"
                           />
                           <div
                              aria-hidden
                              className="absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 bg-white/20"
                           />
                        </motion.div>
                     )}
                  </AnimatePresence>

                  <LiveTimecode tc={timecodeSec} />
               </div>

               {/* Bin */}
               <div className="bg-[#141414] p-4">
                  <div className="mb-3 flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/40">
                     <span>Project bin</span>
                     <span>{active.bin.length} items</span>
                  </div>
                  <div className="space-y-1.5">
                     <AnimatePresence mode="popLayout" initial={false}>
                        {active.bin.map((name, i) => (
                           <motion.div
                              key={`${active.id}-${name}`}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 8 }}
                              transition={{
                                 duration: 0.3,
                                 delay: i * 0.04,
                                 ease,
                              }}
                              className="flex items-center gap-2 rounded border border-white/5 bg-white/[0.03] px-2.5 py-1.5 text-xs"
                           >
                              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded bg-white/10">
                                 {name.endsWith(".wav") ||
                                 name.endsWith(".mp3") ? (
                                    <Volume2 className="h-3 w-3 text-emerald-400" />
                                 ) : name.endsWith(".png") ||
                                   name.endsWith(".cube") ? (
                                    <Wand2 className="h-3 w-3 text-brand" />
                                 ) : (
                                    <Film className="h-3 w-3 text-blue-400" />
                                 )}
                              </span>
                              <span className="truncate font-mono text-[0.7rem] text-white/70">
                                 {name}
                              </span>
                           </motion.div>
                        ))}
                     </AnimatePresence>
                  </div>

                  <div className="mt-4 flex items-center gap-1.5 border-t border-white/5 pt-4">
                     {[Scissors, Wand2, Volume2].map((Icon, i) => (
                        <span
                           key={i}
                           className="flex h-7 w-7 items-center justify-center rounded border border-white/5 bg-white/[0.03] text-white/50"
                        >
                           <Icon className="h-3.5 w-3.5" />
                        </span>
                     ))}
                  </div>
               </div>
            </div>

            {/* Timeline */}
            <div className="border-t border-white/5 bg-[#111] p-4 sm:p-5">
               <div className="mb-3 flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/40">
                  <span>Timeline · {active.label.toUpperCase()}</span>
                  <span className="tabular-nums">
                     00:00 — {Math.floor(active.days * 3)}:00
                  </span>
               </div>

               <div className="relative space-y-1.5">
                  <TimelineRow
                     label="V2"
                     clips={tracks.v2}
                     tierId={active.id}
                     trackKey="v2"
                     touched={touched}
                     showLabel
                  />
                  <TimelineRow
                     label="V1"
                     clips={tracks.v1}
                     tierId={active.id}
                     trackKey="v1"
                     touched={touched}
                     showLabel
                     activeClipIdx={activeClipIdx}
                  />
                  <TimelineRow
                     label="A1"
                     clips={tracks.a1}
                     tierId={active.id}
                     trackKey="a1"
                     touched={touched}
                     waveform
                  />
                  <TimelineRow
                     label="A2"
                     clips={tracks.a2}
                     tierId={active.id}
                     trackKey="a2"
                     touched={touched}
                     waveform
                  />

                  {/* Playhead — driven by shared motion value */}
                  <div className="pointer-events-none absolute inset-y-0 left-10 right-0">
                     <motion.div
                        style={{ left: playheadLeft }}
                        className="absolute top-0 bottom-0 w-px bg-brand shadow-[0_0_12px_rgba(59,130,246,0.55)]"
                     >
                        <span className="absolute -top-2 left-0 -translate-x-1/2 rounded-sm bg-brand px-1 py-0.5 font-mono text-[0.55rem] leading-none text-brand-foreground">
                           ▼
                        </span>
                     </motion.div>
                  </div>
               </div>
            </div>
         </div>

         {/* Client feedback panel */}
         <div className="mt-6 rounded-2xl border border-border/80 bg-card/40 p-5 sm:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
               <div>
                  <div className="mb-1 flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-brand">
                     <MessageCircle className="h-3 w-3" />
                     Client says
                  </div>
                  <div className="text-sm text-muted-foreground">
                     Push a button. Watch the cut rebuild in real time.
                  </div>
               </div>
               {lastFeedback && (
                  <button
                     type="button"
                     onClick={resetTracks}
                     className="rounded-full border border-border/80 bg-background/60 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                     Reset cut
                  </button>
               )}
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
               {feedbacks.map((fb) => {
                  const isApplied = lastFeedback?.id === fb.id;
                  return (
                     <button
                        key={fb.id}
                        type="button"
                        onClick={() => applyFeedback(fb)}
                        className={`group relative overflow-hidden rounded-xl border p-4 text-left transition-all ${
                           isApplied
                              ? "border-brand/40 bg-brand-muted/50"
                              : "border-border/80 bg-background/40 hover:border-brand/30 hover:bg-brand-muted/20"
                        }`}
                     >
                        <div className="mb-1.5 text-sm font-medium">
                           {fb.label}
                        </div>
                        <div className="text-xs italic text-muted-foreground">
                           &ldquo;{fb.quote}&rdquo;
                        </div>
                        {isApplied && (
                           <motion.div
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ duration: 0.5, ease }}
                              style={{ transformOrigin: "left" }}
                              className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand"
                           />
                        )}
                     </button>
                  );
               })}
            </div>

            {lastFeedback && (
               <motion.div
                  key={lastFeedback.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease }}
                  className="mt-4 flex items-center gap-2 rounded-lg border border-brand/20 bg-brand-muted/30 px-3 py-2 text-xs text-muted-foreground"
               >
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-brand">
                     Done
                  </span>
                  <span>
                     Applied &ldquo;{lastFeedback.label}&rdquo; &middot; timeline
                     rebuilt
                  </span>
               </motion.div>
            )}
         </div>

         {/* Copy + delivery date */}
         <div className="mt-6 grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-start">
            <AnimatePresence mode="wait" initial={false}>
               <motion.div
                  key={active.id}
                  variants={tabVariants}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, y: -6 }}
               >
                  <div className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-brand">
                     {active.fit}
                  </div>
                  <h3 className="mb-2 text-2xl font-bold leading-tight sm:text-3xl">
                     {active.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                     {active.body}
                  </p>
               </motion.div>
            </AnimatePresence>

            <motion.div
               key={active.id + "-card"}
               initial={{ opacity: 0, y: 8 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.4, ease }}
               className="rounded-xl border border-border/80 bg-card/60 p-5"
            >
               <div className="mb-4 flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Deliverable lands</span>
               </div>
               <div className="mb-1 text-2xl font-bold tabular-nums">
                  {deliveryDate}
               </div>
               <div className="text-xs text-muted-foreground">
                  if you send footage today
               </div>
               <div className="mt-4 flex items-center gap-2 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 text-brand" />
                  <span>
                     {active.days} {active.days === 1 ? "day" : "days"} end to
                     end
                  </span>
               </div>
            </motion.div>
         </div>
      </div>
   );
}

function LiveTimecode({ tc }: { tc: number }) {
   // Maps 0-100 percentage to mock frame count
   const secs = Math.floor((tc / 100) * 180);
   const mm = String(Math.floor(secs / 60)).padStart(2, "0");
   const ss = String(secs % 60).padStart(2, "0");
   return (
      <div className="absolute right-3 top-3 z-10 rounded bg-black/70 px-2 py-0.5 font-mono text-[0.7rem] tabular-nums text-white/85">
         00:{mm}:{ss}:00
      </div>
   );
}

function TimelineRow({
   label,
   clips,
   tierId,
   trackKey,
   showLabel,
   waveform,
   touched,
   activeClipIdx,
}: {
   label: string;
   clips: { start: number; width: number; color: string; label?: string }[];
   tierId: string;
   trackKey: string;
   showLabel?: boolean;
   waveform?: boolean;
   touched: boolean;
   activeClipIdx?: number;
}) {
   return (
      <div className="flex items-center gap-2">
         <span className="flex h-9 w-8 flex-shrink-0 items-center justify-center rounded border border-white/5 bg-white/[0.03] font-mono text-[0.6rem] text-white/50">
            {label}
         </span>
         <div className="relative h-9 flex-1 overflow-hidden rounded border border-white/5 bg-black/40">
            {/* Grid lines */}
            <div aria-hidden className="absolute inset-0 flex">
               {Array.from({ length: 12 }).map((_, i) => (
                  <span
                     key={i}
                     className="flex-1 border-r border-white/[0.03] last:border-r-0"
                  />
               ))}
            </div>

            <AnimatePresence mode="popLayout" initial={false}>
               {touched &&
                  clips.map((clip, i) => {
                     const isActive = activeClipIdx === i;
                     return (
                        <motion.div
                           key={`${tierId}-${trackKey}-${clip.start}-${clip.width}-${clip.label ?? i}`}
                           layout
                           initial={{
                              scaleX: 0,
                              opacity: 0,
                              transformOrigin: "left center",
                           }}
                           animate={{
                              scaleX: 1,
                              opacity: 1,
                              boxShadow: isActive
                                 ? "0 0 0 1.5px rgba(59, 130, 246, 0.95), 0 0 18px rgba(59, 130, 246, 0.35)"
                                 : "0 0 0 0px rgba(59, 130, 246, 0), 0 0 0px rgba(59, 130, 246, 0)",
                           }}
                           exit={{ opacity: 0, scaleX: 0.4 }}
                           transition={{
                              duration: 0.4,
                              delay: i * 0.02,
                              ease,
                           }}
                           className={`absolute top-1 h-7 rounded-sm ${clip.color} overflow-hidden`}
                           style={{
                              left: `${clip.start}%`,
                              width: `${clip.width}%`,
                           }}
                        >
                           {waveform ? (
                              <Waveform
                                 tierId={`${tierId}-${trackKey}-${i}`}
                              />
                           ) : showLabel && clip.label ? (
                              <span className="block truncate px-1.5 pt-0.5 font-mono text-[0.55rem] uppercase tracking-wide text-white/85">
                                 {clip.label}
                              </span>
                           ) : null}
                        </motion.div>
                     );
                  })}
            </AnimatePresence>
         </div>
      </div>
   );
}

function Waveform({ tierId }: { tierId: string }) {
   const bars = useMemo(() => {
      let h = 0;
      for (let i = 0; i < tierId.length; i++) {
         h = (h * 31 + tierId.charCodeAt(i)) & 0xffffffff;
      }
      const seeded = (i: number) => {
         const x = Math.sin(h + i * 9301) * 10000;
         return x - Math.floor(x);
      };
      return Array.from({ length: 28 }, (_, i) => 30 + seeded(i) * 70);
   }, [tierId]);
   return (
      <div className="flex h-full items-center gap-px px-1">
         {bars.map((b, i) => (
            <span
               key={i}
               className="flex-1 rounded-sm bg-white/50"
               style={{ height: `${b}%` }}
            />
         ))}
      </div>
   );
}
