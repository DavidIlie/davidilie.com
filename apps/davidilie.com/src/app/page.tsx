import type { Metadata } from "next";

import Header from "./_components/Header";
import About from "./_components/About";

export const metadata: Metadata = {
   title: "Home",
};

const Page = async () => {
   return (
      <>
         <Header />
         <About />
      </>
   );
};

export default Page;
