import * as React from "react";
import { useMediaQuery } from "@mantine/hooks";

import { trpc } from "@/lib/trpc";
import type { Project, ProjectGitHub } from "@/data/projects";

const PinnedProject: React.FC<{ project: Project; left: boolean }> = ({
   project: uncastedProject,
   left,
}) => {
   const matches = useMediaQuery("(min-width: 900px)", true);

   if (matches && typeof (uncastedProject as any).repo_id === "string") {
      let project = uncastedProject as ProjectGitHub;
      const { data } = trpc.useQuery([
         "getProjectByName",
         { name: project.name },
      ]);

      return <div></div>;
   }

   return <div></div>;
};

export default PinnedProject;
