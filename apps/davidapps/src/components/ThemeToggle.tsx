"use client";

import { useTheme } from "next-themes";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const ThemeToggle = (): JSX.Element => {
   const { resolvedTheme, setTheme } = useTheme();

   const updateTheme = () => {
      resolvedTheme === "dark" ? setTheme("light") : setTheme("dark");
   };

   return (
      <div className="fixed top-8 right-12 z-10">
         <DarkModeSwitch
            checked={resolvedTheme === "dark"}
            onChange={updateTheme}
         />
      </div>
   );
};

export default ThemeToggle;
