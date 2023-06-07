"use client";

import React from "react";
import { ThemeProvider as ThemeNextProvider } from "next-themes";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
   children,
}) => {
   return <ThemeNextProvider attribute="class">{children}</ThemeNextProvider>;
};
