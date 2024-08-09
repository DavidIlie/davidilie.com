"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import { Fade } from "react-awesome-reveal";

import { shimmer } from "~/lib/shimmer";

import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "~/components/ui/tooltip";
import { api } from "~/trpc/react";

const About: React.FC = () => {
   const age =
      new Date().getFullYear() -
      new Date("2006-07-31").getFullYear() -
      (new Date() <
      new Date(
         new Date().getFullYear(),
         new Date("2006-07-31").getMonth(),
         new Date("2006-07-31").getDate(),
      )
         ? 1
         : 0);

   return (
      <>
         <div className="bg-blue-600 px-10 pb-32 pt-12 text-left text-white dark:bg-blue-800 dark:text-gray-100 sm:text-center">
            <Fade direction="left" triggerOnce cascade>
               <h1 className="mb-5 text-center text-4xl font-semibold sm:text-4xl md:text-5xl">
                  First of all, who am I?
               </h1>
               <div className="mx-auto mb-32 gap-6 text-lg sm:flex sm:max-w-6xl">
                  <p className="sm:text-justify">
                     I am an ambitious {age}-year-old software developer and
                     dedicated full-time student. My passion for computer
                     science has been with me since childhood, and it
                     wasn&apos;t until about two years ago that I fully immersed
                     myself in the world of proper development. The presence of
                     Software Engineering has continuously fueled my motivation,
                     driving me to pursue it as my ultimate &quot;dream
                     job&quot;. While I have always been curious about how
                     technology functions, it is only recently that I have begun
                     to create projects of my own. This website serves as a
                     platform to share my{" "}
                     <span className="font-medium">experiments</span> with the
                     public and gather valuable feedback in the process. Join me
                     on this exciting journey of innovation and self-discovery.
                  </p>
                  <Image
                     src="/static/me.png"
                     alt="Me"
                     width={200}
                     height={200}
                     className="hidden rounded-full sm:block"
                     blurDataURL={shimmer(150, 150)}
                     placeholder="blur"
                  />
               </div>
            </Fade>
         </div>
         <Fade direction="up" triggerOnce cascade className="mx-4">
            <div className="mx-auto mb-10 mt-[-14rem] flex max-w-[25rem] flex-wrap justify-evenly rounded-2xl bg-white shadow-xl dark:bg-gray-800 dark:text-gray-200 md:max-w-6xl md:flex-nowrap">
               <div className="xs:w-full border-b-2 px-5 pt-10 dark:border-gray-600 md:border-b-0 md:border-r-2 xl:w-1/3 xl:border-b-0 xl:border-r-2 2xl:border-b-0 2xl:border-r-2">
                  <div className="mb-3 flex justify-center">
                     <Image
                        src="/static/frontend.svg"
                        alt="Frontend Developer"
                        className="animate-wiggle h-24 w-24"
                        blurDataURL={shimmer(250, 250)}
                        placeholder="blur"
                        width={250}
                        height={250}
                        title="Frontend Developer"
                     />
                  </div>
                  <div className="mb-10 text-center">
                     <h2 className="mb-5 text-2xl font-semibold">
                        Frontend Developer
                     </h2>
                     <p className="text-lg">
                        I like bringing my ideas to{" "}
                        <span className="font-bold text-blue-700 dark:text-blue-500">
                           reality
                        </span>
                        , by producing simple but powerful{" "}
                        <span className="font-bold text-blue-700 dark:text-blue-500">
                           code
                        </span>
                        .
                     </p>
                  </div>
                  <div className="mb-10 text-center">
                     <h3 className="text-2xl font-semibold text-blue-700 dark:text-blue-500">
                        Technologies I use:
                     </h3>
                     <p className="text-lg">React, Next.js, Tailwind CSS</p>
                  </div>
                  <div className="mb-7 text-center">
                     <h4 className="text-2xl font-semibold text-blue-700 dark:text-blue-500">
                        Tools I use:
                     </h4>
                     <p className="text-lg">Visual Studio Code</p>
                     <p className="text-lg">Figma</p>
                     <p className="text-lg">Adobe Illustrator</p>
                     <p className="text-lg">Pen & Paper</p>
                  </div>
               </div>
               <div className="xs:w-full border-b-2 px-5 pt-10 dark:border-gray-600 md:border-b-0 md:border-r-2 xl:w-1/3 xl:border-b-0 xl:border-r-2 2xl:border-r-2">
                  <div className="mb-3 flex justify-center">
                     <Image
                        src="/static/backend.svg"
                        alt="Backend Developer"
                        className="h-24 w-24 animate-pulse"
                        blurDataURL={shimmer(250, 250)}
                        placeholder="blur"
                        width={250}
                        height={250}
                        title="Backend Developer"
                     />
                  </div>
                  <div className="mb-10 text-center">
                     <h2 className="mb-5 text-2xl font-semibold">
                        Backend Developer
                     </h2>
                     <p className="px-16 text-lg">
                        I value{" "}
                        <span className="font-bold text-blue-700 dark:text-blue-500">
                           fast
                        </span>{" "}
                        API calls and{" "}
                        <span className="font-bold text-blue-700 dark:text-blue-500">
                           efficent
                        </span>{" "}
                        code.
                     </p>
                  </div>
                  <div className="mb-10 text-center">
                     <h3 className="text-2xl font-semibold text-blue-700 dark:text-blue-500">
                        Technologies I use:
                     </h3>
                     <p className="text-lg">
                        tRPC, S3, Prisma, SQL, WebSockets
                     </p>
                  </div>
                  <div className="mb-7 text-center">
                     <h4 className="text-2xl font-semibold text-blue-700 dark:text-blue-500">
                        Tools I use:
                     </h4>
                     <p className="text-lg">Visual Studio Code</p>
                     <p className="text-lg">Windows Terminal</p>
                     <p className="text-lg">iTerm 2</p>
                     <p className="text-lg">GitHub</p>
                  </div>
               </div>
               <div className="xs:w-full px-5 pt-10 xl:w-1/3">
                  <div className="mb-3 flex justify-center">
                     <Image
                        src="/static/contentcreator.svg"
                        alt="Content Creator"
                        className="animate-bounce-up h-24 w-24"
                        blurDataURL={shimmer(250, 250)}
                        placeholder="blur"
                        width={250}
                        height={250}
                        title="Content Creator"
                     />
                  </div>
                  <div className="mb-10 text-center">
                     <a
                        className="text-2xl font-semibold duration-150 hover:text-blue-500"
                        href="https://www.youtube.com/channel/UC92hn9Y8WcY_5LribMDW8uA"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Content creator"
                     >
                        Content Creator
                     </a>
                     <p className="mt-5 px-16 text-lg">
                        <Suspense fallback={<span>Loading...</span>}>
                           <Statistics />
                        </Suspense>
                     </p>
                  </div>
                  <div className="mb-10 text-center">
                     <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-500">
                        Software I use:
                     </h2>
                     <p className="text-lg">Adobe Premiere & Photoshop</p>
                  </div>
                  <div className="mb-4 text-center sm:mb-0">
                     <h3 className="text-2xl font-semibold text-blue-700 dark:text-blue-500">
                        Content I produce:
                     </h3>
                     <a
                        className="text-lg duration-200 hover:text-blue-700 dark:hover:text-blue-500"
                        href="https://www.youtube.com/channel/UC92hn9Y8WcY_5LribMDW8uA"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="David Ilie"
                     >
                        David Ilie
                     </a>
                     <br />
                     <a
                        className="text-lg duration-200 hover:text-blue-700 dark:hover:text-blue-500"
                        href="https://www.youtube.com/channel/UCwfF_jZHkxF1Vxx5b8PlIGA"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Albastru"
                     >
                        Albastru
                     </a>
                     <br />
                     <TooltipProvider>
                        <Tooltip>
                           <TooltipTrigger>
                              <p className="cursor-pointer text-lg text-gray-800 dark:text-gray-200">
                                 And much more...
                              </p>
                           </TooltipTrigger>
                           <TooltipContent>
                              School projects, Personal Projects, etc.
                           </TooltipContent>
                        </Tooltip>
                     </TooltipProvider>
                  </div>
               </div>
            </div>
         </Fade>
      </>
   );
};

const Statistics: React.FC = () => {
   const [stats] = api.cron.statistics.useSuspenseQuery();

   return (
      <span>
         <span className="font-bold text-blue-700 dark:text-blue-500">
            {BigInt(stats.subscribers).toString()}
         </span>{" "}
         Subscribers,{" "}
         <span className="font-bold text-blue-700 dark:text-blue-500">
            {BigInt(stats.views).toString()}
         </span>{" "}
         Views, and{" "}
         <span className="font-bold text-blue-700 dark:text-blue-500">
            {BigInt(stats.videos).toString()}
         </span>{" "}
         Videos
      </span>
   );
};

export default About;
