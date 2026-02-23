"use client";

import React from "react";
import Link from "next/link";
import {
   ArrowRight,
   BarChart3,
   Check,
   Clock,
   Code2,
   Shield,
   Zap,
} from "lucide-react";

import { Button } from "~/components/ui/button";
import {
   DockerIcon,
   NextjsIcon,
   PrismaIcon,
   TailwindCSSIcon,
   TypeScriptIcon,
} from "~/components/ui/icons";
import { GlobeClient } from "./globe";

const techStack = [
   {
      icon: (
         <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-black">
            <NextjsIcon className="h-5 w-5" />
         </div>
      ),
      name: "Next.js",
      desc: "React framework for production",
   },
   {
      icon: <TypeScriptIcon className="h-10 w-10" />,
      name: "TypeScript",
      desc: "Type-safe, reliable code",
   },
   {
      icon: <TailwindCSSIcon className="h-10 w-10" />,
      name: "Tailwind CSS",
      desc: "Beautiful responsive designs",
   },
   {
      icon: <DockerIcon className="h-10 w-10" />,
      name: "Docker",
      desc: "Vercel or self-hosted deploy",
   },
   {
      icon: (
         <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
            <PrismaIcon className="h-6 w-6" />
         </div>
      ),
      name: "Prisma",
      desc: "Type-safe database queries",
   },
   {
      icon: (
         <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
            <BarChart3 className="h-5 w-5 text-gray-700 dark:text-gray-300" />
         </div>
      ),
      name: "Plausible Analytics",
      desc: "Privacy-friendly analytics",
   },
];

