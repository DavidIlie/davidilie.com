import React from "react";
import Image from "next/image";
import Link from "next/link";
//@ts-ignore
import { Fade, Slide } from "react-awesome-reveal";

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

export const metadata = {
   title: "Video Editing Portfolio",
   description:
      "Professional video editing services with 7+ years of experience. I've worked with creators who have millions of subscribers, delivering fast turnaround times and professional quality. Specializing in YouTube content, gaming videos, tech reviews, and video essays.",
   keywords: [
      "video editing",
      "YouTube editor",
      "professional video editing",
      "Adobe Premiere Pro",
      "After Effects",
      "gaming video editor",
      "tech video editing",
      "video essay editing",
      "content creator editor",
      "European video editor",
      "fast video editing",
      "Chief Pat editor",
      "David Ilie editor",
   ],
   openGraph: {
      url: "https://davidilie.com/editing-portfolio",
      title: "Professional Video Editing Services | David Ilie",
      description:
         "7+ years of video editing experience. Trusted by creators with millions of subscribers. Fast delivery, unlimited revisions, and professional quality guaranteed.",
      type: "website",
      siteName: "David Ilie",
      locale: "en-US",
      images: [
         {
            url: "/static/editing-portfolio-og.png",
            width: 1200,
            height: 630,
            alt: "David Ilie Video Editing Portfolio - Professional YouTube Editor",
            type: "image/png",
         },
      ],
   },
   twitter: {
      card: "summary_large_image",
      title: "Professional Video Editing Services | David Ilie",
      description:
         "7+ years editing for creators with millions of subscribers. Fast delivery, professional quality, Europe-based editor.",
      site: "@MrDavidIlie",
      creator: "@MrDavidIlie",
      images: ["/static/editing-portfolio-og.png"],
   },
};

