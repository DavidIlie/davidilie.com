import React from "react";
import Header from "./Header";
import TimelineItem from "./components/TimelineItem";

const items = [
   {
      title: "Hardware",
      description: "Proxmox has been ",
      imageSrc: "/path/to/image1.jpg",
   },
   {
      title: "Hypervisor",
      description: "Proxmox has been ",
      imageSrc: "/path/to/image1.jpg",
      link: "https://www.proxmox.com/en/",
   },
];

const Page = () => {
   return (
      <>
         <div className="flex items-center justify-center flex-grow min-h-screen px-4 text-center">
            <Header />
         </div>
         <div className="container flex justify-center py-8 mx-auto">
            <div className="relative flex flex-col space-y-12">
               {items.map((item, index) => (
                  <React.Fragment key={index}>
                     {index !== 0 && (
                        <div className="absolute top-0 bottom-0 w-1 bg-gray-300 left-4"></div>
                     )}
                     <TimelineItem {...item} />
                  </React.Fragment>
               ))}
            </div>
         </div>
      </>
   );
};

export default Page;
