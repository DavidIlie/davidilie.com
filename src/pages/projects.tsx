import { NextPage } from "next";
import { NextSeo } from "next-seo";
import { Fade } from "react-awesome-reveal";

import { trpc } from "@/lib/trpc";
import projects from "@/data/projects";

import SmallProject from "@/components/ProjectComponents/SmallProject";

const Projects: NextPage = () => {
   const { data } = trpc.useQuery(["getProjects"]);

   return (
      <>
         <NextSeo title="Projects" />
         <div className="flex justify-center flex-grow mt-32 mb-12 sm:px-6 lg:px-8">
            <div className="text-center">
               <Fade direction="up" triggerOnce cascade>
                  <h1 className="pb-2 text-4xl font-bold text-center sm:text-6xl header-gradient">
                     Projects
                  </h1>
               </Fade>
               <h1 className="pb-2 text-4xl font-bold text-center sm:text-6xl header-gradient">
                  Repositories
               </h1>
               <p className="mt-2 mb-4 text-section">
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
