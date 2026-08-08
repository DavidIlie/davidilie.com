import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import {
   ArrowRight,
   BarChart3,
   Check,
   Clock,
   Code2,
   ExternalLink as ExternalLinkIcon,
   Mail,
   Shield,
   Zap,
} from "lucide-react";

import { GitHubGraphServer } from "~/components/github-graph-server";
import { GitHubGraphSkeleton } from "~/components/github-graph-skeleton";
import { Button } from "~/components/ui/button";
import {
   DockerIcon,
   NextjsIcon,
   PrismaIcon,
   TailwindCSSIcon,
   TypeScriptIcon,
} from "~/components/ui/icons";
import { GlobeClient } from "./globe";
import { Timeline } from "./timeline";

const techStack = [
   {
      icon: (
         <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black">
            <NextjsIcon className="h-5 w-5" />
         </div>
      ),
      name: "Next.js",
      desc: "React framework. What this site runs on.",
   },
   {
      icon: <TypeScriptIcon className="h-10 w-10" />,
      name: "TypeScript",
      desc: "Types catch bugs before you ship them.",
   },
   {
      icon: <TailwindCSSIcon className="h-10 w-10" />,
      name: "Tailwind CSS",
      desc: "Design system, no stylesheet sprawl.",
   },
   {
      icon: <DockerIcon className="h-10 w-10" />,
      name: "Docker",
      desc: "Host on Vercel, Fly, or a VPS. Same image.",
   },
   {
      icon: (
         <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
            <PrismaIcon className="h-6 w-6" />
         </div>
      ),
      name: "Prisma",
      desc: "Typed database queries. No SQL string glue.",
   },
   {
      icon: (
         <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
            <BarChart3 className="h-5 w-5 text-foreground" />
         </div>
      ),
      name: "Plausible Analytics",
      desc: "Analytics that don't need a cookie banner.",
   },
];

