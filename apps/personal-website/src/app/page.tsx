import type { Metadata } from "next";
import { YouTubeStatistic } from "@prisma/client";

import { prisma } from "~/server/db";

import About from "./_components/About";
import Header from "./_components/Header";
import TopProject from "./_components/TopProject";

export const metadata: Metadata = {
   title: "Home",
};

export const dynamic = "force-dynamic";

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
