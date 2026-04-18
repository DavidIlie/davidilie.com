"use client";

import React from "react";
import Link from "next/link";

import projects from "~/data/projects";

import ResponsiveProjectWrapper from "~/components/project/wrapper";
import { Reveal } from "~/components/reveal";
import { Button } from "~/components/ui/button";

const TopProject: React.FC = () => (
   <div className="container max-w-5xl">
      <Reveal cascade triggerOnce duration={500} direction="up">
         <div className="flex w-full justify-center">
            <h1 className="p-1 text-4xl font-medium text-brand sm:text-5xl">
               Top Project
            </h1>
         </div>
         <div className="mt-2 -mb-6 flex justify-center">
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
