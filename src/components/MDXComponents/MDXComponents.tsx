/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { HiOutlineInformationCircle, HiOutlineLightBulb } from "react-icons/hi";
import { RiBubbleChartLine } from "react-icons/ri";
import { FaQuoteLeft } from "react-icons/fa";
import { TiWarningOutline } from "react-icons/ti";
import Image, { ImageProps } from "next/image";

import { shimmer } from "@/lib/shimmer";
import Tooltip from "@/components/Tooltip";

interface DefinitionStylesProps {
   term: string;
   definition: string;
   link?: string;
}

export const Definition = ({
   term,
   definition,
   link,
}: DefinitionStylesProps): JSX.Element => {
   return (
      <Tooltip content={definition}>
         {typeof link === "string" ? (
            <a
               href={link}
               target="_blank"
               rel="noreferrer"
               className="text-blue-400 cursor-pointer"
            >
               {term}
            </a>
         ) : (
            <span className="text-blue-400 cursor-pointer">{term}</span>
         )}
      </Tooltip>
   );
};

interface CustomLinkProps {
   href: string;
   children: React.ReactNode;
}

export const CustomLink = (props: CustomLinkProps) => {
   const href = props.href;
   const isInternalLink =
      href && (href.startsWith("/") || href.startsWith("#"));

   if (isInternalLink) {
      return (
         <Link href={props.href}>
            <a
               className="text-blue-500 duration-200 cursor-pointer hover:text-blue-600 hover:underline"
               {...props}
            >
               {props.children}
            </a>
         </Link>
      );
   }
   return (
      <a
         //@ts-ignore
         href={props.href}
         className="text-blue-500 duration-200 cursor-pointer hover:text-blue-600 hover:underline"
         {...props}
      >
         {props.children}
      </a>
   );
};

interface CustomImageProps {
   border?: boolean;
}

export const CustomImage = ({
   alt,
   border,
   ...props
}: ImageProps & CustomImageProps): JSX.Element => {
   return (
      <div className="flex-col justify-center w-full blog-image">
         <div className="flex justify-center blog-image">
            <Image
               alt={alt}
               {...props}
               placeholder="blur"
               blurDataURL={shimmer(1920, 1080)}
            />
         </div>
         <h1 className="mt-2 font-semibold text-center text-gray-300 blog-image">
            {alt}
         </h1>
      </div>
   );
};

export const CustomUnorderedList = ({
   children,
}: {
   children: React.ReactNode;
}): JSX.Element => {
   return <ul className="mt-3 ml-5 list-disc">{children}</ul>;
};

export const CustomListItem = ({
   children,
}: {
   children: React.ReactNode;
}): JSX.Element => {
   return (
      <li className="text-indigo-500">
         <span className="text-black dark:text-white">{children}</span>
      </li>
   );
};

export const InfoQuote = ({ children }: { children: JSX.Element }) => (
   <div className="relative px-6 py-1 mb-5 leading-relaxed text-gray-800 bg-blue-700 border-l-4 border-blue-700 rounded-lg dark:text-gray-300 bg-opacity-20 dark:border-blue-500 dark:bg-blue-500 dark:bg-opacity-10">
      <div
         className="flex items-center justify-center w-10 h-10 text-center bg-gray-200 rounded-full dark:bg-gray-900"
         style={{
            float: "left",
            position: "absolute",
            top: "-30px",
            left: "-20px",
         }}
      >
         <HiOutlineInformationCircle className="text-3xl text-blue-500" />
      </div>
      <div className="p-0 m-0 mb-3 text-lg">{children}</div>
   </div>
);

export const ThoughtQuote = ({ children }: { children: JSX.Element }) => (
   <div className="relative px-6 py-1 leading-relaxed text-gray-800 bg-purple-700 border-l-4 border-purple-700 rounded-lg dark:text-gray-300 bg-opacity-20 dark:border-purple-500 dark:bg-purple-500 dark:bg-opacity-10">
      <div
         className="flex items-center justify-center w-10 h-10 text-center bg-gray-200 rounded-full dark:bg-gray-900"
         style={{
            float: "left",
            position: "absolute",
            top: "-30px",
            left: "-20px",
         }}
      >
         <RiBubbleChartLine className="text-3xl text-purple-600 dark:text-purple-500" />
      </div>
      <div className="p-0 m-0 mb-3 text-lg">{children}</div>
   </div>
);

