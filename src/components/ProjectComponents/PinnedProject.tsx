import * as React from "react";
import { useMediaQuery } from "@mantine/hooks";
import { GitHubProject } from "@prisma/client";

import { trpc } from "@/lib/trpc";
import type { Project, ProjectGitHub } from "@/data/projects";

const PinnedProject: React.FC<{ project: Project; left: boolean }> = ({
   project: uncastedProject,
   left,
}) => {
   const matches = useMediaQuery("(min-width: 900px)", true);

   if (typeof (uncastedProject as any).repo_id === "string") {
      let project = uncastedProject as ProjectGitHub;
      const { data } = trpc.useQuery([
         "getProjectByName",
         { name: project.name },
      ]);

      if (matches) {
         return (
            <ImageProject
               isGitHub={true}
               project={project}
               left={left}
               repo={data}
            />
         );
      } else {
         return (
            <ResponsiveProject
               isGitHub={true}
               project={project}
               left={left}
               repo={data}
            />
         );
      }
   } else {
      let project = uncastedProject as ProjectGitHub;

      if (matches) {
         return <ImageProject isGitHub={false} project={project} left={left} />;
      } else {
         return (
            <ResponsiveProject isGitHub={false} project={project} left={left} />
         );
      }
   }
};

const ImageProject: React.FC<{
   project: Project;
   left: boolean;
   isGitHub: boolean;
   repo?: GitHubProject | null | undefined;
}> = ({ project, left }) => {
   return <div></div>;
};

const ResponsiveProject: React.FC<{
   project: Project;
   left: boolean;
   isGitHub: boolean;
   repo?: GitHubProject | null | undefined;
}> = ({ project, left }) => {
   return <div></div>;
};

export default PinnedProject;
