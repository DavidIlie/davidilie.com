import type { Metadata } from "next";

import { prisma } from "~/server/db";

import SmallProject from "~/components/Project/SmallProject";

export const metadata: Metadata = {
   title: "Projects",
};

const Page = async () => {
   const projects = await prisma.gitHubProject.findMany();

   return (
      <>
         <h1 className="pb-2 -mb-4 text-5xl font-bold text-center sm:-mb-6 sm:text-6xl header-gradient">
            Projects
         </h1>
         <h1 className="pb-2 -mt-2 text-5xl font-bold text-center sm:mt-5 sm:text-6xl header-gradient">
            Repositories
         </h1>
         <p className="mb-4 text-lg">
            A list of all my public repositories on{" "}
            <a
               href="https://github.com/davidilie"
               target="_blank"
               rel="noreferrer"
               className="duration-150 hover:text-blue-500"
            >
               GitHub
            </a>
            .
         </p>
         <div className="container grid max-w-6xl grid-cols-1 gap-4 px-2 mx-auto sm:px-0 xl:grid-cols-3 md:grid-cols-2">
            {projects
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
