import type { Metadata } from "next";

import { prisma } from "~/server/db";
import { YouTubeStatistic } from "@prisma/client";

import Header from "./_components/Header";
import About from "./_components/About";
import TopProject from "./_components/TopProject";

export const metadata: Metadata = {
   title: "Home",
};

const Page = async () => {
   const stats =
      (await prisma.youTubeStatistic.findFirst()) as YouTubeStatistic;
   return (
      <>
         <Header />
         <About stats={stats} />
         <TopProject />
      </>
   );
};

export default Page;
