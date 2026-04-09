"use client";

import React from "react";
import Link from "next/link";

import projects from "~/data/projects";

import { Reveal } from "~/components/reveal";
import ResponsiveProjectWrapper from "~/components/project/wrapper";
import { Button } from "~/components/ui/button";

const TopProject: React.FC = () => (
   <div className="container max-w-5xl">
      <Reveal cascade triggerOnce duration={500} direction="up">
         <div className="flex w-full justify-center">
            <h1 className="p-1 text-4xl font-medium text-brand sm:text-5xl">
               Top Project
            </h1>
         </div>
         <div className="-mb-6 mt-2 flex justify-center">
            <Button asChild variant="ghost">
               <Link href="/projects">See all my projects</Link>
            </Button>
         </div>
         <ResponsiveProjectWrapper
            isGitHub={false}
            project={projects[0]}
            left={true}
         />
      </Reveal>
   </div>
);

export default TopProject;
