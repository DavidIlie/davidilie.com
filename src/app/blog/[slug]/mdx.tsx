/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import { useMDXComponent } from "next-contentlayer/hooks";

import { shimmer } from "~/lib/shimmer";

const CustomLink = (props: any) => {
   const href = props.href as string;

   if (href.startsWith("/")) {
      return (
         <Link href={href} {...props}>
            {props.children}
         </Link>
      );
   }

   if (href.startsWith("#")) {
      return <a {...props} />;
   }

   return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

export const CustomImage = ({ alt, ...props }: ImageProps): JSX.Element => {
   return (
      <div className="my-2 -mt-4 w-full flex-col justify-center">
         <div className="flex justify-center">
            <Image
               alt={alt}
               {...props}
               placeholder="blur"
               blurDataURL={shimmer(1920, 1080)}
            />
         </div>
         <h1 className="-mt-5 text-center text-sm font-normal text-gray-700 dark:text-gray-300">
            {alt}
         </h1>
      </div>
   );
};

const Callout = (props: any) => {
   return (
      <div className="my-4 flex rounded-lg border border-neutral-200 bg-neutral-100 px-4 py-2 dark:border-neutral-800 dark:bg-neutral-900">
         <div className="mr-3 flex w-4 items-center text-xl">{props.emoji}</div>
         <div className={`callout w-full ${props.italic && "italic"}`}>
            {props.children}
         </div>
      </div>
   );
};

export const YouTubeVideo = ({
   url,
   width = 560,
   height = 312,
}: {
   url: string;
   width?: number;
   height?: number;
}) => (
   <div className="mb-8 flex justify-center">
      <iframe
         width={width}
         height={height}
         src={url}
         title="YouTube video player"
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
         allowFullScreen
      />
   </div>
);

export const GitHubRepository = ({
   username = "DavidIlie",
   repo,
}: {
   username?: string;
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

const components = {
   Image: CustomImage,
   GitHubRepository,
   YouTubeVideo,
   a: CustomLink,
   Callout,
};

interface MdxProps {
   code: string;
}

export function Mdx({ code }: MdxProps) {
   const Component = useMDXComponent(code);

   return (
      <article className="prose-quoteless prose prose-neutral max-w-full dark:prose-invert">
         <Component components={{ ...components }} />
      </article>
   );
}
