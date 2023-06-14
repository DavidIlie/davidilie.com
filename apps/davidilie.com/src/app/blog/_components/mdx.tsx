/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-has-content */
import * as React from "react";
import Link from "next/link";
import Image, { ImageProps } from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";
import { shimmer } from "~/lib/shimmer";

const CustomLink = (props) => {
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
      <div className="flex-col justify-center w-full -mt-4">
         <div className="flex justify-center">
            <Image
               alt={alt}
               {...props}
               placeholder="blur"
               blurDataURL={shimmer(1920, 1080)}
            />
         </div>
         <h1 className="-mt-5 text-sm font-normal text-center text-gray-700 dark:text-gray-300">
            {alt}
         </h1>
      </div>
   );
};

const Callout = (props) => {
   return (
      <div className="flex px-4 py-2 my-4 border rounded-lg bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
         <div className="flex items-center w-4 mr-3 text-xl">{props.emoji}</div>
         <div className={`w-full callout ${props.italic && "italic"}`}>
            {props.children}
         </div>
      </div>
   );
};

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
   a: CustomLink,
   Callout,
};

interface MdxProps {
   code: string;
}

export function Mdx({ code }: MdxProps) {
   const Component = useMDXComponent(code);

   return (
      <article className="prose prose-quoteless prose-neutral dark:prose-invert">
         <Component components={{ ...components }} />
      </article>
   );
}
