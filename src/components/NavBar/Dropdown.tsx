import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { FiSettings } from "react-icons/fi";
import { Menu } from "@headlessui/react";

import { shimmer } from "@/lib/shimmer";
import { AiFillBug } from "react-icons/ai";
import ThemeToggle from "./ThemeToggle";

const Dropdown: React.FC = () => {
   const { asPath } = useRouter();
   const { data: session, status } = useSession();

   const aria = `Click to log ${
      status === "unauthenticated" ? "in" : "out"
   } to your account`;

   return (
      <Menu as="div" className="relative inline-block mt-1 text-right">
         <Menu.Button>
            {status !== "authenticated" && !session ? (
               <div className="p-2 transition duration-100 ease-in-out bg-gray-200 rounded cursor-pointer hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <FiSettings
                     className="w-6 h-6 text-gray-500 rounded-full cursor-pointer dark:text-gray-400"
                     aria-label="Settings"
                     title="Settings"
                  />
               </div>
            ) : (
               <div className="">
                  <Image
                     width={50}
                     height={50}
                     className="rounded-full cursor-pointer"
                     src={session?.user?.image || ""}
                     blurDataURL={shimmer(1920, 1080)}
                     placeholder="blur"
                     aria-label="Settings+Account"
                     title="Settings+Account"
                  />
               </div>
            )}
         </Menu.Button>
         <Menu.Items className="absolute right-0 bg-gray-100 rounded-md shadow-lg w-36 dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="border-gray-200 border-1 rounded-t-md dark:border-gray-900">
               <Menu.Item>
                  <a
                     href="https://github.com/DavidIlie/davidilie.com/issues"
                     target="_blank"
                     rel="noreferrer"
                     aria-label="Submit a bug report"
                     title="Submit a bug report"
                  >
                     <DropdownElement>
                        <AiFillBug className="mx-0.5 text-xl" />
                        Report a bug
                     </DropdownElement>
                  </a>
               </Menu.Item>
               <Menu.Item as={DropdownElement}>
                  <ThemeToggle />
               </Menu.Item>
            </div>
            {status === "unauthenticated" ? (
               <Menu.Item
                  as={NextLink}
                  href={`/sign-in${
                     asPath !== "/"
                        ? `?returnUrl=${encodeURIComponent(asPath)}`
                        : ""
                  }`}
               >
                  <a
                     className="flex items-center justify-center w-full py-2 text-sm font-semibold text-center text-white bg-blue-600 cursor-pointer dark:bg-blue-800 group rounded-b-md"
                     aria-label={aria}
                     title={aria}
                  >
                     Log In
                  </a>
               </Menu.Item>
            ) : status === "authenticated" ? (
               <div
                  className="flex items-center justify-center w-full py-2 text-sm font-semibold text-center text-white bg-blue-600 cursor-pointer dark:bg-blue-800 group rounded-b-md"
                  aria-label={aria}
                  title={aria}
                  onClick={() => signOut()}
               >
                  Log Out
               </div>
            ) : (
               <div className="flex items-center justify-center w-full py-2 text-sm font-semibold text-center text-white bg-gray-600 cursor-not-allowed dark:bg-gray-800 group rounded-b-md">
                  Loading
               </div>
            )}
         </Menu.Items>
      </Menu>
   );
};

export const DropdownElement: React.FC<{ children: React.ReactNode }> = ({
   children,
}) => {
   return (
      <div className="flex items-center w-full gap-1 px-2 py-2 text-sm group rounded-b-md">
         {children}
      </div>
   );
};

// https://github.com/tailwindlabs/headlessui/issues/120#issuecomment-717174190
function NextLink(props: any) {
   const { href, children, ...rest } = props;
   return (
      <Link href={href}>
         <a {...rest}>{children}</a>
      </Link>
   );
}

export default Dropdown;
