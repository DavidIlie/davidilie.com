/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from "next";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { NextSeo } from "next-seo";
import { AnimatePresence, motion } from "framer-motion";
import { Fade } from "react-awesome-reveal";

import SplitText from "@/lib/SplitText";
import Socials from "@/components/Socials";
import { shimmer } from "@/lib/shimmer";
import { trpc } from "@/lib/trpc";
import Tooltip from "@/components/Tooltip";

const Home: NextPage = () => {
   return (
      <>
         <NextSeo title="Home" />
         <Header />
         <About />
      </>
   );
};

const Header: React.FC = () => {
   const [secondVisible, setSecondVisible] = useState<boolean>(false);
   const [thirdVisible, setThirdVisible] = useState<boolean>(false);
   const [name, setName] = useState("I'm David Ilie");

   useEffect(() => {
      setTimeout(() => {
         setSecondVisible(true);
         setTimeout(() => {
            setThirdVisible(true);
         }, 500);
      }, 500);

      const width = window.innerWidth;
      if (width > 500) {
         setName("I'm David Ilie");
      } else {
         setName("I'm David");
      }

      window.addEventListener("resize", () => {
         const width = window.innerWidth;
         if (width > 500) {
            setName("I'm David Ilie");
         } else {
            setName("I'm David");
         }
      });
   }, []);
   const fadeIn = {
      hidden: { opacity: 0 },
      show: {
         opacity: 1,
         transition: {
            delay: 0.5,
         },
      },
   };

   return (
      <div className="flex items-center justify-center flex-grow min-h-screen px-4 text-center">
         <div className="mt-5">
            <AnimatePresence>
               <div className="h-10 text-center">
                  <SplitText
                     //@ts-ignore
                     initial={{ y: "100%" }}
                     animate="visible"
                     className="text-4xl"
                     variants={{
                        //@ts-ignore
                        visible: (i) => ({
                           y: 0,
                           transition: {
                              delay: i * 0.1,
                           },
                        }),
                     }}
                  >
                     Hello There!
                  </SplitText>
               </div>
            </AnimatePresence>
            <AnimatePresence>
               <div className="mt-2">
                  {secondVisible ? (
                     <SplitText
                        //@ts-ignore
                        initial={{ y: "100%" }}
                        animate="visible"
                        className="visible font-semibold text-7xl header-gradient"
                        variants={{
                           //@ts-ignore
                           visible: (i) => ({
                              y: 0,
                              transition: {
                                 delay: i * 0.25,
                              },
                           }),
                        }}
                     >
                        {name}
                     </SplitText>
                  ) : (
                     <h1 className="invisible font-semibold text-7xl">
                        {name}
                     </h1>
                  )}
               </div>
            </AnimatePresence>
            <AnimatePresence>
               <div className="mt-4">
                  {thirdVisible ? (
                     <motion.div
                        variants={fadeIn}
                        initial="hidden"
                        animate="show"
                     >
                        <Socials font="1.75" invisible={false} />
                     </motion.div>
                  ) : (
                     <Socials invisible font="1.75" />
                  )}
               </div>
            </AnimatePresence>
         </div>
      </div>
   );
};

