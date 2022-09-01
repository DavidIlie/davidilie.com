import * as React from "react";
import type { Project } from "@/data/projects";
import { useMediaQuery } from "@mantine/hooks";

const PinnedProject: React.FC<{ project: Project; left: boolean }> = ({
   project,
   left,
}) => {
   const matches = useMediaQuery("(min-width: 900px)", true);

   if (matches) return <div></div>;

   return <div></div>;
};

export default PinnedProject;
