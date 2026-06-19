"use client";

import React from "react";
import { Cake, Gift, PartyPopper } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { createPortal } from "react-dom";

import {
   BIRTHDAY,
   getAge,
   isBirthday,
   nextBirthday,
   wordForNumber,
} from "~/lib/age";

import {
   HoverCard,
   HoverCardContent,
   HoverCardTrigger,
} from "~/components/ui/hover-card";

const BORN = BIRTHDAY.toLocaleDateString("en-GB", {
   day: "numeric",
   month: "long",
   year: "numeric",
});

/* -------------------------------------------------------------------------- */
/*  Countdown card (shown inside the hover card)                               */
/* -------------------------------------------------------------------------- */

type Countdown = {
   days: number;
   hours: number;
   minutes: number;
   seconds: number;
   /** Fraction (0-100) of this year of life already lived. */
   pct: number;
   /** True on the birthday itself. */
   isBirthday: boolean;
   /** Age being turned at the next birthday. */
   turning: number;
};

const computeCountdown = (nowMs: number): Countdown => {
   const now = new Date(nowMs);
   const target = nextBirthday(now);
   const start = new Date(target);
   start.setFullYear(start.getFullYear() - 1);

   const span = target.getTime() - start.getTime();
   const elapsed = nowMs - start.getTime();
   const pct = Math.min(100, Math.max(0, (elapsed / span) * 100));

   const diff = Math.max(0, target.getTime() - nowMs);
   const days = Math.floor(diff / 86_400_000);
   const hours = Math.floor((diff % 86_400_000) / 3_600_000);
   const minutes = Math.floor((diff % 3_600_000) / 60_000);
   const seconds = Math.floor((diff % 60_000) / 1000);

   return {
      days,
      hours,
      minutes,
      seconds,
      pct,
      isBirthday: isBirthday(now),
      turning: getAge(target),
   };
};

const pad = (n: number): string => n.toString().padStart(2, "0");

const Unit: React.FC<{ value: string; label: string }> = ({ value, label }) => (
   <div className="flex flex-1 flex-col items-center">
      <span className="tabnum font-mono text-xl leading-none font-semibold tracking-tight text-foreground">
         {value}
      </span>
      <span className="mt-1.5 font-mono text-[0.6rem] tracking-[0.18em] text-muted-foreground uppercase">
         {label}
      </span>
   </div>
);

const Separator: React.FC = () => (
   <span
      aria-hidden
      className="self-start pt-px font-mono text-xl leading-none font-semibold text-border"
   >
      :
   </span>
);

const BirthdayCard: React.FC = () => {
   // The countdown only mounts inside the portalled hover content, which renders
   // client-side after hover — so seeding state from the clock is hydration-safe.
   const [nowMs, setNowMs] = React.useState(() => Date.now());
   React.useEffect(() => {
      const id = setInterval(() => setNowMs(Date.now()), 1000);
      return () => clearInterval(id);
   }, []);

   const c = computeCountdown(nowMs);

   if (c.isBirthday) {
      return (
         <div className="flex flex-col items-center gap-2 py-2 text-center">
            <PartyPopper className="h-6 w-6 text-brand" />
            <p className="text-sm font-medium text-foreground">
               It&rsquo;s my birthday today
            </p>
            <p className="text-xs text-muted-foreground">
               Turning {wordForNumber(c.turning)} — born {BORN}.
            </p>
         </div>
      );
   }

   return (
      <div>
         <div className="flex items-center gap-2">
            <Cake className="h-3.5 w-3.5 shrink-0 text-brand" />
            <span className="font-mono text-[0.6rem] tracking-[0.18em] text-muted-foreground uppercase">
               Born
            </span>
            <span className="ml-auto text-sm font-medium text-foreground">
               {BORN}
            </span>
         </div>

         <div className="my-3 h-px w-full bg-border/60" />

         <div className="mb-2.5 flex items-center gap-2">
            <Gift className="h-3.5 w-3.5 shrink-0 text-brand" />
            <span className="font-mono text-[0.6rem] tracking-[0.18em] text-muted-foreground uppercase">
               Next birthday
            </span>
            <span className="ml-auto text-xs text-muted-foreground">
               turning{" "}
               <span className="font-medium text-foreground">
                  {wordForNumber(c.turning)}
               </span>
            </span>
         </div>

         <div className="flex items-center gap-1.5">
            <Unit value={String(c.days)} label="days" />
            <Separator />
            <Unit value={pad(c.hours)} label="hrs" />
            <Separator />
            <Unit value={pad(c.minutes)} label="min" />
            <Separator />
            <Unit value={pad(c.seconds)} label="sec" />
         </div>

         <div className="mt-3.5">
            <div
               className="h-1 w-full overflow-hidden rounded-full bg-border/60"
               role="progressbar"
               aria-valuenow={Math.round(c.pct)}
               aria-valuemin={0}
               aria-valuemax={100}
               aria-label="Progress through this year of life"
            >
               <motion.div
                  className="h-full rounded-full bg-brand"
                  initial={false}
                  animate={{ width: `${c.pct}%` }}
                  transition={{ ease: "linear", duration: 0.9 }}
               />
            </div>
            <p className="mt-1.5 text-right font-mono text-[0.6rem] tracking-[0.14em] text-muted-foreground/80 uppercase">
               {c.pct.toFixed(1)}% of the way to {wordForNumber(c.turning)}
            </p>
         </div>
      </div>
   );
};

