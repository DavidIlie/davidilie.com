"use client";

import React from "react";
import { useMediaQuery } from "@mantine/hooks";
import ImageProject from "./_client/ImageProject";
import ResponsiveProject from "./_client/ResponsiveProject";

const ResponsiveProjectWrapper: React.FC<any> = (props) => {
   const matches = useMediaQuery("(min-width: 900px)", true);
   if (matches) {
      return <ImageProject {...props} />;
   } else {
      return <ResponsiveProject {...props} />;
   }
};

export default ResponsiveProjectWrapper;
