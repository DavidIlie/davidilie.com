import type { Metadata } from "next";

import { prisma } from "~/server/db";

import Header from "./_components/Header";
import About from "./_components/About";

export const metadata: Metadata = {
   title: "Home",
};

const Page = async () => {
   const stats = await prisma.youTubeStatistic.findFirst();
   return (
      <>
         <Header />
         <About stats={stats} />
      </>
   );
};

export default Page;