/* -------------------------------------------------------------------------- */
/*  Full-page confetti rain                                                    */
/* -------------------------------------------------------------------------- */

const EMOJIS = ["🎉", "🎂", "🥳", "🎈", "🎊", "✨", "🍰", "🎁", "🪅"];
// Festive palette — brand blue leads, the rest are confetti staples.
const COLORS = [
   "#2563eb",
   "#60a5fa",
   "#f59e0b",
   "#ec4899",
   "#10b981",
   "#a855f7",
   "#ef4444",
   "#facc15",
];

const COUNT = 240;
/** The reveal card drops in first; the rain ramps in as it lifts away. */
const RAIN_DELAY_MS = 1500;
/** Longest piece lifetime (rain delay + max stagger + max duration) + buffer. */
const LIFETIME_MS = 13_000;
const DAY_MS = 86_400_000;

type Piece = {
   id: number;
   emoji: string | null;
   color: string;
   left: number;
   size: number;
   drift: number;
   spin: number;
   duration: number;
   delay: number;
};

const rand = (min: number, max: number): number =>
   min + Math.random() * (max - min);

const makePiece = (id: number): Piece => {
   const asEmoji = Math.random() < 0.55;
   return {
      id,
      emoji: asEmoji
         ? EMOJIS[Math.floor(Math.random() * EMOJIS.length)]!
         : null,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]!,
      left: rand(0, 100),
      size: asEmoji ? rand(20, 48) : rand(8, 16),
      drift: rand(-200, 200),
      spin: rand(-900, 900),
      duration: rand(4, 7.5),
      delay: RAIN_DELAY_MS / 1000 + rand(0, 2.8),
   };
};

// Remounted via a `key` prop on each burst, so a plain empty-dep memo is enough
// to give every celebration a fresh random layout.
const Burst: React.FC = () => {
   const pieces = React.useMemo(
      () => Array.from({ length: COUNT }, (_, i) => makePiece(i)),
      [],
   );

   return (
      <>
         {pieces.map((p) => (
            <span
               key={p.id}
               className="confetti-piece"
               style={
                  {
                     left: `${p.left}%`,
                     fontSize: p.emoji ? `${p.size}px` : undefined,
                     lineHeight: 1,
                     animationDuration: `${p.duration}s`,
                     animationDelay: `${p.delay}s`,
                     "--drift": `${p.drift}px`,
                     "--spin": `${p.spin}deg`,
                  } as React.CSSProperties
               }
            >
               {p.emoji ?? (
                  <span
                     style={{
                        display: "block",
                        width: `${p.size}px`,
                        height: `${p.size * 0.6}px`,
                        backgroundColor: p.color,
                        borderRadius: "1px",
                     }}
                  />
               )}
            </span>
         ))}
      </>
   );
};

/* -------------------------------------------------------------------------- */
/*  Celebration controller                                                     */
/* -------------------------------------------------------------------------- */

