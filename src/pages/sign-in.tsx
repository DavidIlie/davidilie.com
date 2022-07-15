import type { NextPage, GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { IconType } from "react-icons";
import { AiFillGithub, AiOutlineGoogle } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";
import { unstable_getServerSession } from "next-auth";

import { authOptions } from "./api/auth/[...nextauth]";

const SignIn: NextPage = () => {
   const { query } = useRouter();
   return (
      <>
         <NextSeo title="Sign In" />
         <div className="flex items-center justify-center flex-grow py-12 space-y-8 sm:px-6 lg:px-8 lg:space-y-12">
            <div className="w-full sm:mx-auto sm:max-w-md">
               <div className="px-4 py-8 border-2 shadow dark:border-gray-700 dark:bg-gray-800 sm:px-10 sm:rounded-lg sm:border-r sm:border-l">
                  <Fade triggerOnce>
                     <div className="flex flex-col justify-center">
                        <button
                           className="relative inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium text-white duration-150 bg-blue-600 border border-blue-700 rounded-md shadow-sm dark:bg-blue-600 dark:border-blue-700 dark:hover:bg-blue-700 dark:hover:border-blue-800 hover:bg-blue-700 sm:py-6 sm:px-12 sm:text-2xl sm:font-semibold sm:rounded-lg"
                           onClick={() =>
                              signIn("github", {
                                 callbackUrl:
                                    decodeURIComponent(
                                       (query as any).returnUrl
                                    ) || "/",
                              })
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
                                 <span className="px-2 dark:text-gray-300 dark:bg-gray-800">
                                    Or continue with
                                 </span>
                              </div>
                           </div>
                           <div className="grid grid-cols-2 gap-3 mt-4">
                              <PlatformButton
                                 icon={AiOutlineGoogle}
                                 platform="google"
                              />
                              <PlatformButton
                                 icon={FaDiscord}
                                 platform="discord"
                              />
                           </div>
                           <p className="mt-4 text-xs prose-sm prose text-gray-500">
                              By signing in, you agree to my inexistant{" "}
                              <span className="text-blue-600">
                                 Terms of Service
                              </span>{" "}
                              and{" "}
                              <span className="text-blue-600">
                                 Privacy Policy
                              </span>
                              .
                           </p>
                        </div>
                     </div>
                  </Fade>
               </div>
            </div>
         </div>
      </>
   );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
   const session = await unstable_getServerSession(
      ctx.req,
      ctx.res,
      authOptions
   );
   if (session) return { redirect: { destination: "/", permanent: false } };
   return { props: {} };
};

const PlatformButton: React.FC<{
   icon: IconType;
   platform: "google" | "discord";
}> = (props) => {
   const { query } = useRouter();
   return (
      <button
         className="relative inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-medium duration-150 border rounded-md shadow-sm bg-gray-50 hover:bg-gray-100 dark:bg-opacity-50 dark:border-gray-700 dark:bg-dark-bg dark:hover:bg-opacity-100 dark:hover:text-gray-100"
         onClick={() =>
            signIn(props.platform, {
               callbackUrl: decodeURIComponent((query as any).returnUrl) || "/",
            })
         }
      >
         <props.icon />
         {props.platform[0]!.toUpperCase() + props.platform.slice(1)}
      </button>
   );
};

export default SignIn;
