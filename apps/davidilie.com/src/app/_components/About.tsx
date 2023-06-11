"use client";

import React from "react";
import Image from "next/image";
import { Fade } from "react-awesome-reveal";

import { Tooltip, shimmer } from "ui";
import { YouTubeStatistic } from "@prisma/client";

const About: React.FC<{ stats: YouTubeStatistic }> = ({ stats }) => {
   return (
      <>
         <div className="px-10 pt-12 pb-32 text-left text-white bg-blue-600 dark:bg-blue-800 dark:text-gray-100 sm:text-center">
            <Fade direction="left" triggerOnce cascade>
               <h1 className="mb-5 text-4xl font-semibold text-center md:text-5xl sm:text-4xl">
                  First of all, who am I?
               </h1>
               <p className="mx-auto mb-32 text-lg sm:max-w-5xl">
                  I am an ambitious 16-year-old software developer and dedicated
                  full-time student. My passion for computer science has been
                  with me since childhood, and it wasn't until about two years
                  ago that I fully immersed myself in the world of proper
                  development. The presence of Software Engineering has
                  continuously fueled my motivation, driving me to pursue it as
                  my ultimate "dream job". While I have always been curious
                  about how technology functions, it is only recently that I
                  have begun to create projects of my own. This website serves
                  as a platform to share my{" "}
                  <span className="font-medium">experiments</span> with the
                  public and gather valuable feedback in the process. Join me on
                  this exciting journey of innovation and self-discovery.
               </p>
            </Fade>
         </div>
         <Fade direction="up" triggerOnce>
            <div className="mb-16 flex flex-wrap max-w-sm mx-auto mt-[-14rem] bg-white shadow-xl dark:bg-gray-800 dark:text-gray-200 rounded-2xl md:max-w-6xl md:flex-nowrap justify-evenly">
               <div className="px-5 pt-10 border-b-2 xl:w-1/3 xs:w-full 2xl:border-r-2 xl:border-r-2 md:border-r-2 2xl:border-b-0 md:border-b-0 xl:border-b-0 border-fuchasia-600 dark:border-gray-600">
                  <div className="flex justify-center mb-3">
                     <Image
                        src="/static/frontend.svg"
                        alt="Frontend Developer"
                        className="w-24 h-24 animate-wiggle"
                        blurDataURL={shimmer(1920, 1080)}
                        placeholder="blur"
                        width="250"
                        height="250"
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
                  <div className="text-center mb-7">
                     <h4 className="text-2xl font-semibold text-blue-700 dark:text-blue-500">
                        Tools I use:
                     </h4>
                     <p className="text-lg">Visual Studio Code</p>
                     <p className="text-lg">Figma</p>
                     <p className="text-lg">Adobe Illustrator</p>
                     <p className="text-lg">Pen & Paper</p>
                  </div>
               </div>
               <div className="px-5 pt-10 border-b-2 xl:w-1/3 xs:w-full 2xl:border-r-2 xl:border-r-2 md:border-r-2 md:border-b-0 xl:border-b-0 border-fuchasia-600 dark:border-gray-600">
                  <div className="flex justify-center mb-3">
                     <Image
                        src="/static/backend.svg"
                        alt="Backend Developer"
                        className="w-24 h-24 animate-pulse"
                        blurDataURL={shimmer(1920, 1080)}
                        placeholder="blur"
                        width="250"
                        height="250"
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
                  <div className="text-center mb-7">
                     <h4 className="text-2xl font-semibold text-blue-700 dark:text-blue-500">
                        Tools I use:
                     </h4>
                     <p className="text-lg">Visual Studio Code</p>
                     <p className="text-lg">Windows Terminal</p>
                     <p className="text-lg">iTerm 2</p>
                     <p className="text-lg">GitHub</p>
                  </div>
               </div>
               <div className="px-5 pt-10 xl:w-1/3 xs:w-full">
                  <div className="flex justify-center mb-3">
                     <Image
                        src="/static/contentcreator.svg"
                        alt="Content Creator"
                        className="w-24 h-24 animate-bounce-up"
                        blurDataURL={shimmer(1920, 1080)}
                        placeholder="blur"
                        width="250"
                        height="250"
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
                     <p className="px-16 mt-5 text-lg">
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
                     <Tooltip
                        content="School projects, Personal Projects, etc."
                        placement="bottom"
                     >
                        <p className="text-lg text-gray-800 cursor-pointer dark:text-gray-200">
                           And much more...
                        </p>
                     </Tooltip>
                  </div>
               </div>
            </div>
         </Fade>
      </>
   );
};

export default About;
