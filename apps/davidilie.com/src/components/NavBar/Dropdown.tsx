import React from "react";
import { FiSettings } from "react-icons/fi";
import { useTheme } from "next-themes";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
   DropdownMenuItem,
} from "@david/ui";

const Dropdown: React.FC = () => {
   const { resolvedTheme, setTheme } = useTheme();
   return (
      <>
         <DropdownMenu>
            <DropdownMenuTrigger>
               <div className="p-2 transition duration-100 ease-in-out bg-gray-200 rounded cursor-pointer hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <FiSettings
                     className="w-6 h-6 text-gray-500 rounded-full cursor-pointer dark:text-gray-400"
                     aria-label="Settings"
                     title="Settings"
                  />
               </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
               <DropdownMenuLabel>Settings</DropdownMenuLabel>
               <DropdownMenuSeparator />
               <DropdownMenuItem asChild>
                  <a
                     href="https://github.com/davidilie/davidilie.com/issues"
                     target="_blank"
                     rel="noreferrer"
                  >
                     Report a bug
                  </a>
               </DropdownMenuItem>
               <DropdownMenuItem
                  onClick={() =>
                     setTheme(resolvedTheme === "dark" ? "light" : "dark")
                  }
               >
                  {resolvedTheme === "dark" ? "Light" : "Dark"} Mode
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </>
   );
};

export default Dropdown;
