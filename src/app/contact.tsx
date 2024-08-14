"use client";

import React from "react";
import { Slide } from "react-awesome-reveal";

import ExternalLink from "~/components/external-link";

const Contact: React.FC = () => (
   <div className="container mb-12 max-w-7xl space-y-4">
      <Slide cascade triggerOnce duration={500}>
         <div className="relative flex w-full justify-center">
            <h1 className="gradient-text p-1 text-4xl font-medium sm:text-5xl">
               Contact Me
            </h1>
            <div className="absolute top-[1.3rem] mx-auto ml-[0.25rem] h-6 w-[48%] bg-blue-500/20 sm:ml-[-0.075rem] sm:w-[22%]" />
         </div>
         <p className="relmt-4 text-center font-mono text-2xl">
            <ExternalLink url="mailto:david@davidilie.com">
               david@davidilie.com
            </ExternalLink>
         </p>
      </Slide>
   </div>
);

export default Contact;
