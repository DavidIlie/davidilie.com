"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
   ArrowRight,
   FileText,
   Globe,
   Monitor,
   Palette,
   RefreshCw,
   Smartphone,
   Zap,
} from "lucide-react";
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

const EditingPortfolioPage = () => {
   return (
      <>
         <Header />

         {/* Why Work With Me */}
         <div className="mx-auto mb-20 max-w-6xl px-4">
            <div className="mb-10 text-center">
               <h2 className="mb-3 text-3xl font-bold md:text-4xl">
                  Why <span className="gradient-text">Work With Me</span>?
               </h2>
               <p className="text-gray-600 dark:text-gray-400">
                  I don&apos;t just edit videos &ndash; I craft experiences
               </p>
            </div>

            <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
               {[
                  {
                     icon: <Zap className="h-5 w-5" />,
                     title: "Impressive Speed",
                     desc: "Lightning-fast delivery times without compromising quality",
                  },
                  {
                     icon: <RefreshCw className="h-5 w-5" />,
                     title: "Reasonable Revisions",
                     desc: "Your vision, perfected \u2013 no matter how many rounds it takes",
                  },
                  {
                     icon: <Palette className="h-5 w-5" />,
                     title: "Adobe Professional",
                     desc: "Master of Premiere Pro, After Effects, Audition & more",
                  },
                  {
                     icon: <Globe className="h-5 w-5" />,
                     title: "Europe Based",
                     desc: "Available across all timezones for global collaboration",
                  },
               ].map((item, i) => (
                  <div
                     key={i}
                     className="animate-fade-in-up group rounded-xl border border-gray-200/80 bg-white/60 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md dark:border-gray-700/50 dark:bg-gray-800/40 dark:hover:border-gray-600"
                     style={{ animationDelay: `${i * 0.1}s` }}
                  >
                     <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600 dark:bg-gray-700/80 dark:text-gray-400 dark:group-hover:bg-blue-900/30 dark:group-hover:text-blue-400">
                        {item.icon}
                     </div>
                     <h3 className="mb-2 font-semibold">{item.title}</h3>
                     <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.desc}
                     </p>
                  </div>
               ))}
            </div>

            {/* Software */}
            <div className="animate-fade-in-up rounded-xl border border-gray-200/80 bg-white/60 p-6 dark:border-gray-700/50 dark:bg-gray-800/40 sm:p-8">
               <h3 className="mb-6 text-center text-lg font-semibold">
                  Software I Master
               </h3>
               <div className="flex flex-wrap items-center justify-center gap-8">
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
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                           {sw.name}
                        </span>
                     </div>
                  ))}
               </div>
               <p className="mt-5 text-center text-sm text-gray-400 dark:text-gray-500">
                  + More professional tools for complete video production
               </p>
            </div>
         </div>

         {/* Content I Edit */}
         <div className="mx-auto mb-20 max-w-6xl px-4">
            <div className="mb-10 text-center">
               <h2 className="mb-3 text-3xl font-bold md:text-4xl">
                  Content I{" "}
                  <span className="gradient-text">Edit</span>
               </h2>
            </div>
            <div className="mb-8 grid gap-4 md:grid-cols-3">
               {[
                  {
                     icon: <Smartphone className="h-5 w-5" />,
                     title: "Short Form",
                     desc: "TikToks, YouTube Shorts, Instagram Reels \u2013 optimized for maximum engagement",
                  },
                  {
                     icon: <Monitor className="h-5 w-5" />,
                     title: "Long Form",
                     desc: "YouTube videos, tutorials, vlogs \u2013 crafted to keep viewers watching",
                  },
                  {
                     icon: <FileText className="h-5 w-5" />,
                     title: "Video Essays",
                     desc: "Deep-dive content with sophisticated editing and storytelling",
                  },
               ].map((item, i) => (
                  <div
                     key={i}
                     className="animate-fade-in-up rounded-xl border border-gray-200/80 bg-white/60 p-6 transition-all duration-200 hover:border-gray-300 hover:shadow-sm dark:border-gray-700/50 dark:bg-gray-800/40 dark:hover:border-gray-600"
                     style={{ animationDelay: `${i * 0.08}s` }}
                  >
                     <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 dark:bg-gray-700/80 dark:text-gray-400">
                        {item.icon}
                     </div>
                     <h3 className="mb-2 font-semibold">{item.title}</h3>
                     <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.desc}
                     </p>
                  </div>
               ))}
            </div>

            {/* CTA */}
            <div className="animate-fade-in-up rounded-2xl border border-gray-200/80 bg-gradient-to-br from-gray-50 via-white to-gray-50/50 p-8 text-center dark:border-gray-700/50 dark:from-gray-800/60 dark:via-gray-900/40 dark:to-gray-800/30">
               <h3 className="mb-2 text-xl font-semibold">
                  Ready to Get Started?
               </h3>
               <p className="mb-6 text-gray-600 dark:text-gray-400">
                  Pricing depends on your specific needs &ndash; let&apos;s
                  chat!
               </p>
               <Button
                  asChild
                  size="lg"
                  className="bg-blue-600 text-white hover:bg-blue-700"
               >
                  <Link href="mailto:david@davidilie.com">
                     Send me an email
                     <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
               </Button>
               <p className="mt-4 text-sm text-gray-400 dark:text-gray-500">
                  We&apos;ll schedule a call to discuss your project, timeline,
                  and pricing
               </p>
            </div>
         </div>

         {/* Collaborations */}
         <div className="mx-auto mb-20 max-w-6xl px-4" id="portfolio">
            <div className="mb-12 text-center">
               <h2 className="mb-3 text-3xl font-bold md:text-4xl">
                  My Work &{" "}
                  <span className="gradient-text">Collaborations</span>
               </h2>
               <p className="text-gray-600 dark:text-gray-400">
                  From personal content to major creators
               </p>
            </div>

            <div className="space-y-12">
               {/* Personal YouTube */}
               <div className="animate-fade-in-up grid items-center gap-6 md:grid-cols-2 md:gap-8">
                  <div>
                     <h3 className="mb-3 text-xl font-bold sm:text-2xl">
                        My Personal YouTube Channel
                     </h3>
                     <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                        My personal YouTube channel where I script, record, and
                        edit my own tech and development content. These videos
                        consistently get 10K+ views and showcase my full video
                        production capabilities.
                     </p>
                     <div className="mb-4 flex flex-wrap gap-2">
                        <Tag>Tech Content</Tag>
                        <Tag>Full Production</Tag>
                        <Tag>10K+ Views</Tag>
                     </div>
                     <Button asChild variant="outline" size="sm">
                        <ExternalLink url="https://www.youtube.com/@davidilie">
                           Visit My Channel
                           <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </ExternalLink>
                     </Button>
                  </div>
                  <div className="overflow-hidden rounded-xl border border-gray-200/80 dark:border-gray-700/50">
                     <LiteYouTubeEmbed
                        id="5z28BLe0NUE"
                        title="David Ilie YouTube Video"
                        params="start=50"
                     />
                  </div>
               </div>

               {/* Chief Pat */}
               <div className="animate-fade-in-up grid items-center gap-6 md:grid-cols-2 md:gap-8">
                  <div className="md:order-2">
                     <div className="mb-3 flex items-center gap-3">
                        <h3 className="text-xl font-bold sm:text-2xl">
                           Chief Pat
                        </h3>
                        <span className="rounded-full border border-gray-200 bg-gray-100/80 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-400">
                           2.4M+ Subscribers
                        </span>
                     </div>
                     <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                        I&apos;ve had the privilege of editing videos for Chief
                        Pat, one of the biggest Clash of Clans content creators.
                        Working with such a massive channel has given me
                        experience with high-production gaming content.
                     </p>
                     <div className="mb-4 flex flex-wrap gap-2">
                        <Tag>Gaming</Tag>
                        <Tag>Clash of Clans</Tag>
                     </div>
                     <Button asChild variant="outline" size="sm">
                        <ExternalLink url="https://www.youtube.com/user/PlayClashOfClans">
                           Visit Chief Pat&apos;s Channel
                           <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </ExternalLink>
                     </Button>
                  </div>
                  <div className="flex h-56 items-center justify-center rounded-xl border border-gray-200/80 bg-gray-50 dark:border-gray-700/50 dark:bg-gray-800/40 md:order-1 md:h-64">
                     <div className="text-center">
                        <Image
                           src={ChiefPatLogo}
                           alt="Chief Pat Logo"
                           className="mx-auto mb-3 h-20 w-20 rounded-full"
                        />
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                           Chief Pat
                        </p>
                     </div>
                  </div>
               </div>

               {/* Kuhrawn */}
               <div className="animate-fade-in-up grid items-center gap-6 md:grid-cols-2 md:gap-8">
                  <div>
                     <h3 className="mb-1 text-xl font-bold sm:text-2xl">
                        Kuhrawn
                     </h3>
                     <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
                        Built from the ground up
                     </p>
                     <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                        Kuhrawn is a good friend whose channel I&apos;ve helped
                        start from the very beginning. I&apos;ve edited all of
                        his videos and been part of the entire creative process
                        as we built his gaming channel from scratch.
                     </p>
                     <div className="mb-4 flex flex-wrap gap-2">
                        <Tag>Gaming</Tag>
                        <Tag>From Scratch</Tag>
                        <Tag>Full Partnership</Tag>
                     </div>
                     <Button asChild variant="outline" size="sm">
                        <ExternalLink url="https://www.youtube.com/@Kuhrawn">
                           Visit Kuhrawn&apos;s Channel
                           <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                        </ExternalLink>
                     </Button>
                  </div>
                  <div className="overflow-hidden rounded-xl border border-gray-200/80 dark:border-gray-700/50">
                     <LiteYouTubeEmbed
                        id="PuMlLnkT8Ns"
                        title="Kuhrawn YouTube Video"
                     />
                  </div>
               </div>

               {/* MBRetrofit Tools */}
               <div className="animate-fade-in-up grid items-center gap-6 md:grid-cols-2 md:gap-8">
                  <div className="md:order-2">
                     <h3 className="mb-1 text-xl font-bold sm:text-2xl">
                        MBRetrofit Tools
                     </h3>
                     <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
                        Product Demo
                     </p>
                     <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                        A product demo video I produced for MBRetrofit Tools,
                        showcasing the platform&apos;s capabilities for
                        Mercedes-Benz car retrofitting and diagnostics.
                     </p>
                     <div className="mb-4 flex flex-wrap gap-2">
                        <Tag>Product Demo</Tag>
                        <Tag>Tech</Tag>
                        <Tag>Full Production</Tag>
                     </div>
                  </div>
                  <div className="overflow-hidden rounded-xl border border-gray-200/80 dark:border-gray-700/50 md:order-1">
                     <LiteYouTubeEmbed
                        id="Su7s8Y_ABi8"
                        title="MBRetrofit Tools Demo"
                     />
                  </div>
               </div>
            </div>
         </div>

         {/* More Than Just an Editor */}
         <div className="mx-auto mb-20 max-w-4xl px-4">
            <div className="mb-10 text-center">
               <h2 className="mb-3 text-3xl font-bold md:text-4xl">
                  More Than Just an{" "}
                  <span className="gradient-text">Editor</span>
               </h2>
            </div>
            <div className="animate-fade-in-up rounded-2xl border border-gray-200/80 bg-gradient-to-br from-gray-50 via-white to-gray-50/50 p-8 dark:border-gray-700/50 dark:from-gray-800/60 dark:via-gray-900/40 dark:to-gray-800/30 sm:p-10">
               <p className="mb-6 text-center text-lg text-gray-600 dark:text-gray-400">
                  I&apos;m also a{" "}
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                     full-stack developer
                  </span>{" "}
                  who built this entire website from scratch. This isn&apos;t
                  just another random face in the editing world &ndash; I
                  understand technology, user experience, and what makes content
                  truly engaging.
               </p>
               <div className="mb-6 flex flex-wrap justify-center gap-2">
                  <Tag>React & Next.js</Tag>
                  <Tag>TypeScript</Tag>
                  <Tag>UI/UX Design</Tag>
                  <Tag>Video Editing</Tag>
               </div>
               <div className="text-center">
                  <Button asChild variant="outline">
                     <Link href="/developer-portfolio">
                        Explore My Development Work
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
   <span className="rounded-full border border-gray-200 bg-gray-100/80 px-3 py-1 text-xs font-medium text-gray-600 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300">
      {children}
   </span>
);

export default EditingPortfolioPage;
