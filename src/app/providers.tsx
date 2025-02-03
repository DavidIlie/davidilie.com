"use client";

import React from "react";
import PlausibleProvider from "next-plausible";
import { ThemeProvider } from "next-themes";

const Providers: React.FC<{
   children: React.ReactNode;
   headers?: Headers;
}> = (props) => {
   return (
      <PlausibleProvider
         domain="davidilie.com"
         trackOutboundLinks
         enabled={process.env.NODE_ENV === "production"}
         selfHosted
      >
         <ThemeProvider attribute="class">{props.children}</ThemeProvider>
      </PlausibleProvider>
   );
};

export default Providers;
