"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Fade } from "react-awesome-reveal";
import { IconType } from "react-icons";
import { AiFillGithub, AiOutlineGoogle } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";

const Page = () => {
   const params = useSearchParams();
   const returnUrl = params.get("returnUrl");

   return (
      <Fade triggerOnce>
         <div className="border-2 px-4 py-8 shadow dark:border-gray-700 dark:bg-gray-800 sm:rounded-lg sm:border-l sm:border-r sm:px-10">
            <div className="-mb-1 flex flex-col justify-center">
               <button
                  className="relative inline-flex items-center justify-center gap-2 rounded-md border border-blue-700 bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm duration-150 hover:bg-blue-700 dark:border-blue-700 dark:bg-blue-600 dark:hover:border-blue-800 dark:hover:bg-blue-700 sm:rounded-lg sm:px-12 sm:py-6 sm:text-2xl sm:font-semibold"
                  onClick={() =>
                     returnUrl
                        ? signIn("github", {
                             callbackUrl: decodeURIComponent(returnUrl) || "/",
                          })
                        : signIn("github")
                  }
               >
                  <AiFillGithub />
                  Sign in with GitHub
               </button>
               <div className="mt-4">
                  <div className="relative">
                     <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t dark:border-gray-700"></div>
                     </div>
                     <div className="relative flex justify-center text-sm">
                        <span className="px-2 dark:bg-gray-800 dark:text-gray-300">
                           Or continue with
                        </span>
                     </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                     <PlatformButton icon={AiOutlineGoogle} platform="google" />
                     <PlatformButton icon={FaDiscord} platform="discord" />
                  </div>
                  <p className="prose prose-sm mt-4 text-xs text-gray-500">
                     By signing in, you agree to my inexistant{" "}
                     <span className="text-blue-600">Terms of Service</span> and{" "}
                     <span className="text-blue-600">Privacy Policy</span>.
                  </p>
               </div>
            </div>
         </div>
      </Fade>
   );
};

const PlatformButton = (props: {
   icon: IconType;
   platform: "google" | "discord";
}) => {
   const params = useSearchParams();
   const returnUrl = params.get("returnUrl");

   return (
      <button
         className="relative inline-flex items-center justify-center gap-2 rounded-md border bg-gray-50 px-6 py-3 text-base font-medium shadow-sm duration-150 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900/50 dark:hover:bg-gray-900 dark:hover:text-gray-100"
         onClick={() =>
            returnUrl
               ? signIn(props.platform, {
                    callbackUrl: decodeURIComponent(returnUrl) || "/",
                 })
               : signIn(props.platform)
         }
      >
         <props.icon />
         {props.platform[0]?.toUpperCase() + props.platform.slice(1)}
      </button>
   );
};

export default Page;