const About: React.FC = () => {
   const { isLoading, data } = trpc.useQuery(["getStatistics"]);

   return (
      <>
         <div className="px-10 pt-12 pb-32 text-left text-white bg-blue-600 dark:bg-blue-800 dark:text-gray-100 sm:text-center">
            <Fade direction="left" triggerOnce cascade>
               <h1 className="mb-5 text-4xl font-semibold text-center md:text-5xl sm:text-4xl">
                  First of all, who am I?
               </h1>
               <h1 className="mx-auto mb-32 text-lg sm:max-w-5xl">
                  I'm a 15 year old software developer and full-time student,
                  and have been interested into computer science ever since I
                  was younger but never got into proper development until about
                  2 years ago. Software Engineering has always kept me motivated
                  throughout the years which is why I want to pursue this "dream
                  job" in the future. For a while I've found myself looking into
                  how any given piece of technology works, but until recently
                  I've never found myself actually creating something of my own.
                  The goal of this website is to express my{" "}
                  <span className="font-semibold">"experiments"</span> to the
                  public, while getting feedback in the process.
               </h1>
            </Fade>
         </div>
         <Fade direction="up" triggerOnce cascade>
            <div className="mb-16 flex flex-wrap max-w-sm mx-auto mt-[-14rem] bg-white shadow-xl dark:bg-gray-800 dark:text-gray-200 rounded-2xl md:max-w-6xl md:flex-nowrap justify-evenly">
               <div className="px-5 pt-10 border-b-2 xl:w-1/3 xs:w-full 2xl:border-r-2 xl:border-r-2 md:border-r-2 2xl:border-b-0 md:border-b-0 xl:border-b-0 border-fuchasia-600 dark:border-gray-600">
                  <div className="flex justify-center mb-3">
                     <Image
                        src="/static/frontend.svg"
                        alt="Frontend Developer"
                        className="w-24 h-24 animate-wiggle"
                        blurDataURL={shimmer(1920, 1080)}
                        placeholder="blur"
                        width="100%"
                        height="100%"
                     />
                  </div>
                  <div className="mb-10 text-center">
                     <h1 className="mb-5 text-2xl font-semibold">
                        Frontend Developer
                     </h1>
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
                     <h1 className="text-2xl font-semibold text-blue-700 dark:text-blue-500">
                        Technologies I use:
                     </h1>
                     <p className="text-lg">React, Next.js, Tailwind CSS</p>
                  </div>
                  <div className="text-center mb-7">
                     <h1 className="text-2xl font-semibold text-blue-700 dark:text-blue-500">
                        Tools I use:
                     </h1>
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
                        width="100%"
                        height="100%"
                     />
                  </div>
                  <div className="mb-10 text-center">
                     <h1 className="mb-5 text-2xl font-semibold">
                        Backend Developer
                     </h1>
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
                     <h1 className="text-2xl font-semibold text-blue-700 dark:text-blue-500">
                        Technologies I use:
                     </h1>
                     <p className="text-lg">
                        MongoDB, Express, GraphQL, NodeJS
                     </p>
                  </div>
                  <div className="text-center mb-7">
                     <h1 className="text-2xl font-semibold text-blue-700 dark:text-blue-500">
                        Tools I use:
                     </h1>
                     <p className="text-lg">Visual Studio Code</p>
                     <p className="text-lg">MongoDB Compass</p>
                     <p className="text-lg">Postman</p>
                     <p className="text-lg">Windows Terminal</p>
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
                        width="100%"
                        height="100%"
                     />
                  </div>
                  <div className="mb-10 text-center">
                     <a
                        className="text-2xl font-semibold duration-150 hover:text-blue-500"
                        href="https://www.youtube.com/channel/UC92hn9Y8WcY_5LribMDW8uA"
                        target="_blank"
                        rel="noreferrer"
                     >
                        Content Creator
                     </a>
                     <p className="px-16 mt-5 text-lg">
                        {!isLoading && data ? (
                           <span>
                              <span className="font-bold text-blue-700 dark:text-blue-500">
                                 {BigInt(data.subscribers).toString()}
                              </span>{" "}
                              Subscribers,{" "}
                              <span className="font-bold text-blue-700 dark:text-blue-500">
                                 {BigInt(data.views).toString()}
                              </span>{" "}
                              Views, and{" "}
                              <span className="font-bold text-blue-700 dark:text-blue-500">
                                 {BigInt(data.videos).toString()}
                              </span>{" "}
                              Videos
                           </span>
                        ) : (
                           <span>Loading...</span>
                        )}
                     </p>
                  </div>
                  <div className="mb-10 text-center">
                     <h1 className="text-2xl font-semibold text-blue-700 dark:text-blue-500">
                        Software I use:
                     </h1>
                     <p className="text-lg">Adobe Premiere & Photoshop</p>
                  </div>
                  <div className="mb-4 text-center sm:mb-0">
                     <h1 className="text-2xl font-semibold text-blue-700 dark:text-blue-500">
                        Content I produce:
                     </h1>
                     <p className="text-lg duration-200 hover:text-blue-700 dark:hover:text-blue-500">
                        <a
                           href="https://www.youtube.com/channel/UC92hn9Y8WcY_5LribMDW8uA"
                           target="_blank"
                           rel="noreferrer"
                        >
                           David Ilie
                        </a>
                     </p>
                     <p className="text-lg duration-200 hover:text-blue-700 dark:hover:text-blue-500">
                        <a
                           href="https://www.youtube.com/channel/UCwfF_jZHkxF1Vxx5b8PlIGA"
                           target="_blank"
                           rel="noreferrer"
                        >
                           Albastru
                        </a>
                     </p>
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

export default Home;
