import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { Fade } from "react-awesome-reveal";

import { trpc } from "@/lib/trpc";
import projects from "@/data/projects";

import SmallProject from "@/components/ProjectComponents/SmallProject";
import PinnedProject from "@/components/ProjectComponents/PinnedProject";

const Projects: NextPage = () => {
   const { data } = trpc.useQuery(["getProjects"]);

   return (
      <>
         <NextSeo title="Projects" />
         <div className="flex justify-center flex-grow mt-32 mb-12 sm:px-6 lg:px-8">
            <div className="px-8 text-center sm:px-0 ">
               <h1 className="pb-2 -mb-4 text-5xl font-bold text-center sm:-mb-6 sm:text-6xl header-gradient">
                  Projects
               </h1>
               {projects.map((project, index) => (
                  <PinnedProject
                     project={project}
                     left={index % 2 === 0}
                     key={index}
                  />
               ))}
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
                  {data
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
            </div>
         </div>
      </>
   );
};

export default Projects;
