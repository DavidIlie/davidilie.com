"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, Monitor, Smartphone } from "lucide-react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";

import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

import ExternalLink from "~/components/external-link";
import { Button } from "~/components/ui/button";
import {
   AfterEffectsIcon,
   IllustratorIcon,
   PhotoshopIcon,
   PremiereIcon,
} from "~/components/ui/icons";
import ChiefPatLogo from "../../../public/static/chief-pat-logo.jpg";
import Header from "./header";
import { Turnaround } from "./turnaround";

const EditingPortfolioPage = () => {
   return (
      <>
         <Header />

         {/* Proof strip */}
         <div className="mx-auto mb-20 max-w-6xl px-4">
            <div className="animate-fade-in-up grid gap-px overflow-hidden rounded-2xl border border-border/80 bg-border/60 sm:grid-cols-4">
               <Stat value="7+" label="years editing" />
               <Stat value="2.4M" label="subs on biggest channel" />
               <Stat value="10K+" label="views on my own videos" />
               <Stat value="< 7d" label="typical turnaround" />
            </div>
         </div>

         {/* Pain / contrast — what you usually get vs me */}
         <div className="mx-auto mb-20 max-w-5xl px-4">
            <div className="mb-10 text-center">
               <h2 className="mb-3 text-3xl font-bold md:text-4xl">
                  Why your videos aren&apos;t{" "}
                  <span className="text-brand">hitting</span>
               </h2>
               <p className="text-muted-foreground">
                  Good footage, bad cut. It&apos;s almost always the cut.
               </p>
            </div>

            <div className="animate-fade-in-up grid gap-4 md:grid-cols-2">
               <div className="rounded-2xl border border-border/80 bg-card/40 p-6 sm:p-8">
                  <div className="mb-4 inline-flex rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                     Most editors
                  </div>
                  <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                     <li>
                        Turn raw footage into a competent timeline and call it
                        done.
                     </li>
                     <li>
                        Same royalty-free loop, same zoom-in, same beat drop.
                     </li>
                     <li>
                        Two-week turnaround. Every revision is a fresh invoice.
                     </li>
                     <li>
                        Have never actually run a channel, so retention is an
                        abstract idea to them.
                     </li>
                  </ul>
               </div>
               <div className="rounded-2xl border border-brand/30 bg-brand-muted/30 p-6 sm:p-8">
                  <div className="mb-4 inline-flex rounded-full border border-brand/40 bg-brand-muted px-3 py-1 text-xs font-medium text-brand">
                     What I do
                  </div>
                  <ul className="space-y-3 text-sm leading-relaxed text-foreground">
                     <li>
                        Cut for the drop-off point. The first 15 seconds decide
                        the video.
                     </li>
                     <li>
                        B-roll, sound design, pacing: the parts people feel but
                        can&apos;t name.
                     </li>
                     <li>
                        Usually under a week. Revisions until you&apos;re happy,
                        not until the invoice runs out.
                     </li>
                     <li>
                        I script, shoot, and edit my own videos. I know what the
                        retention graph looks like from both sides.
                     </li>
                  </ul>
               </div>
            </div>
         </div>

         {/* Collaborations — proof */}
         <div className="mx-auto mb-20 max-w-6xl px-4" id="portfolio">
            <div className="mb-12 text-center">
               <h2 className="mb-3 text-3xl font-bold md:text-4xl">
                  The <span className="text-brand">receipts</span>
               </h2>
               <p className="text-muted-foreground">
                  Channels I&apos;ve edited for. Watch something.
               </p>
            </div>

            <div className="space-y-12">
               {/* Chief Pat — lead with the biggest */}
               <div className="animate-fade-in-up grid items-center gap-6 md:grid-cols-2 md:gap-8">
                  <div>
                     <div className="mb-3 flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-bold sm:text-2xl">
                           Chief Pat
                        </h3>
                        <span className="rounded-full border border-brand/30 bg-brand-muted px-2.5 py-0.5 text-xs font-medium text-brand">
                           2.4M subs
                        </span>
                     </div>
                     <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                        One of the biggest Clash of Clans channels on the
                        internet. High-velocity gaming content, tight
                        turnarounds, videos expected to clear seven figures of
                        views. I got trusted with the footage.
                     </p>
                     <div className="mb-4 flex flex-wrap gap-2">
                        <Tag>Gaming</Tag>
                        <Tag>Clash of Clans</Tag>
                        <Tag>High volume</Tag>
                     </div>
                     <Button asChild variant="outline" size="sm">
                        <ExternalLink url="https://www.youtube.com/user/PlayClashOfClans">
                           Visit the channel
                           <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </ExternalLink>
                     </Button>
                  </div>
                  <div className="flex h-56 items-center justify-center rounded-2xl border border-border/80 bg-gradient-to-br from-muted via-card to-muted/50 md:h-64">
                     <div className="text-center">
                        <Image
                           src={ChiefPatLogo}
                           alt="Chief Pat Logo"
                           className="mx-auto mb-3 h-20 w-20 rounded-full ring-2 ring-brand/20"
                        />
                        <p className="text-sm font-medium text-foreground">
                           Chief Pat
                        </p>
                        <p className="text-xs text-muted-foreground">
                           Gaming &middot; 2.4M subscribers
                        </p>
                     </div>
                  </div>
               </div>

               {/* Kuhrawn — from scratch */}
               <div className="animate-fade-in-up grid items-center gap-6 md:grid-cols-2 md:gap-8">
                  <div className="md:order-2">
                     <div className="mb-3 flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-bold sm:text-2xl">
                           Kuhrawn
                        </h3>
                        <span className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                           Built from zero
                        </span>
                     </div>
                     <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                        A friend&apos;s gaming channel I&apos;ve edited since
                        video one. Same editor, same voice, compounding over
                        time, which is the only way a channel actually grows.
                     </p>
                     <div className="mb-4 flex flex-wrap gap-2">
                        <Tag>Gaming</Tag>
                        <Tag>Day-one editor</Tag>
                        <Tag>Creative partner</Tag>
                     </div>
                     <Button asChild variant="outline" size="sm">
                        <ExternalLink url="https://www.youtube.com/@Kuhrawn">
                           Visit the channel
                           <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </ExternalLink>
                     </Button>
                  </div>
                  <div className="overflow-hidden rounded-2xl border border-border/80 md:order-1">
                     <LiteYouTubeEmbed
                        id="PuMlLnkT8Ns"
                        title="Kuhrawn YouTube Video"
                     />
                  </div>
               </div>

               {/* My channel — credibility */}
               <div className="animate-fade-in-up grid items-center gap-6 md:grid-cols-2 md:gap-8">
                  <div>
                     <div className="mb-3 flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-bold sm:text-2xl">
                           My own channel
                        </h3>
                        <span className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                           10K+ views
                        </span>
                     </div>
                     <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                        Tech and dev content I script, shoot, and edit alone.
                        It&apos;s the whole stack in one person, which is where
                        I learned what a retention graph is actually telling
                        you.
                     </p>
                     <div className="mb-4 flex flex-wrap gap-2">
                        <Tag>Tech</Tag>
                        <Tag>Solo production</Tag>
                        <Tag>10K+ views</Tag>
                     </div>
                     <Button asChild variant="outline" size="sm">
                        <ExternalLink url="https://www.youtube.com/@davidilie">
                           Visit my channel
                           <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </ExternalLink>
                     </Button>
                  </div>
                  <div className="overflow-hidden rounded-2xl border border-border/80">
                     <LiteYouTubeEmbed
                        id="5z28BLe0NUE"
                        title="David Ilie YouTube Video"
                        params="start=50"
                     />
                  </div>
               </div>

               {/* MBRetrofit — B2B */}
               <div className="animate-fade-in-up grid items-center gap-6 md:grid-cols-2 md:gap-8">
                  <div className="md:order-2">
                     <div className="mb-3 flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-bold sm:text-2xl">
                           MBRetrofit Tools
                        </h3>
                        <span className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                           B2B product demo
                        </span>
                     </div>
                     <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                        Demo video for a Mercedes-Benz retrofitting platform.
                        Scripted, shot, edited, delivered. The one-person
                        version of what an agency would bill you $15K for.
                     </p>
                     <div className="mb-4 flex flex-wrap gap-2">
                        <Tag>Product demo</Tag>
                        <Tag>B2B</Tag>
                        <Tag>End-to-end</Tag>
                     </div>
                  </div>
                  <div className="overflow-hidden rounded-2xl border border-border/80 md:order-1">
                     <LiteYouTubeEmbed
                        id="Su7s8Y_ABi8"
                        title="MBRetrofit Tools Demo"
                     />
                  </div>
               </div>
            </div>
         </div>

         {/* Turnaround slider — Premiere-style mock */}
         <div className="mx-auto mb-20 max-w-6xl px-4" id="turnaround">
            <div className="mb-10 text-center">
               <h2 className="mb-3 text-3xl font-bold md:text-4xl">
                  Pick a <span className="text-brand">turnaround</span>
               </h2>
               <p className="mx-auto max-w-xl text-muted-foreground">
                  Click a tier. The timeline rebuilds itself, roughly the way
                  the cut looks at each pace.
               </p>
            </div>
            <Turnaround />
         </div>

         {/* What I edit — tight 3-card row */}
         <div className="mx-auto mb-20 max-w-6xl px-4">
            <div className="mb-10 text-center">
               <h2 className="mb-3 text-3xl font-bold md:text-4xl">
                  What I <span className="text-brand">cut</span>
               </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
               {[
                  {
                     icon: <Smartphone className="h-5 w-5" />,
                     title: "Shorts, Reels, TikToks",
                     desc: "Hook in the first frame or they swipe. I cut for the thumb, not the Oscars.",
                  },
                  {
                     icon: <Monitor className="h-5 w-5" />,
                     title: "Long-form YouTube",
                     desc: "Vlogs, tutorials, gaming. Pacing does 80% of the work. I cut the deadweight and sound-design the gaps.",
                  },
                  {
                     icon: <FileText className="h-5 w-5" />,
                     title: "Video essays",
                     desc: "20-minute videos about anything, edited so a 15-year-old actually watches the whole thing.",
                  },
               ].map((item, i) => (
                  <div
                     key={i}
                     className="animate-fade-in-up rounded-xl border border-border/80 bg-card/60 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:shadow-md"
                     style={{ animationDelay: `${i * 0.08}s` }}
                  >
                     <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                        {item.icon}
                     </div>
                     <h3 className="mb-2 font-semibold">{item.title}</h3>
                     <p className="text-sm leading-relaxed text-muted-foreground">
                        {item.desc}
                     </p>
                  </div>
               ))}
            </div>
         </div>

         {/* Tools */}
         <div className="mx-auto mb-20 max-w-6xl px-4">
            <div className="animate-fade-in-up rounded-2xl border border-border/80 bg-card/40 p-6 sm:p-8">
               <div className="mb-6 text-center">
                  <h3 className="mb-1 text-lg font-semibold">The toolkit</h3>
                  <p className="text-sm text-muted-foreground">
                     7 years of muscle memory in each of these
                  </p>
               </div>
               <div className="flex flex-wrap items-center justify-center gap-10">
                  {[
                     {
                        icon: <PremiereIcon className="h-12 w-12" />,
                        name: "Premiere Pro",
                     },
                     {
                        icon: <AfterEffectsIcon className="h-12 w-12" />,
                        name: "After Effects",
                     },
                     {
                        icon: <PhotoshopIcon className="h-12 w-12" />,
                        name: "Photoshop",
                     },
                     {
                        icon: <IllustratorIcon className="h-12 w-12" />,
                        name: "Illustrator",
                     },
                  ].map((sw, i) => (
                     <div key={i} className="flex flex-col items-center gap-2">
                        {sw.icon}
                        <span className="text-xs text-muted-foreground">
                           {sw.name}
                        </span>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Founder */}
         <div className="mx-auto mb-20 max-w-4xl px-4">
            <div className="animate-fade-in-up rounded-2xl border border-border/80 bg-card/40 p-8 sm:p-10">
               <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand/60 text-2xl font-bold text-brand-foreground">
                     D
                  </div>
                  <div>
                     <div className="text-sm font-semibold">
                        Hey, I&apos;m David
                     </div>
                     <div className="text-xs text-muted-foreground">
                        Editor. Also the guy shooting and scripting
                     </div>
                  </div>
               </div>
               <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  <p>
                     I&apos;ve been editing since I was 11. My first client paid
                     me $15 for a CS:GO frag movie. It&apos;s been upwards from
                     there: a channel with 2.4M subs, a few friends&apos;
                     channels I built alongside them, a Mercedes engineer who
                     needed a product demo.
                  </p>
                  <p>
                     The reason I keep getting hired back is I run a YouTube
                     channel of my own. I know what it feels like to check the
                     retention graph at 3am and see people swipe away at 0:22. I
                     cut like someone who&apos;s been punched in the retention
                     graph.
                  </p>
                  <p>
                     If that&apos;s what your channel needs, send the footage.
                     If you just want a competent cut, there are cheaper editors
                     on Fiverr. Genuinely, no shade.
                  </p>
               </div>
               <div className="mt-6 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full border border-border bg-secondary px-3 py-1 font-medium text-secondary-foreground">
                     7 years editing
                  </span>
                  <span className="rounded-full border border-border bg-secondary px-3 py-1 font-medium text-secondary-foreground">
                     Editor + creator
                  </span>
                  <span className="rounded-full border border-border bg-secondary px-3 py-1 font-medium text-secondary-foreground">
                     Europe, fast replies
                  </span>
               </div>
            </div>
         </div>

         {/* FAQ */}
         <div className="mx-auto mb-20 w-full max-w-[90rem] px-4 sm:px-8 lg:px-16">
            <div className="mb-10 text-center">
               <h2 className="mb-3 text-3xl font-bold md:text-4xl">
                  Before you <span className="text-brand">email me</span>
               </h2>
            </div>
            <div className="space-y-3">
               {[
                  {
                     q: "What's your actual turnaround?",
                     a: "Shorts: 2-3 days. Long-form (10-20min): usually a week, two if it's an essay-style cut with heavy b-roll. I'll give you a real date when you send the footage.",
                  },
                  {
                     q: "How many revisions do I get?",
                     a: "As many as we need to get it right. I'm not running a change-order racket. If the first cut missed the mark, I'll fix it. Within reason: if you ask me to re-structure the entire narrative three times, that's a new project.",
                  },
                  {
                     q: "What do you need from me to start?",
                     a: "Raw footage (Google Drive / Frame.io link), a rough vibe reference or two, and the length you're going for. Script is a plus. Music or SFX preferences if you have them.",
                  },
                  {
                     q: "How much does it cost?",
                     a: "Depends on length, complexity, and speed. A TikTok is very different from a 20-minute essay. One email with the scope and I'll quote you same-day.",
                  },
                  {
                     q: "Can I see your raw project files?",
                     a: "For paid gigs, happy to share the .prproj on handoff. I don't sell tutorials or mentorship. I'd rather just cut your video.",
                  },
                  {
                     q: "What if my channel is small?",
                     a: "I worked with Kuhrawn when he had zero subscribers. If the content is good, the size doesn't really matter. I care about whether I'd enjoy cutting it.",
                  },
               ].map((faq, i) => (
                  <details
                     key={i}
                     className="animate-fade-in-up group rounded-xl border border-border/80 bg-card/40 p-5 transition-colors hover:border-border"
                     style={{ animationDelay: `${i * 0.05}s` }}
                  >
                     <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium sm:text-base">
                        <span>{faq.q}</span>
                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-transform group-open:rotate-45">
                           +
                        </span>
                     </summary>
                     <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {faq.a}
                     </p>
                  </details>
               ))}
            </div>
         </div>

         {/* Pricing / CTA */}
         <div className="mx-auto mb-20 max-w-4xl px-4">
            <div className="animate-fade-in-up rounded-2xl border border-border/80 bg-gradient-to-br from-muted via-card to-muted/50 p-8 sm:p-10">
               <div className="text-center">
                  <div className="mb-4 inline-flex rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground">
                     Pricing &middot; per-project, no retainers
                  </div>
                  <h3 className="mb-3 text-2xl font-bold sm:text-3xl">
                     Send the footage.
                  </h3>
                  <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
                     Quote depends on length, complexity, and how fast you need
                     it. One email tells me most of what I need to price it.
                  </p>
                  <Button
                     asChild
                     size="lg"
                     className="bg-brand text-brand-foreground hover:bg-brand/90"
                  >
                     <Link href="mailto:david@davidilie.com?subject=Editing%20project">
                        Email me
                        <ArrowRight className="ml-2 h-4 w-4" />
                     </Link>
                  </Button>
                  <p className="mt-4 text-xs text-muted-foreground">
                     Europe-based &middot; usually reply same day
                  </p>
               </div>
            </div>
         </div>

         {/* More than editor — closer */}
         <div className="mx-auto mb-20 max-w-4xl px-4">
            <div className="animate-fade-in-up rounded-2xl border border-border/80 bg-card/40 p-8 sm:p-10">
               <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                     <h3 className="mb-3 text-xl font-bold sm:text-2xl">
                        One more thing: I also build the websites
                     </h3>
                     <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                        This site is mine. Every line of it. That matters if
                        you&apos;re editing tech content (product demos, SaaS
                        intros, dev tutorials) because I actually understand
                        what you&apos;re demoing. Most editors don&apos;t.
                     </p>
                     <div className="mb-5 flex flex-wrap gap-2">
                        <Tag>React &amp; Next.js</Tag>
                        <Tag>TypeScript</Tag>
                        <Tag>UI design</Tag>
                     </div>
                  </div>
                  <Button asChild variant="outline">
                     <Link href="/developer-portfolio">
                        See the dev work
                        <ArrowRight className="ml-1.5 h-4 w-4" />
                     </Link>
                  </Button>
               </div>
            </div>
         </div>
      </>
   );
};

const Tag = ({ children }: { children: React.ReactNode }) => (
   <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
      {children}
   </span>
);

const Stat = ({ value, label }: { value: string; label: string }) => (
   <div className="bg-card/60 px-6 py-6 text-center">
      <div className="text-3xl font-bold tracking-tight text-brand sm:text-4xl">
         {value}
      </div>
      <div className="mt-1 text-xs text-muted-foreground sm:text-sm">
         {label}
      </div>
   </div>
);

export default EditingPortfolioPage;
