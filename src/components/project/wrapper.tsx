"use client";

import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";

import ImageProject from "./client-image-project";
import ResponsiveProject from "./client-responsive-project";

// hack since use client is still "pre-rendered on the server and hydrated on the client"
const ResponsiveProjectWrapper: React.FC<any> = (props) => {
   const [mounted, setMounted] = useState(false);
   useEffect(() => {
      setMounted(true);
   }, []);

   const matches = useMediaQuery("(min-width: 900px)", true);

   if (!mounted)
      return (
         <>
            <div className="hidden sm:block">
               <ImageProject {...props} />
            </div>
            <div className="block sm:hidden">
               <ResponsiveProject {...props} />
            </div>
         </>
      );

   if (matches) {
      return <ImageProject {...props} />;
   } else {
      return <ResponsiveProject {...props} />;
   }
};

export default ResponsiveProjectWrapper;
