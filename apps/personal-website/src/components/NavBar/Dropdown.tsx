import React from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { FiSettings } from "react-icons/fi";

import { shimmer } from "~/lib/shimmer";

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
   const { data: session, status } = useSession();

   const aria = `Click to log ${
      status === "unauthenticated" ? "in" : "out"
   } to your account`;

   return (
      <>
         <DropdownMenu>
            <DropdownMenuTrigger>
               {status !== "authenticated" && !session ? (
                  <div className="cursor-pointer rounded bg-gray-200 p-2 transition duration-100 ease-in-out hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700">
                     <FiSettings
                        className="h-6 w-6 cursor-pointer rounded-full text-gray-500 dark:text-gray-400"
                        aria-label="Settings"
                        title="Settings"
                     />
                  </div>
               ) : (
                  <Image
                     width={35}
                     height={35}
                     className="cursor-pointer rounded-full"
                     src={session?.user?.image || ""}
                     blurDataURL={shimmer(1920, 1080)}
                     placeholder="blur"
                     aria-label="Settings+Account"
                     title="Settings+Account"
                     alt="Profile Picture"
                  />
               )}
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
               {status === "unauthenticated" ? (
                  <DropdownMenuItem title={aria} aria-label={aria} asChild>
                     <Link href="/sign-in">Sign In</Link>
                  </DropdownMenuItem>
               ) : (
                  status === "authenticated" && (
                     <DropdownMenuItem
                        onClick={() => signOut()}
                        title={aria}
                        aria-label={aria}
                     >
                        Sign Out
                     </DropdownMenuItem>
                  )
               )}
            </DropdownMenuContent>
         </DropdownMenu>
      </>
   );
};

export default Dropdown;
