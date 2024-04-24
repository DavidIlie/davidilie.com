"use client";

import React from "react";
import Link from "next/link";
import { Slide } from "react-awesome-reveal";

import projects from "~/data/projects";

import ResponsiveProjectWrapper from "~/components/project/wrapper";

const TopProject: React.FC = () => (
   <div className="container max-w-5xl">
      <Slide cascade triggerOnce duration={500}>
         <div className="relative flex w-full justify-center">
            <h1 className="gradient-text p-1 text-4xl font-medium sm:text-5xl">
               Top Project
            </h1>
            <div className="absolute top-[1.3rem] mx-auto ml-[0.25rem] h-6 w-[48%] bg-blue-500/20 sm:ml-[-0.075rem] sm:w-[22%]" />
         </div>
         <div className="-mb-6 flex justify-center">
            <Link
               className="text-lg duration-150 hover:text-blue-500"
               href="/projects"
            >
               See all my projects...
            </Link>
         </div>
         <ResponsiveProjectWrapper
            isGitHub={false}
            project={projects[0]}
            left={true}
         />
      </Slide>
   </div>
);

export default TopProject;