const DeveloperPortfolio = () => {
   return (
      <div className="mb-16">
         {/* Hero */}
         <section className="relative flex min-h-[85vh] items-center overflow-hidden">
            <div className="mx-auto mt-24 max-w-6xl px-4 sm:mt-0">
               <div className="grid items-center gap-12 lg:grid-cols-2">
                  <div className="animate-fade-in-up">
                     <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/80 px-4 py-1.5 dark:border-blue-800/40 dark:bg-blue-950/30">
                        <span className="relative flex h-2 w-2">
                           <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                           <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
                        </span>
                        <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                           Available for projects
                        </span>
                     </div>
                     <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                        Launch Your Website
                        <br />
                        <span className="gradient-text">in 1 Week</span>
                     </h1>
                     <p className="mb-8 max-w-xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                        Turn your idea into a live website customers can use.
                        Fast execution, zero compromises on quality.
                     </p>
                     <div className="flex flex-col gap-3 sm:flex-row">
                        <Button
                           asChild
                           size="lg"
                           className="bg-blue-600 px-6 text-white hover:bg-blue-700"
                        >
                           <Link href="mailto:david@davidilie.com">
                              Book My Spot
                              <ArrowRight className="ml-2 h-4 w-4" />
                           </Link>
                        </Button>
                        <Button
                           asChild
                           size="lg"
                           variant="outline"
                           className="dark:border-gray-700 dark:text-gray-200"
                        >
                           <Link href="#pricing">View Pricing</Link>
                        </Button>
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

         {/* Value Propositions */}
         <section className="mx-auto max-w-6xl px-4 py-20">
            <div className="grid gap-4 md:grid-cols-3">
               {[
                  {
                     icon: <Zap className="h-5 w-5" />,
                     title: "1-Week Delivery",
                     desc: "Your website goes live in exactly one week. Guaranteed delivery or your money back.",
                  },
                  {
                     icon: <Shield className="h-5 w-5" />,
                     title: "Fixed Pricing",
                     desc: "One transparent price with no hidden fees. You know exactly what you're paying upfront.",
                  },
                  {
                     icon: <Code2 className="h-5 w-5" />,
                     title: "Full Ownership",
                     desc: "You own 100% of the source code and all assets. No lock-in, no recurring fees.",
                  },
               ].map((item, i) => (
                  <div
                     key={i}
                     className="animate-fade-in-up group rounded-xl border border-gray-200/80 bg-white/60 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md dark:border-gray-700/50 dark:bg-gray-800/40 dark:hover:border-gray-600"
                     style={{ animationDelay: `${0.1 + i * 0.1}s` }}
                  >
                     <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600 dark:bg-gray-700/80 dark:text-gray-400 dark:group-hover:bg-blue-900/30 dark:group-hover:text-blue-400">
                        {item.icon}
                     </div>
                     <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                     <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                        {item.desc}
                     </p>
                  </div>
               ))}
            </div>
         </section>

         {/* Tech Stack */}
         <section className="mx-auto max-w-6xl px-4 py-20">
            <div className="mb-10 text-center">
               <h2 className="mb-3 text-3xl font-bold md:text-4xl">
                  Built with{" "}
                  <span className="gradient-text">Modern Tech</span>
               </h2>
               <p className="text-gray-600 dark:text-gray-400">
                  Industry-standard tools for quality and scalability
               </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
               {techStack.map((tech, i) => (
                  <div
                     key={i}
                     className="animate-fade-in-up flex items-center gap-4 rounded-xl border border-gray-200/80 bg-white/60 p-4 transition-all duration-200 hover:border-gray-300 hover:shadow-sm dark:border-gray-700/50 dark:bg-gray-800/40 dark:hover:border-gray-600"
                     style={{ animationDelay: `${i * 0.05}s` }}
                  >
                     <div className="flex-shrink-0">{tech.icon}</div>
                     <div>
                        <h3 className="font-semibold">{tech.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                           {tech.desc}
                        </p>
                     </div>
                  </div>
               ))}
            </div>
         </section>

         {/* Testimonial */}
         <section className="mx-auto max-w-6xl px-4 py-20">
            <div className="animate-fade-in-up rounded-2xl border border-gray-200/80 bg-gradient-to-br from-gray-50 via-white to-gray-50/50 p-8 dark:border-gray-700/50 dark:from-gray-800/60 dark:via-gray-900/40 dark:to-gray-800/30 sm:p-12">
               <div className="mx-auto max-w-3xl text-center">
                  <div className="mb-6 font-serif text-5xl text-gray-300 dark:text-gray-600">
                     &ldquo;
                  </div>
                  <blockquote className="mb-8 text-xl font-medium leading-relaxed text-gray-800 dark:text-gray-200 sm:text-2xl">
                     I have never worked with someone who understands and
                     executes exactly what I want, I am impressed.
                  </blockquote>
                  <div>
                     <div className="font-semibold">Alex</div>
                     <div className="text-sm text-gray-500 dark:text-gray-400">
                        Mercedes Engineer
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* Pricing */}
         <section id="pricing" className="mx-auto max-w-6xl px-4 py-20">
            <div className="mb-12 text-center">
               <h2 className="mb-3 text-3xl font-bold md:text-4xl">
                  Simple,{" "}
                  <span className="gradient-text">Transparent</span>{" "}
                  Pricing
               </h2>
               <p className="text-gray-600 dark:text-gray-400">
                  Choose the plan that fits your project
               </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
               <PricingCard
                  title="Simple Website"
                  price="$499"
                  subtitle="one-time"
                  description="Perfect for showcase websites without advanced features."
                  features={[
                     "Modern responsive design",
                     "Up to 5 pages",
                     "Contact forms",
                     "Basic SEO setup",
                     "1-week delivery",
                     "2 weeks support",
                  ]}
                  cta="Get Started"
                  href="mailto:david@davidilie.com?subject=Simple Website Project"
               />
               <PricingCard
                  title="Complete Web App"
                  price="$1499"
                  subtitle="one-time"
                  description="Everything you need to launch your web application."
                  features={[
                     "Complete web app development",
                     "1-week delivery guarantee",
                     "Modern tech stack",
                     "Mobile responsive design",
                     "Database setup & hosting",
                     "Authentication system",
                     "Admin dashboard",
                     "1 month support included",
                     "Source code ownership",
                  ]}
                  cta="Start Your Project"
                  href="mailto:david@davidilie.com?subject=Complete Web App Project"
                  featured
               />
               <PricingCard
                  title="Custom Request"
                  price="On Demand"
                  description="For specific or complex requirements that need custom solutions."
                  features={[
                     "Custom feature development",
                     "Complex integrations",
                     "Advanced functionality",
                     "Scalable architecture",
                     "Priority support",
                     "Team consultation",
                  ]}
                  cta="Contact Me"
                  href="mailto:david@davidilie.com?subject=Custom Development Project"
               />
            </div>
         </section>

         {/* Guarantees */}
         <section className="mx-auto max-w-4xl px-4 py-20">
            <div className="grid gap-6 md:grid-cols-2">
               <div className="animate-fade-in-up flex items-start gap-4 rounded-xl border border-gray-200/80 bg-white/60 p-6 dark:border-gray-700/50 dark:bg-gray-800/40">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                     <Clock className="h-5 w-5" />
                  </div>
                  <div>
                     <h3 className="mb-1 font-semibold">
                        1-Week Delivery Guarantee
                     </h3>
                     <p className="text-sm text-gray-600 dark:text-gray-400">
                        Delivery guaranteed in 1 week or your money back. No
                        exceptions.
                     </p>
                  </div>
               </div>
               <div
                  className="animate-fade-in-up flex items-start gap-4 rounded-xl border border-gray-200/80 bg-white/60 p-6 dark:border-gray-700/50 dark:bg-gray-800/40"
                  style={{ animationDelay: "0.1s" }}
               >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                     <Code2 className="h-5 w-5" />
                  </div>
                  <div>
                     <h3 className="mb-1 font-semibold">
                        Source Code Included
                     </h3>
                     <p className="text-sm text-gray-600 dark:text-gray-400">
                        You own 100% of the source code and all assets. Full
                        repository access.
                     </p>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
};

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
            ? "border-blue-300/60 bg-blue-50/40 shadow-sm dark:border-blue-700/40 dark:bg-blue-950/20"
            : "border-gray-200/80 bg-white/60 dark:border-gray-700/50 dark:bg-gray-800/40"
      }`}
   >
      {featured && (
         <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="rounded-full bg-blue-600 px-4 py-1 text-xs font-medium text-white">
               Popular
            </span>
         </div>
      )}
      <div className="mb-6 text-center">
         <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            {title}
         </h3>
         <div className="mb-1 text-4xl font-bold">{price}</div>
         {subtitle && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
               {subtitle}
            </div>
         )}
         <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            {description}
         </p>
      </div>
      <ul className="mb-8 space-y-3">
         {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
               <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
               <span>{feature}</span>
            </li>
         ))}
      </ul>
      <Button
         asChild
         className={`w-full ${
            featured
               ? "bg-blue-600 text-white hover:bg-blue-700"
               : ""
         }`}
         variant={featured ? "default" : "outline"}
      >
         <Link href={href}>{cta}</Link>
      </Button>
   </div>
);

export default DeveloperPortfolio;
