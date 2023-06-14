import type { Metadata } from "next";

import { ExternalLink } from "@david/ui";
import { prisma } from "~/server/db";
import projects from "~/data/projects";

import SmallProject from "~/components/Project/SmallProject";
import PinnedProject from "~/components/Project/PinnedProject";

export const metadata: Metadata = {
   title: "Projects",
};

const Page = async () => {
   const githubProjects = await prisma.gitHubProject.findMany();

   return (
      <>
         <h1 className="pb-2 -mb-4 text-5xl font-bold text-center sm:-mb-6 sm:text-6xl gradient-text">
            Projects
         </h1>
         {projects.map((project, index) => (
            // @ts-expect-error Server Component
            <PinnedProject
               project={project}
               left={index % 2 === 0}
               key={index}
            />
         ))}
         <h1 className="pb-2 -mt-2 text-5xl font-bold text-center sm:mt-5 sm:text-6xl gradient-text">
            Repositories
         </h1>
         <p className="mb-4 text-lg">
            A list of all my public repositories on{" "}
            <ExternalLink url="https://github.com/davidilie">
               GitHub.
            </ExternalLink>
         </p>
         <div className="container grid max-w-6xl grid-cols-1 gap-4 px-2 mx-auto sm:px-0 xl:grid-cols-3 md:grid-cols-2">
            {githubProjects
               ?.sort(
                  (a, b) =>
                     new Date(a.lastPush).getTime() -
                     new Date(b.lastPush).getTime()
               )
               .reverse()
               .map((project) => (
                  <SmallProject project={project} key={project.name} />
               ))}
         </div>
      </>
   );
};

export default Page;