const EditingPortfolioPage = () => {
   return (
      <>
         <Header />
         <Fade direction="up" triggerOnce cascade className="px-4">
            <div className="mx-auto mb-20 max-w-6xl">
               <div className="mb-12 text-center">
                  <h2 className="gradient-text mb-4 text-4xl font-bold md:text-5xl">
                     Why Work With Me?
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300">
                     I don&apos;t just edit videos – I craft experiences
                  </p>
               </div>

               <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-2xl bg-white p-6 text-center shadow-xl transition-all duration-300 hover:shadow-2xl dark:bg-gray-800">
                     <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600">
                        <span className="text-2xl text-white">⚡</span>
                     </div>
                     <h3 className="mb-2 text-xl font-bold">
                        IMPRESSIVE Speed
                     </h3>
                     <p className="text-gray-600 dark:text-gray-300">
                        Lightning-fast delivery times that will blow your mind
                     </p>
                  </div>

                  <div className="rounded-2xl bg-white p-6 text-center shadow-xl transition-all duration-300 hover:shadow-2xl dark:bg-gray-800">
                     <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600">
                        <span className="text-2xl text-white">🔄</span>
                     </div>
                     <h3 className="mb-2 text-xl font-bold">
                        Reasonable Revisions
                     </h3>
                     <p className="text-gray-600 dark:text-gray-300">
                        Your vision, perfected – no matter how many rounds it
                        takes
                     </p>
                  </div>

                  <div className="rounded-2xl bg-white p-6 text-center shadow-xl transition-all duration-300 hover:shadow-2xl dark:bg-gray-800">
                     <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-purple-600">
                        <span className="text-2xl text-white">🎨</span>
                     </div>
                     <h3 className="mb-2 text-xl font-bold">
                        Adobe Professional
                     </h3>
                     <p className="text-gray-600 dark:text-gray-300">
                        Master of Premiere Pro, After Effects, Audition & more
                     </p>
                  </div>

                  <div className="rounded-2xl bg-white p-6 text-center shadow-xl transition-all duration-300 hover:shadow-2xl dark:bg-gray-800">
                     <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600">
                        <span className="text-2xl text-white">🌍</span>
                     </div>
                     <h3 className="mb-2 text-xl font-bold">Europe Based</h3>
                     <p className="text-gray-600 dark:text-gray-300">
                        Available across all timezones for global collaboration
                     </p>
                  </div>
               </div>
               <div className="rounded-2xl bg-white p-8 text-center shadow-xl dark:bg-gray-800">
                  <h3 className="mb-6 text-2xl font-bold">Software I Master</h3>
                  <div className="mb-4 flex flex-wrap justify-center gap-6">
                     <div className="flex flex-col items-center">
                        <PremiereIcon className="h-16 w-16" />
                        <span className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                           Premiere Pro
                        </span>
                     </div>
                     <div className="flex flex-col items-center">
                        <AfterEffectsIcon className="h-16 w-16" />
                        <span className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                           After Effects
                        </span>
                     </div>
                     <div className="flex flex-col items-center">
                        <PhotoshopIcon className="h-16 w-16" />
                        <span className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                           Photoshop
                        </span>
                     </div>
                     <div className="flex flex-col items-center">
                        <IllustratorIcon className="h-16 w-16" />
                        <span className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                           Illustrator
                        </span>
                     </div>
                  </div>
                  <p className="text-muted-foreground">
                     + More professional tools for complete video production
                  </p>
               </div>
            </div>
         </Fade>
         <div className="bg-blue-600 px-4 py-20 text-white dark:bg-blue-800">
            <Fade direction="left" triggerOnce cascade>
               <div className="mx-auto max-w-4xl text-center">
                  <h2 className="mb-8 text-4xl font-bold md:text-5xl">
                     Content I Edit
                  </h2>
                  <div className="mb-12 grid gap-8 md:grid-cols-3">
                     <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                        <h3 className="mb-4 text-2xl font-bold">
                           📱 Short Form
                        </h3>
                        <p>
                           TikToks, YouTube Shorts, Instagram Reels – optimized
                           for maximum engagement
                        </p>
                     </div>
                     <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                        <h3 className="mb-4 text-2xl font-bold">
                           📺 Long Form
                        </h3>
                        <p>
                           YouTube videos, tutorials, vlogs – crafted to keep
                           viewers watching
                        </p>
                     </div>
                     <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
                        <h3 className="mb-4 text-2xl font-bold">
                           📝 Video Essays
                        </h3>
                        <p>
                           Deep-dive content with sophisticated editing and
                           storytelling
                        </p>
                     </div>
                  </div>

                  <div className="rounded-2xl bg-white/20 p-8 backdrop-blur-sm">
                     <h3 className="mb-4 text-2xl font-bold">
                        Ready to Get Started?
                     </h3>
                     <p className="mb-6 text-xl">
                        Pricing depends on your specific needs – let&apos;s
                        chat!
                     </p>
                     <Button
                        asChild
                        size="lg"
                        className="bg-white font-bold text-blue-600 hover:bg-gray-100"
                     >
                        <Link href="mailto:david@davidilie.com">
                           📧 Send me an email
                        </Link>
                     </Button>
                     <p className="mt-4 text-sm opacity-80">
                        We&apos;ll schedule a call to discuss your project,
                        timeline, and pricing
                     </p>
                  </div>
               </div>
            </Fade>
         </div>
         <div className="px-4 py-20" id="portfolio">
            <Slide cascade triggerOnce duration={500}>
               <div className="mx-auto max-w-6xl">
                  <div className="mb-16 text-center">
                     <h2 className="gradient-text mb-4 text-4xl font-bold md:text-5xl">
                        My Work & Collaborations
                     </h2>
                     <p className="text-xl text-gray-600 dark:text-gray-300">
                        From personal content to major creators
                     </p>
                  </div>
                  <div className="space-y-16">
                     <div className="grid items-center gap-8 md:grid-cols-2">
                        <div>
                           <h3 className="mb-4 text-2xl font-bold">
                              📺 My Personal YouTube Channel
                           </h3>
                           <p className="mb-4 text-gray-600 dark:text-gray-300">
                              My personal YouTube channel where I script,
                              record, and edit my own tech and development
                              content. These videos consistently get 10K+ views
                              and showcase my full video production
                              capabilities.
                           </p>
                           <div className="mb-4 flex flex-wrap gap-2">
                              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                 Tech Content
                              </span>
                              <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800 dark:bg-green-900 dark:text-green-200">
                                 Full Production
                              </span>
                              <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                                 10K+ Views
                              </span>
                           </div>
                           <Button asChild className="mt-4">
                              <ExternalLink url="https://www.youtube.com/@davidilie">
                                 🔗 Visit My Channel
                              </ExternalLink>
                           </Button>
                        </div>
                        <iframe
                           className="aspect-video w-full rounded-md"
                           src="https://www.youtube.com/embed/5z28BLe0NUE?si=zvUBhPFlFUSZiJ4j&amp;start=50"
                           title="YouTube video player"
                           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                           referrerPolicy="strict-origin-when-cross-origin"
                           allowFullScreen
                        />
                     </div>
                     <div className="grid items-center gap-8 md:grid-cols-2">
                        <div className="md:order-2">
                           <h3 className="mb-4 text-2xl font-bold">
                              👑 Chief Pat - 2.4M+ Subscribers
                           </h3>
                           <p className="mb-4 text-gray-600 dark:text-gray-300">
                              I&apos;ve had the privilege of editing videos for
                              Chief Pat, one of the biggest Clash of Clans
                              content creators. Working with such a massive
                              channel has given me experience with
                              high-production gaming content.
                           </p>
                           <div className="mb-4 flex flex-wrap gap-2">
                              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                 Gaming
                              </span>
                              <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800 dark:bg-green-900 dark:text-green-200">
                                 Clash of Clans
                              </span>
                              <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                                 2.4M Subs
                              </span>
                           </div>
                           <Button asChild className="mt-4">
                              <ExternalLink url="https://www.youtube.com/user/PlayClashOfClans">
                                 🔗 Visit Chief Pat&apos;s Channel
                              </ExternalLink>
                           </Button>
                        </div>
                        <div className="flex h-64 items-center justify-center rounded-xl bg-gray-200 dark:bg-gray-700 md:order-1">
                           <div className="text-center">
                              <Image
                                 src={ChiefPatLogo}
                                 alt="Chief Pat Logo"
                                 className="mx-auto mb-2 h-20 w-20 rounded-full"
                              />
                              <p className="text-gray-500 dark:text-gray-400">
                                 Chief Pat
                              </p>
                           </div>
                        </div>
                     </div>
                     <div className="grid items-center gap-8 md:grid-cols-2">
                        <div>
                           <h3 className="mb-4 text-2xl font-bold">
                              🎮 Kuhrawn - Built From Ground Up
                           </h3>
                           <p className="mb-4 text-gray-600 dark:text-gray-300">
                              Kuhrawn is a good friend whose channel I&apos;ve
                              helped start from the very beginning. I&apos;ve
                              edited all of his videos and been part of the
                              entire creative process as we built his gaming
                              channel from scratch.
                           </p>
                           <div className="mb-4 flex flex-wrap gap-2">
                              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                 Gaming
                              </span>
                              <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800 dark:bg-green-900 dark:text-green-200">
                                 From Scratch
                              </span>
                              <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                                 Full Partnership
                              </span>
                           </div>
                           <Button asChild className="mt-4">
                              <ExternalLink url="https://www.youtube.com/@Kuhrawn">
                                 🔗 Visit Kuhrawn&apos;s Channel
                              </ExternalLink>
                           </Button>
                        </div>
                        <iframe
                           className="aspect-video w-full rounded-md"
                           src="https://www.youtube.com/embed/PuMlLnkT8Ns?si=iQJD3SY_MRAu-0co"
                           title="YouTube video player"
                           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                           referrerPolicy="strict-origin-when-cross-origin"
                           allowFullScreen
                        />
                     </div>
                  </div>
               </div>
            </Slide>
         </div>
         <div className="px-4 py-20">
            <Slide direction="up" triggerOnce>
               <div className="mx-auto max-w-4xl text-center">
                  <h2 className="gradient-text mb-8 text-4xl font-bold md:text-5xl">
                     More Than Just an Editor
                  </h2>
                  <div className="rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800">
                     <p className="mb-6 text-xl text-gray-600 dark:text-gray-300">
                        I&apos;m also a{" "}
                        <span className="font-bold text-blue-600 dark:text-blue-400">
                           full-stack developer
                        </span>{" "}
                        who built this entire website from scratch. This
                        isn&apos;t just another random face in the editing world
                        – I understand technology, user experience, and what
                        makes content truly engaging.
                     </p>
                     <div className="mb-6 flex flex-wrap justify-center gap-4">
                        <span className="rounded-full bg-blue-100 px-4 py-2 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                           React & Next.js
                        </span>
                        <span className="rounded-full bg-green-100 px-4 py-2 text-green-800 dark:bg-green-900 dark:text-green-200">
                           TypeScript
                        </span>
                        <span className="rounded-full bg-purple-100 px-4 py-2 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                           UI/UX Design
                        </span>
                        <span className="rounded-full bg-orange-100 px-4 py-2 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                           Video Editing
                        </span>
                     </div>
                     <Button asChild size="lg">
                        <Link href="/">🌐 Explore My Development Work</Link>
                     </Button>
                  </div>
               </div>
            </Slide>
         </div>
      </>
   );
};

export default EditingPortfolioPage;
