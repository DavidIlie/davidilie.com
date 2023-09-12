"use client";

import React from "react";
import { Slide } from "react-awesome-reveal";

const Contact: React.FC = () => (
   <div className="container mb-12 max-w-7xl">
      <Slide cascade triggerOnce duration={500}>
         <div className="relative flex w-full justify-center">
            <h1 className="gradient-text p-1 text-4xl font-medium sm:text-5xl">
               Contact Me
            </h1>
            <div className="absolute top-[1.3rem] mx-auto ml-[0.25rem] h-6 w-[48%] bg-blue-500/20 sm:ml-[-0.075rem] sm:w-[22%]" />
         </div>
         <a
            href="mailto:david@davidilie.com"
            className="mt-4 flex justify-center font-mono text-2xl"
         >
            david@davidilie.com
         </a>
      </Slide>
   </div>
);

export default Contact;