const useCelebration = () => {
   const [active, setActive] = React.useState(false);
   const [burst, setBurst] = React.useState(0);
   const firedRef = React.useRef(false);
   const hideTimer = React.useRef<number | null>(null);

   const celebrate = React.useCallback((force = false) => {
      if (firedRef.current && !force) return;
      firedRef.current = true;
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
      setBurst((b) => b + 1);
      setActive(true);
      hideTimer.current = window.setTimeout(
         () => setActive(false),
         LIFETIME_MS,
      );
   }, []);

   // Auto-fire when it's 31 July in the *visitor's* timezone — `new Date()`,
   // `isBirthday`, and `nextBirthday` all run on the browser's local clock, so
   // it triggers on load if it's already the day, or exactly at local midnight
   // if the tab is left open.
   React.useEffect(() => {
      const preview = new URLSearchParams(window.location.search).has("bday");
      if (preview) {
         celebrate(true);
         return;
      }

      const sessionKey = `bday-celebrated-${new Date().getFullYear()}`;
      const already = sessionStorage.getItem(sessionKey) === "1";

      if (isBirthday() && !already) {
         sessionStorage.setItem(sessionKey, "1");
         celebrate();
         return;
      }

      // Schedule midnight only when within a day — setTimeout overflows past ~24.8d.
      const msUntil = nextBirthday().getTime() - Date.now();
      if (msUntil > 0 && msUntil <= DAY_MS) {
         const id = window.setTimeout(() => {
            sessionStorage.setItem(sessionKey, "1");
            celebrate();
         }, msUntil);
         return () => window.clearTimeout(id);
      }
   }, [celebrate]);

   React.useEffect(
      () => () => {
         if (hideTimer.current) window.clearTimeout(hideTimer.current);
      },
      [],
   );

   return { active, burst, celebrate };
};

/* -------------------------------------------------------------------------- */
/*  Public component                                                           */
/* -------------------------------------------------------------------------- */

/**
 * The age in the hero ("{age}-year-old"), wrapped in a hover card that reveals
 * the birthday and a live countdown to the next one.
 *
 * Owns the whole birthday feature: hovering shows the countdown, and the page
 * rains confetti + party emoji when the visitor's clock hits 31 July (on load,
 * or live at midnight if the tab is open). Double-click the age — or append
 * `?bday` to any URL — to fire it on demand. The confetti portals to <body>,
 * so it covers the full viewport despite living inside the hero paragraph.
 */
export const AgeBadge: React.FC<{ age: string }> = ({ age }) => {
   const reduceMotion = useReducedMotion();
   const [mounted, setMounted] = React.useState(false);
   const { active, burst, celebrate } = useCelebration();

   React.useEffect(() => setMounted(true), []);

   return (
      <>
         <HoverCard openDelay={120} closeDelay={80}>
            <HoverCardTrigger asChild>
               <button
                  type="button"
                  onDoubleClick={() => celebrate(true)}
                  className="cursor-help font-semibold text-foreground underline decoration-brand/40 decoration-dotted underline-offset-4 transition-colors select-none hover:decoration-brand/80 focus-visible:decoration-brand focus-visible:outline-none"
               >
                  {age}-year-old
               </button>
            </HoverCardTrigger>
            <HoverCardContent side="top" align="start">
               <BirthdayCard />
            </HoverCardContent>
         </HoverCard>

         {mounted &&
            active &&
            createPortal(
               <div
                  aria-hidden
                  className="pointer-events-none fixed inset-0 z-[100] overflow-hidden"
               >
                  {!reduceMotion && <Burst key={burst} />}
                  <div className="absolute inset-0 flex items-center justify-center px-6">
                     <div
                        key={burst}
                        className="birthday-reveal flex max-w-[90vw] flex-col items-center gap-1 rounded-2xl border border-border bg-popover/95 px-8 py-6 text-center shadow-2xl ring-1 ring-brand/15 backdrop-blur-md sm:px-12 sm:py-8"
                     >
                        <span className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                           Happy Birthday
                        </span>
                        <span className="font-display text-2xl font-semibold tracking-tight text-brand sm:text-4xl">
                           David 🎉
                        </span>
                     </div>
                  </div>
               </div>,
               document.body,
            )}
      </>
   );
};