const DeveloperPortfolio = () => {
   return (
      <div className="mb-16">
         {/* Hero */}
         <section className="relative flex min-h-[60vh] items-center overflow-hidden md:min-h-[85vh]">
            <div className="mx-auto mt-24 max-w-6xl px-4 sm:mt-0">
               <div className="grid items-center gap-12 lg:grid-cols-2">
                  <div className="animate-fade-in-up">
                     <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-muted px-4 py-1.5">
                        <span className="relative flex h-2 w-2">
                           <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                           <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
                        </span>
                        <span className="text-sm font-medium text-brand">
                           2 spots open this month
                        </span>
                     </div>
                     <h1 className="mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
                        Your website.
                        <br />
                        <span className="text-brand">Live in 7 days.</span>
                     </h1>
                     <p className="mb-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
                        Agencies want 3 months and $15K. Upwork freelancers
                        ghost you. I&apos;m one person who ships: email Monday,
                        live Sunday, code in your GitHub.
                     </p>
                     <div className="flex flex-col gap-3 sm:flex-row">
                        <Button
                           asChild
                           size="lg"
                           className="bg-brand px-6 text-brand-foreground hover:bg-brand/90"
                        >
                           <Link href="mailto:david@davidilie.com?subject=Let's%20chat%20about%20a%20project">
                              Let&apos;s chat
                              <ArrowRight className="ml-2 h-4 w-4" />
                           </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline">
                           <Link href="#timeline">See how it works</Link>
                        </Button>
                     </div>
                     <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                           <Check className="h-3.5 w-3.5 text-brand" />6 years
                           running this exact site
                        </span>
                        <span className="flex items-center gap-1.5">
                           <Check className="h-3.5 w-3.5 text-brand" />
                           Mercedes engineer on the reference list
                        </span>
                     </div>
                  </div>
                  <div className="hidden justify-center md:flex lg:order-2 lg:justify-end">
                     <div className="h-96 w-full max-w-lg lg:h-[500px]">
                        <GlobeClient />
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Pain comparison — the real pitch */}
         <section className="mx-auto max-w-5xl px-4 py-20">
            <div className="mb-10 text-center">
               <h2 className="mb-3 text-3xl font-bold md:text-4xl">
                  Hiring a dev, <span className="text-brand">normally</span>
               </h2>
               <p className="text-muted-foreground">
                  Here&apos;s the 12 weeks you were about to sign up for.
               </p>
            </div>
            <div className="animate-fade-in-up grid gap-4 md:grid-cols-2">
               <div className="rounded-2xl border border-border/80 bg-card/40 p-6 sm:p-8">
                  <div className="mb-5 flex items-center justify-between">
                     <div className="inline-flex rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                        An agency
                     </div>
                     <div className="text-sm font-semibold text-muted-foreground">
                        ~12 weeks
                     </div>
                  </div>
                  <ol className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                     <Step week="Week 1">
                        Discovery call. Scope doc. SOW negotiation.
                     </Step>
                     <Step week="Week 3">
                        Figma draft. Two rounds of feedback you mostly dread.
                     </Step>
                     <Step week="Week 6">
                        Dev kickoff. Notion board. Slack invite.
                     </Step>
                     <Step week="Week 10">
                        Staging URL. Bugs. &ldquo;Out-of-scope&rdquo; emails.
                     </Step>
                     <Step week="Week 12">
                        Launch. $15K invoice. Login details on Google Drive.
                     </Step>
                  </ol>
               </div>
               <div className="rounded-2xl border border-brand/30 bg-brand-muted/30 p-6 sm:p-8">
                  <div className="mb-5 flex items-center justify-between">
                     <div className="inline-flex rounded-full border border-brand/40 bg-brand-muted px-3 py-1 text-xs font-medium text-brand">
                        Me
                     </div>
                     <div className="text-sm font-semibold text-brand">
                        7 days
                     </div>
                  </div>
                  <ol className="space-y-3 text-sm leading-relaxed text-foreground">
                     <Step week="Day 1" brand>
                        You email a brief. I reply with a price, same day.
                     </Step>
                     <Step week="Day 2" brand>
                        I start building. No kickoff call unless you want one.
                     </Step>
                     <Step week="Day 4" brand>
                        Staging URL. You click around, I fix things.
                     </Step>
                     <Step week="Day 7" brand>
                        Live site. Repo transferred. You own everything.
                     </Step>
                     <Step week="After" brand>
                        Fire me any time. The code works without me.
                     </Step>
                  </ol>
               </div>
            </div>
         </section>

         {/* Value props — sharper copy */}
         <section className="mx-auto max-w-6xl px-4 py-20">
            <div className="grid gap-4 md:grid-cols-3">
               {[
                  {
                     icon: <Zap className="h-5 w-5" />,
                     title: "Seven days, door to door",
                     desc: "No discovery phase. No 14-day kickoff call. Brief goes in Monday, site ships by Sunday, or your money back.",
                  },
                  {
                     icon: <Shield className="h-5 w-5" />,
                     title: "One price, upfront",
                     desc: "No hourly meter. No change-order invoices. You see the number before anyone touches a keyboard.",
                  },
                  {
                     icon: <Code2 className="h-5 w-5" />,
                     title: "The code is yours",
                     desc: "Repo transferred to your GitHub on day seven. Host anywhere. Fire me whenever. No lock-in of any kind.",
                  },
               ].map((item, i) => (
                  <div
                     key={i}
                     className="animate-fade-in-up group rounded-xl border border-border/80 bg-card/60 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:shadow-md"
                     style={{ animationDelay: `${0.1 + i * 0.1}s` }}
                  >
                     <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-brand-muted group-hover:text-brand">
                        {item.icon}
                     </div>
                     <h3 className="mb-2 text-lg font-semibold">
                        {item.title}
                     </h3>
                     <p className="text-sm leading-relaxed text-muted-foreground">
                        {item.desc}
                     </p>
                  </div>
               ))}
            </div>
         </section>

         {/* Testimonial */}
         <section className="mx-auto max-w-4xl px-4 py-10">
            <div className="animate-fade-in-up rounded-2xl border border-border/80 bg-gradient-to-br from-muted via-card to-muted/50 p-8 sm:p-12">
               <div className="mx-auto max-w-3xl text-center">
                  <div className="mb-6 font-serif text-5xl leading-none text-muted-foreground/40">
                     &ldquo;
                  </div>
                  <blockquote className="mb-8 text-xl leading-relaxed font-medium text-foreground sm:text-2xl">
                     I have never worked with someone who understands and
                     executes exactly what I want. I&apos;m impressed.
                  </blockquote>
                  <div>
                     <div className="font-semibold">Alex</div>
                     <div className="text-sm text-muted-foreground">
                        Engineer at Mercedes-Benz &middot; MBRetrofit Tools
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Tech stack */}
         <section className="mx-auto max-w-6xl px-4 py-20">
            <div className="mb-10 text-center">
               <h2 className="mb-3 text-3xl font-bold md:text-4xl">
                  Built on the same stack I&apos;d pick{" "}
                  <span className="text-brand">for myself</span>
               </h2>
               <p className="mx-auto max-w-xl text-muted-foreground">
                  Boring technology. Proven. The exact tools powering the site
                  you&apos;re on right now.
               </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
               {techStack.map((tech, i) => (
                  <div
                     key={i}
                     className="animate-fade-in-up flex items-center gap-4 rounded-xl border border-border/80 bg-card/60 p-4 transition-all duration-200 hover:border-border hover:shadow-xs"
                     style={{ animationDelay: `${i * 0.05}s` }}
                  >
                     <div className="flex-shrink-0">{tech.icon}</div>
                     <div>
                        <h3 className="font-semibold">{tech.name}</h3>
                        <p className="text-sm text-muted-foreground">
                           {tech.desc}
                        </p>
                     </div>
                  </div>
               ))}
            </div>
         </section>

         {/* Interactive timeline */}
         <section id="timeline" className="mx-auto max-w-6xl px-4 py-20">
            <div className="mb-10 text-center">
               <h2 className="mb-3 text-3xl font-bold md:text-4xl">
                  A week with me, <span className="text-brand">day by day</span>
               </h2>
               <p className="mx-auto max-w-xl text-muted-foreground">
                  Click a day. Or don&apos;t. It&apos;ll advance on its own.
               </p>
            </div>
            <Timeline />
         </section>

         {/* Founder */}
         <section className="mx-auto max-w-4xl px-4 py-20">
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
                        Builder of the thing you&apos;re looking at
                     </div>
                  </div>
               </div>
               <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  <p>
                     I&apos;ve been shipping websites since I was 12. I run this
                     site solo, built it from nothing six years ago, and I still
                     rewrite pieces of it when I get bored. It&apos;s part
                     portfolio, part testing ground, part stubborn refusal to
                     use someone else&apos;s template.
                  </p>
                  <p>
                     When you hire me, you get me. Not a junior I offloaded the
                     work to. Not a Slack channel with four account managers.
                     The same person replying to your email is the one pushing
                     commits at 2am.
                  </p>
                  <p>
                     If that sounds like your kind of thing, send me an email.
                     If it doesn&apos;t, no hard feelings. An agency will
                     absolutely love you.
                  </p>
               </div>
               <div className="mt-6 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full border border-border bg-secondary px-3 py-1 font-medium text-secondary-foreground">
                     6 years running this site
                  </span>
                  <span className="rounded-full border border-border bg-secondary px-3 py-1 font-medium text-secondary-foreground">
                     Europe-based
                  </span>
                  <span className="rounded-full border border-border bg-secondary px-3 py-1 font-medium text-secondary-foreground">
                     Replies same day
                  </span>
               </div>
            </div>
         </section>

         {/* Pricing */}
         <section id="pricing" className="mx-auto max-w-6xl px-4 py-20">
            <div className="mb-12 text-center">
               <div className="mb-4 inline-flex rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  Less than an agency&apos;s invoice for Week 3
               </div>
               <h2 className="mb-3 text-3xl font-bold md:text-4xl">
                  Pick a <span className="text-brand">number</span>
               </h2>
               <p className="text-muted-foreground">
                  One price, paid once. No subscription. No surprise invoice in
                  month four.
               </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
               <PricingCard
                  title="Landing page"
                  price="$499*"
                  subtitle="one-time"
                  description="For showing up on Google, looking legit, and converting clicks."
                  features={[
                     "Up to 5 pages",
                     "Frontend polish + responsive UI",
                     "Responsive, fast, SEO-ready",
                     "Contact form wired up",
                     "Analytics + basic tracking",
                     "Delivered in 7 days",
                     "2 weeks of fixes after launch",
                  ]}
                  cta="Start here"
                  href="mailto:david@davidilie.com?subject=Landing%20page%20project"
               />
               <PricingCard
                  title="Web app"
                  price="$1,499*"
                  subtitle="one-time"
                  description="A real product: auth, database, an admin, the whole thing."
                  features={[
                     "Everything in landing page",
                     "Frontend skills included",
                     "User accounts + auth",
                     "Database + hosting configured",
                     "Admin dashboard",
                     "Payments (Stripe) if you need it",
                     "30 days of post-launch support",
                     "Full source code, your GitHub",
                  ]}
                  cta="Build the app"
                  href="mailto:david@davidilie.com?subject=Web%20app%20project"
                  featured
               />
               <PricingCard
                  title="Something weirder"
                  price="Let's talk*"
                  description="Scraping, integrations, AI features, migrations, anything off-menu."
                  features={[
                     "Custom feature work",
                     "Frontend fixes + interface polish",
                     "Third-party integrations",
                     "AI / LLM features",
                     "Migrations + rescue projects",
                     "Priced after a 15-min call",
                  ]}
                  cta="Describe it"
                  href="mailto:david@davidilie.com?subject=Custom%20project"
               />
            </div>
         </section>

         {/* Guarantees */}
         <section className="mx-auto max-w-4xl px-4 py-10">
            <div className="grid gap-6 md:grid-cols-2">
               <div className="animate-fade-in-up flex items-start gap-4 rounded-xl border border-border/80 bg-card/60 p-6">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-muted text-brand">
                     <Clock className="h-5 w-5" />
                  </div>
                  <div>
                     <h3 className="mb-1 font-semibold">
                        Live in 7 days or you don&apos;t pay
                     </h3>
                     <p className="text-sm text-muted-foreground">
                        If I miss the deadline, full refund. No lawyers, no
                        clauses.
                     </p>
                  </div>
               </div>
               <div
                  className="animate-fade-in-up flex items-start gap-4 rounded-xl border border-border/80 bg-card/60 p-6"
                  style={{ animationDelay: "0.1s" }}
               >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-muted text-brand">
                     <Code2 className="h-5 w-5" />
                  </div>
                  <div>
                     <h3 className="mb-1 font-semibold">
                        Repo in your GitHub on day seven
                     </h3>
                     <p className="text-sm text-muted-foreground">
                        100% of the code, all commits, all assets. You can fire
                        me and host it elsewhere the next day.
                     </p>
                  </div>
               </div>
            </div>
         </section>

         {/* Live GitHub graph — proof I actually ship */}
         <section className="mx-auto max-w-6xl px-4 py-20">
            <div className="mb-8 text-center">
               <h2 className="mb-3 text-3xl font-bold md:text-4xl">
                  Proof I&apos;m{" "}
                  <span className="text-brand">actually shipping</span>
               </h2>
               <p className="mx-auto max-w-xl text-muted-foreground">
                  Pulled live from GitHub. If the squares go dark, feel free to
                  call me lazy.
               </p>
            </div>
            <Suspense fallback={<GitHubGraphSkeleton />}>
               <GitHubGraphServer />
            </Suspense>

            {/* ZeroCut receipt card */}
            <div className="mt-8 overflow-hidden rounded-2xl border border-border/80 bg-card/40">
               <div className="grid gap-0 md:grid-cols-[1fr_1.1fr]">
                  <div className="flex flex-col justify-center gap-4 p-6 sm:p-8 md:p-10">
                     <div className="inline-flex w-fit items-center gap-2 rounded-full border border-brand/30 bg-brand-muted px-3 py-1 font-mono text-[0.65rem] tracking-[0.2em] text-brand uppercase">
                        <span className="relative flex h-1.5 w-1.5">
                           <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                           <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
                        </span>
                        Most recent build
                     </div>
                     <h3 className="text-2xl leading-tight font-bold sm:text-3xl">
                        I built <span className="text-brand">ZeroCut</span> in
                        exactly 1 week.
                     </h3>
                     <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                        End to end. Landing page, Stripe, auth, dashboard,
                        donation flow, deploy. Seven days from empty repo to
                        live URL. The commit history is right above this card if
                        you don&apos;t believe me.
                     </p>
                     <div className="flex flex-wrap gap-2">
                        <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                           Next.js
                        </span>
                        <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                           Stripe
                        </span>
                        <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                           Shipped in 7d
                        </span>
                     </div>
                     <div className="pt-2">
                        <Link
                           href="https://www.zerocut.gg"
                           target="_blank"
                           rel="noreferrer"
                           className="inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-brand/80"
                        >
                           zerocut.gg
                           <ExternalLinkIcon className="h-3.5 w-3.5" />
                        </Link>
                     </div>
                  </div>
                  <div className="relative aspect-[16/10] overflow-hidden border-t border-border/60 bg-muted/30 md:border-t-0 md:border-l">
                     <Image
                        src="/static/zerocut.png"
                        alt="ZeroCut built in 7 days"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                     />
                  </div>
               </div>
            </div>
         </section>

         {/* FAQ */}
         <section className="mx-auto max-w-4xl px-4 py-20">
            <div className="mb-10 text-center">
               <h2 className="mb-3 text-3xl font-bold md:text-4xl">
                  The questions{" "}
                  <span className="text-brand">everyone asks</span>
               </h2>
            </div>
            <div className="space-y-3">
               {[
                  {
                     q: "Seven days, really? What's the catch?",
                     a: "No catch. I take on one project at a time. My stack is Next.js and Tailwind. I've shipped dozens of sites on it, so most of the week is your project, not me learning. If your scope is genuinely a two-month build, I'll tell you on day one.",
                  },
                  {
                     q: "What if I want changes after launch?",
                     a: "You own the repo, so any developer can pick it up. Most clients send me small change requests for months. I'll quote them per batch. No retainer, no monthly fee.",
                  },
                  {
                     q: "Can you work with my designer / my existing Figma?",
                     a: "Yes. Bring a Figma, a mood board, a Dribbble link, or just three sites you like. If you have nothing, I'll design it too. I've done it both ways.",
                  },
                  {
                     q: "Do you do Shopify / Webflow / Wordpress?",
                     a: "No. I build custom sites with real code. If your project is Shopify-shaped, an agency is cheaper and better for you. I'll say so.",
                  },
                  {
                     q: "What if I miss the feedback window and you ship something I hate?",
                     a: "We'll have had at least one round on staging before that happens. And I usually overshoot one revision round past what I quoted. Nobody wants a bad launch less than I do.",
                  },
                  {
                     q: "How do payments work?",
                     a: "50% when we agree on scope, 50% when I transfer the repo. Stripe, bank transfer, or wire. No subscriptions, no auto-renewals.",
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
         </section>

         {/* Final CTA */}
         <section className="mx-auto max-w-4xl px-4 py-20">
            <div className="animate-fade-in-up rounded-2xl border border-border/80 bg-gradient-to-br from-muted via-card to-muted/50 p-8 text-center sm:p-12">
               <h3 className="mb-3 text-2xl font-bold sm:text-3xl">
                  Alright, let&apos;s chat.
               </h3>
               <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
                  Shoot me an email with two sentences about what you want.
                  I&apos;ll reply with a price, a start date, and a question or
                  two. If we&apos;re a fit, we&apos;re a fit.
               </p>
               <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button
                     asChild
                     size="lg"
                     className="bg-brand text-brand-foreground hover:bg-brand/90"
                  >
                     <Link href="mailto:david@davidilie.com?subject=Let's%20chat%20about%20a%20project">
                        <Mail className="mr-2 h-4 w-4" />
                        Send me an email
                     </Link>
                  </Button>
                  <span className="text-xs text-muted-foreground">
                     david@davidilie.com &middot; usually reply same day
                  </span>
               </div>
            </div>
         </section>
      </div>
   );
};

const Step = ({
   week,
   brand,
   children,
}: {
   week: string;
   brand?: boolean;
   children: React.ReactNode;
}) => (
   <li className="flex gap-3">
      <span
         className={`mt-0.5 flex-shrink-0 font-mono text-xs font-semibold tracking-wider uppercase ${
            brand ? "text-brand" : "text-muted-foreground/70"
         }`}
         style={{ minWidth: "3.75rem" }}
      >
         {week}
      </span>
      <span>{children}</span>
   </li>
);

const PricingCard = ({
   title,
   price,
   subtitle,
   description,
   features,
   cta,
   href,
   featured,
}: {
   title: string;
   price: string;
   subtitle?: string;
   description: string;
   features: string[];
   cta: string;
   href: string;
   featured?: boolean;
}) => (
   <div
      className={`animate-fade-in-up relative rounded-2xl border p-8 transition-all duration-200 ${
         featured
            ? "border-brand/30 bg-brand-muted/50 shadow-xs"
            : "border-border/80 bg-card/60"
      }`}
   >
      {featured && (
         <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="rounded-full bg-brand px-4 py-1 text-xs font-medium text-brand-foreground">
               Most projects
            </span>
         </div>
      )}
      <div className="mb-6 text-center">
         <h3 className="mb-2 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
            {title}
         </h3>
         <div className="mb-1 text-4xl font-bold">{price}</div>
         {subtitle && (
            <div className="text-sm text-muted-foreground">{subtitle}</div>
         )}
         <p className="mt-3 text-sm text-muted-foreground">{description}</p>
      </div>
      <ul className="mb-8 space-y-3">
         {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
               <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
               <span>{feature}</span>
            </li>
         ))}
      </ul>
      <p className="mb-5 text-xs leading-relaxed text-muted-foreground">
         * Standard pricing. Final pricing depends on project complexity.
      </p>
      <Button
         asChild
         className={`w-full ${
            featured ? "bg-brand text-brand-foreground hover:bg-brand/90" : ""
         }`}
         variant={featured ? "default" : "outline"}
      >
         <Link href={href}>{cta}</Link>
      </Button>
   </div>
);

export default DeveloperPortfolio;
