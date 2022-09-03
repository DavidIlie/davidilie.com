/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from "next";
import React from "react";
import { NextSeo } from "next-seo";
import { Fade } from "react-awesome-reveal";

import { devices, infastructure } from "@/data/gear";
import Device from "@/components/GearCard";

const Gear: NextPage = () => {
   return (
      <>
         <NextSeo title="Gear" />
         <div className="flex justify-center flex-grow mt-32 mb-12 sm:px-6 lg:px-8">
            <div className="container max-w-3xl mx-auto">
               <Fade duration={750} direction="up" triggerOnce cascade>
                  <h1 className="pb-2 text-5xl font-bold text-center lg:text-5xl header-gradient">
                     My Gear/Setup
                  </h1>
                  <p className="px-5 mb-5 text-lg text-center">
                     The expensive things...
                  </p>
                  <div className="flex flex-wrap gap-5">
                     {devices.map((device, index) => {
                        return <Device device={device} key={index} />;
                     })}
                  </div>
                  <h1 className="pb-2 mt-5 text-5xl font-bold text-center lg:text-5xl header-gradient">
                     My Hosting Infastructure
                  </h1>
                  <p className="px-5 mb-5 text-lg text-center">
                     <a
                        href="https://davidapps.dev"
                        target="_blank"
                        rel="noreferrer"
                     >
                        David Ilie Apps Platform
                     </a>
                     , see{" "}
                     <a
                        className="text-blue-500 duration-200 cursor-pointer hover:text-blue-600"
                        href="https://status.davidapps.dev"
                        target="_blank"
                        rel="noreferrer"
                     >
                        Status
                     </a>
                  </p>
                  <div className="flex flex-wrap gap-5 mb-5">
                     {infastructure.map((device, index) => {
                        return <Device device={device} key={index} />;
                     })}
                  </div>
               </Fade>
            </div>
         </div>
      </>
   );
};

export default Gear;
