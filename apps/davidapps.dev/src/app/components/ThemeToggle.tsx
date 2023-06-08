"use client";

import { useTheme } from "next-themes";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const ThemeToggle = (): JSX.Element => {
   const { resolvedTheme, setTheme } = useTheme();

   const updateTheme = () => {
      resolvedTheme === "dark" ? setTheme("light") : setTheme("dark");
   };

   return (
      <div className="fixed z-10 top-8 right-12">
         <DarkModeSwitch
            checked={resolvedTheme === "dark"}
            onChange={updateTheme}
         />
      </div>
   );
};

export default ThemeToggle;
