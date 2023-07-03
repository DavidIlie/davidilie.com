import type { Metadata } from "next";

import { prisma } from "~/server/db";
import projects from "~/data/projects";

import { ExternalLink } from "@david/ui";

import PinnedProject from "~/components/Project/PinnedProject";
import SmallProject from "~/components/Project/SmallProject";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
   title: "Projects",
};

const Page = async () => {
   const githubProjects = await prisma.gitHubProject.findMany();

   return (
      <>
         <h1 className="gradient-text -mb-4 pb-2 text-center text-5xl font-bold sm:-mb-6 sm:text-6xl">
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
         <h1 className="gradient-text -mt-2 pb-2 text-center text-5xl font-bold sm:mt-5 sm:text-6xl">
            Repositories
         </h1>
         <p className="mb-4 text-lg">
            A list of all my public repositories on{" "}
            <ExternalLink url="https://github.com/davidilie">
               GitHub.
            </ExternalLink>
         </p>
         <div className="container mx-auto grid max-w-6xl grid-cols-1 gap-4 px-2 sm:px-0 md:grid-cols-2 xl:grid-cols-3">
            {githubProjects
               ?.sort(
                  (a, b) =>
                     new Date(a.lastPush).getTime() -
                     new Date(b.lastPush).getTime(),
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
