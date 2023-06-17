import React from "react";
import { useTheme } from "next-themes";
import { FiSettings } from "react-icons/fi";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@david/ui";

const Dropdown: React.FC = () => {
   const { resolvedTheme, setTheme } = useTheme();
   return (
      <>
         <DropdownMenu>
            <DropdownMenuTrigger>
               <div className="cursor-pointer rounded bg-gray-200 p-2 transition duration-100 ease-in-out hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <FiSettings
                     className="h-6 w-6 cursor-pointer rounded-full text-gray-500 dark:text-gray-400"
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
