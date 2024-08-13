import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Music",
};

const Page = () => {
   return (
      <div className="space-y-2 py-4">
         <h1 className="gradient-text p-2 text-4xl font-bold md:text-6xl">
            Oops!
         </h1>
         <p>
            This page has been taken down for{" "}
            <span className="font-bold">personal</span> reasons. Toodles!
         </p>
      </div>
   );
};

export default Page;
