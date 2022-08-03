import React from "react";
import { HiMoon, HiSun } from "react-icons/hi";
import { useTheme } from "next-themes";

import useToggleTheme from "@/hooks/useToggleTheme";

const ThemeToggle: React.FC = () => {
   const { theme } = useTheme();
   const changeTheme = useToggleTheme();

   return (
      <button
         className="flex items-center w-full gap-1 group rounded-b-md"
         aria-label={
            theme === "dark"
               ? "Toggle Light Mode (ctrl+shift+x)"
               : "Toggle Dark Mode (ctrl+shift+x"
         }
         title={
            theme === "dark"
               ? "Toggle Light Mode (ctrl+shift+x)"
               : "Toggle Dark Mode (ctrl+shift+x)"
         }
         onClick={() => changeTheme()}
      >
         {theme === "dark" ? (
            <HiSun className="text-2xl" />
         ) : (
            <HiMoon className="text-2xl" />
         )}
         {theme === "dark" ? "Light Mode" : "Dark Mode"}
      </button>
   );
};

export default ThemeToggle;
