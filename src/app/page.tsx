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
         <TopProject />
      </HydrateClient>
   );
};

export default Home;
