"use client";

import React from "react";
import { Cake, Gift, PartyPopper } from "lucide-react";
import { motion } from "motion/react";

import { BIRTHDAY, getAge, nextBirthday, wordForNumber } from "~/lib/age";

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

   const isBirthday =
      now.getMonth() === BIRTHDAY.getMonth() &&
      now.getDate() === BIRTHDAY.getDate();

   return {
      days,
      hours,
      minutes,
      seconds,
      pct,
      isBirthday,
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

/**
 * The age in the hero ("{age}-year-old"), wrapped in a hover card that reveals
 * the birthday and a live countdown to the next one. Trigger is a real button
 * so keyboard focus opens the card too.
 */
export const AgeBadge: React.FC<{ age: string }> = ({ age }) => (
   <HoverCard openDelay={120} closeDelay={80}>
      <HoverCardTrigger asChild>
         <button
            type="button"
            className="cursor-help font-semibold text-foreground underline decoration-brand/40 decoration-dotted underline-offset-4 transition-colors hover:decoration-brand/80 focus-visible:decoration-brand focus-visible:outline-none"
         >
            {age}-year-old
         </button>
      </HoverCardTrigger>
      <HoverCardContent side="top" align="start">
         <BirthdayCard />
      </HoverCardContent>
   </HoverCard>
);
