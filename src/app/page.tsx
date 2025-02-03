import { api, HydrateClient } from "~/trpc/server";
import About from "./about";
import Contact from "./contact";
import Header from "./header";
import TopProject from "./top-projects";

const Home = async () => {
   void api.cron.statistics.prefetch();
   void api.spotify.playingStateAndSong.prefetch();

   return (
      <HydrateClient>
         <Header />
         <About />
         <TopProject />
         <Contact />
      </HydrateClient>
   );
};

export default Home;
