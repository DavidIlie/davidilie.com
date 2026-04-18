import { GitHubGraphServer } from "~/components/github-graph-server";
import { api, HydrateClient } from "~/trpc/server";
import About from "./about";
import Header from "./header";
import TopProject from "./top-projects";

const Home = async () => {
   void api.cron.statistics.prefetch();
   void api.spotify.playingStateAndSong.prefetch();

   return (
      <HydrateClient>
         <Header />
         <About />
         <section className="mx-auto mb-32 w-full max-w-[110rem] px-4 sm:px-8 lg:px-16">
            <div className="mb-8 text-center">
               <h2 className="mb-3 text-3xl font-semibold sm:text-4xl">
                  Pulled from <span className="text-brand">GitHub</span>,
                  updated hourly
               </h2>
               <p className="mx-auto max-w-xl text-muted-foreground">
                  Every blue square is a day I pushed something. It&apos;s the
                  only stat that really matters.
               </p>
            </div>
            <GitHubGraphServer />
         </section>
         <TopProject />
      </HydrateClient>
   );
};

export default Home;
