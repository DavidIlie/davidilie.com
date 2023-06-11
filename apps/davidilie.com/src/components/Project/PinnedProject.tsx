import React from "react";

import type { Project, ProjectGitHub } from "~/data/projects";
import { prisma } from "~/server/db";

import ResponsiveProjectWrapper from "./ResponsiveProjectWrapper";

const PinnedProject = async ({
   project: uncastedProject,
   left,
}: {
   project: Project;
   left: boolean;
}) => {
   if (typeof (uncastedProject as any).repo_id === "string") {
      let project = uncastedProject as ProjectGitHub;
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
      let project = uncastedProject as ProjectGitHub;
      return (
         <ResponsiveProjectWrapper
            isGitHub={false}
            project={project}
            left={left}
         />
      );
   }
};

export default PinnedProject;
