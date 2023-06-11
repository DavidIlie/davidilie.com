"use client";

import React from "react";
import { Slide } from "react-awesome-reveal";

import projects from "~/data/projects";

import ResponsiveProjectWrapper from "~/components/Project/ResponsiveProjectWrapper";

const TopProject: React.FC = () => (
   <div className="container max-w-7xl">
      <Slide cascade triggerOnce>
         <div className="relative flex justify-center w-full">
            <h1 className="p-1 text-4xl font-medium sm:text-5xl gradient-text">
               Top Project
            </h1>
            <div className="absolute sm:w-[22%] w-[48%] mx-auto sm:ml-[-0.075rem] ml-[0.25rem] h-6 bg-blue-500/20 top-[1.3rem]" />
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
