import type { Metadata } from "next";

import { api } from "~/trpc/server";

import Header from "./_components/Header";
import About from "./_components/About";

export const metadata: Metadata = {
   title: "Home",
};

const Page = async () => {
   const stats = await api.job.statistics.query();
   return (
      <>
         <Header />
         <About stats={stats} />
      </>
   );
};

export default Page;
