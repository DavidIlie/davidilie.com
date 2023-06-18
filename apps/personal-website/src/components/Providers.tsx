"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export const Providers: React.FC<{ children: React.ReactNode }> = ({
   children,
}) => {
   return (
      <SessionProvider>
         <ThemeProvider attribute="class">{children}</ThemeProvider>
      </SessionProvider>
   );
};
