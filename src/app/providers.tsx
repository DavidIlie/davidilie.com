"use client";

import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PlausibleProvider from "next-plausible";
import { ThemeProvider } from "next-themes";

import { TRPCReactProvider } from "~/trpc/react";

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
         customDomain="https://plausible.davidapps.dev"
      >
         <ThemeProvider attribute="class">
            <TRPCReactProvider>
               {props.children}
               <ReactQueryDevtools initialIsOpen={false} />
            </TRPCReactProvider>
         </ThemeProvider>
      </PlausibleProvider>
   );
};

export default Providers;
