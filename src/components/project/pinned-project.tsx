import React from "react";

import type { Project, ProjectGitHub } from "~/data/projects";

import { prisma } from "~/server/db";
import ResponsiveProjectWrapper from "./wrapper";

const PinnedProject = async ({
   project: uncastedProject,
   left,
}: {
   project: Project;
   left: boolean;
}) => {
   if (typeof (uncastedProject as any).repo_id === "string") {
      const project = uncastedProject as ProjectGitHub;
      const data = await prisma.gitHubProject.findFirst({
         where: { name: project.repo_id },
      });
      return (
         <ResponsiveProjectWrapper
            isGitHub={true}
            project={project}
            left={left}
            repo={data}
         />
      );
   } else {
      return (
         <ResponsiveProjectWrapper
            isGitHub={false}
            project={uncastedProject as ProjectGitHub}
            left={left}
         />
      );
   }
};

export default PinnedProject;
