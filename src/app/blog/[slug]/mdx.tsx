"use client";

/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import * as runtime from "react/jsx-runtime";
import Image, { ImageProps } from "next/image";
import Link from "next/link";

import { shimmer } from "~/lib/shimmer";

// Evaluates build-time compiled MDX from velite (trusted content, not user input)
const useMDXComponent = (code: string) => {
   const fn = new Function(code); // eslint-disable-line no-new-func
   return fn({ ...runtime }).default;
};

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

export const CustomImage = ({ alt = "", ...props }: ImageProps) => {
   return (
      <figure className="my-6">
         <div className="flex justify-center overflow-hidden rounded-xl border border-border/60">
            <Image
               {...props}
               alt={alt}
               placeholder="blur"
               blurDataURL={shimmer(1920, 1080)}
               style={{ width: "auto", height: "auto", ...props.style }}
            />
         </div>
         {alt && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
               {alt}
            </figcaption>
         )}
      </figure>
   );
};

const Callout = (props: any) => {
   return (
      <div className="my-5 flex items-start gap-3 rounded-xl border border-brand/20 bg-brand-muted/50 px-4 py-3">
         <span className="mt-0.5 text-lg leading-none">{props.emoji}</span>
         <div
            className={`min-w-0 flex-1 text-sm ${props.italic ? "italic" : ""}`}
         >
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
   <div className="my-6 flex justify-center">
      <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-border/60">
         <iframe
            width={width}
            height={height}
            src={url}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="aspect-video w-full"
         />
      </div>
   </div>
);

export const GitHubRepository = ({
   username = "DavidIlie",
   repo,
}: {
   username?: string;
   repo: string;
}) => (
   <div className="my-4 flex justify-center">
      <a
         href={`https://github.com/${username}/${repo}`}
         target="_blank"
         rel="noreferrer"
         className="overflow-hidden rounded-xl transition-transform duration-200 hover:scale-[1.02]"
      >
         <img
            alt="GitHub Stats"
            src={`https://github-readme-stats.vercel.app/api/pin/?username=${username}&repo=${repo}&title_color=fff&icon_color=79ff97&text_color=9f9f9f&bg_color=151515`}
         />
      </a>
   </div>
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
      <article className="prose max-w-full prose-neutral dark:prose-invert prose-headings:font-display prose-headings:tracking-tight prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:leading-relaxed prose-a:text-brand prose-a:no-underline hover:prose-a:underline prose-blockquote:rounded-lg prose-blockquote:border-0 prose-blockquote:bg-secondary prose-blockquote:px-4 prose-blockquote:py-3 prose-blockquote:not-italic prose-code:before:content-none prose-code:after:content-none prose-img:my-4 prose-img:rounded-xl">
         <Component components={{ ...components }} />
      </article>
   );
}