export const AnnouncementQuote = ({ children }: { children: JSX.Element }) => (
   <div className="relative px-6 py-1 leading-relaxed text-gray-800 bg-yellow-700 border-l-4 border-yellow-700 rounded-lg dark:text-gray-300 dark:border-yellow-500 dark:bg-yellow-500 bg-opacity-20 dark:bg-opacity-10">
      <div
         className="flex items-center justify-center w-10 h-10 text-center bg-gray-200 rounded-full dark:bg-gray-900"
         style={{
            float: "left",
            position: "absolute",
            top: "-30px",
            left: "-20px",
         }}
      >
         <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-yellow-600 dark:text-yellow-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
         >
            <path
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeWidth={2}
               d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
            />
         </svg>
      </div>
      <div className="p-0 m-0 mb-3 text-lg">{children}</div>
   </div>
);

export const BlockQuote = ({ children }: { children: JSX.Element }) => (
   <div className="relative px-6 py-1 leading-relaxed text-gray-800 bg-gray-400 border-l-4 border-gray-600 rounded-lg dark:text-gray-300 dark:border-gray-300 bg-opacity-20 dark:bg-opacity-10">
      <div
         className="flex items-center justify-center w-10 h-10 text-center bg-gray-200 rounded-full dark:bg-gray-900"
         style={{
            float: "left",
            position: "absolute",
            top: "-30px",
            left: "-20px",
         }}
      >
         <FaQuoteLeft />
      </div>
      <div className="p-0 m-0 mb-3 text-lg italic">{children}</div>
   </div>
);

export const IdeaQuote = ({ children }: { children: JSX.Element }) => (
   <div className="relative px-6 py-1 mb-6 leading-relaxed text-gray-800 bg-yellow-600 border-l-4 border-yellow-600 rounded-lg dark:text-gray-300 dark:border-yellow-400 dark:bg-yellow-400 bg-opacity-20 dark:bg-opacity-10">
      <div
         className="flex items-center justify-center w-10 h-10 text-center bg-gray-200 rounded-full dark:bg-gray-900"
         style={{
            float: "left",
            position: "absolute",
            top: "-30px",
            left: "-20px",
         }}
      >
         <HiOutlineLightBulb className="text-3xl text-yellow-500 dark:text-yellow-400" />
      </div>
      <div className="p-0 m-0 mb-3 text-lg">{children}</div>
   </div>
);

export const WarningQuote = ({ children }: { children: JSX.Element }) => (
   <div className="relative px-6 py-1 mb-6 leading-relaxed text-gray-800 bg-red-600 border-l-4 border-red-600 rounded-lg dark:text-gray-300 dark:border-red-500 dark:bg-red-500 bg-opacity-20 dark:bg-opacity-10">
      <div
         className="flex items-center justify-center w-10 h-10 text-center bg-gray-200 rounded-full dark:bg-gray-900"
         style={{
            float: "left",
            position: "absolute",
            top: "-30px",
            left: "-20px",
         }}
      >
         <TiWarningOutline className="text-3xl text-red-700 dark:text-red-500" />
      </div>
      <div className="p-0 m-0 mb-3 text-lg">{children}</div>
   </div>
);

export const h1 = ({ children }: { children: any }) => (
   <h1 className="mt-4 text-4xl font-extrabold text-black dark:text-white">
      {children}
   </h1>
);

export const h2 = ({ children }: { children: any }) => (
   <h2 className="mt-4 text-3xl font-extrabold text-black dark:text-white">
      {children}
   </h2>
);

export const h3 = ({ children }: { children: any }) => (
   <h3 className="text-2xl font-extrabold text-black dark:text-white">
      {children}
   </h3>
);

export const h4 = ({ children }: { children: any }) => (
   <h4 className="text-xl font-extrabold text-black dark:text-white">
      {children}
   </h4>
);

export const h5 = ({ children }: { children: any }) => (
   <h5 className="text-lg font-extrabold text-black dark:text-white">
      {children}
   </h5>
);

export const h6 = ({ children }: { children: any }) => (
   <h6 className="font-extrabold text-black text-md dark:text-white">
      {children}
   </h6>
);

export const YouTubeVideo = ({
   url,
   width = 560,
   height = 312,
}: {
   url: string;
   width?: number;
   height?: number;
}) => (
   <div className="flex justify-center blog-image">
      <iframe
         width={width}
         height={height}
         src={url}
         title="YouTube video player"
         frameBorder="0"
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
         allowFullScreen
      ></iframe>
   </div>
);

export const GitHubRepository = ({
   username = "DavidIlie",
   repo,
}: {
   username: string;
   repo: string;
}) => (
   <span className="flex justify-center pb-3">
      <a
         href={`https://github.com/${username}/${repo}`}
         target="_blank"
         rel="noreferrer"
      >
         <img
            alt="GitHub Stats"
            src={`https://github-readme-stats.vercel.app/api/pin/?username=${username}&repo=${repo}&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515`}
         />
      </a>
   </span>
);
