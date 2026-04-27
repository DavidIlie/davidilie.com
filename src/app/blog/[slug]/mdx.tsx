"use client";

/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import * as runtime from "react/jsx-runtime";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { shimmer } from "~/lib/shimmer";

// Emil's ease-out from CLAUDE.md
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

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
   const [open, setOpen] = React.useState(false);

   React.useEffect(() => {
      if (!open) return;
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
         if (e.key === "Escape") setOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
         document.body.style.overflow = prevOverflow;
         window.removeEventListener("keydown", onKey);
      };
   }, [open]);

   return (
      <figure className="my-6">
         <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={alt ? `Zoom: ${alt}` : "Zoom image"}
            className="block w-full cursor-zoom-in overflow-hidden rounded-xl border border-border/60 bg-muted/20 transition-opacity duration-200 hover:opacity-95 focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
         >
            <Image
               {...props}
               alt={alt}
               placeholder="blur"
               blurDataURL={shimmer(1920, 1080)}
               sizes="(min-width: 1024px) 768px, 100vw"
               className="h-auto w-full"
               style={{ width: "100%", height: "auto", ...props.style }}
            />
         </button>
         {alt && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
               {alt}
            </figcaption>
         )}
         <AnimatePresence>
            {open && (
               <ImageLightbox
                  src={props.src as string}
                  alt={alt}
                  onClose={() => setOpen(false)}
               />
            )}
         </AnimatePresence>
      </figure>
   );
};

interface ImageLightboxProps {
   src: string;
   alt: string;
   onClose: () => void;
}

const ImageLightbox = ({ src, alt, onClose }: ImageLightboxProps) => {
   return (
      <motion.div
         role="dialog"
         aria-modal="true"
         aria-label={alt || "Image preview"}
         onClick={onClose}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.2, ease: EASE_OUT }}
         className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center overscroll-contain bg-black/90 p-4 backdrop-blur-sm sm:p-8"
      >
         <motion.button
            type="button"
            onClick={(e) => {
               e.stopPropagation();
               onClose();
            }}
            aria-label="Close"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: EASE_OUT, delay: 0.05 }}
            className="fixed top-3 right-3 z-10 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur transition-colors duration-200 hover:bg-black/80 sm:top-4 sm:right-4"
         >
            <X className="h-5 w-5" />
         </motion.button>
         <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
            className="relative flex h-full max-h-[90vh] w-full max-w-6xl items-center justify-center"
         >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
               src={src}
               alt={alt}
               className="max-h-full max-w-full rounded-lg object-contain shadow-2xl select-none"
               draggable={false}
            />
         </motion.div>
      </motion.div>
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
