"use client";

import React from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
   children,
}) => {
   return <NextThemeProvider>{children}</NextThemeProvider>;
};
