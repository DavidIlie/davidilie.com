"use client";

/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import * as runtime from "react/jsx-runtime";
import Image, { ImageProps } from "next/image";
import Link from "next/link";
import { Info, X } from "lucide-react";
import { AnimatePresence, m } from "motion/react";

import { shimmer } from "~/lib/shimmer";

import { MotionProvider } from "~/components/motion";

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
         <MotionProvider>
            <AnimatePresence>
               {open && (
                  <ImageLightbox
                     src={props.src as string}
                     alt={alt}
                     onClose={() => setOpen(false)}
                  />
               )}
            </AnimatePresence>
         </MotionProvider>
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
      <m.div
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
         <m.button
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
         </m.button>
         <m.div
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
         </m.div>
      </m.div>
   );
};

interface CalloutProps {
   italic?: boolean;
   children: React.ReactNode;
}

// Italic callouts render as pull-quotes; everything else becomes a note
// card with a single icon.
const Callout = ({ italic, children }: CalloutProps) => {
   if (italic) {
      return (
         <figure className="not-prose relative my-8 pl-10 sm:pl-12">
            <span
               aria-hidden
               className="pointer-events-none absolute -top-2 left-0 font-display text-[5.5rem] leading-none text-foreground/15 select-none"
            >
               &ldquo;
            </span>
            <blockquote className="m-0 border-0 bg-transparent p-0 text-[1.0625rem] leading-[1.65] text-foreground/85 italic [&>p]:m-0 [&>p+p]:mt-3">
               {children}
            </blockquote>
         </figure>
      );
   }
   return (
      <aside className="not-prose my-6 flex items-start gap-3.5 rounded-xl border border-border bg-secondary/50 px-4 py-3.5">
         <span className="mt-0.5 inline-grid size-7 flex-shrink-0 place-items-center rounded-md bg-brand/10 text-brand ring-1 ring-brand/20">
            <Info className="size-3.5" strokeWidth={2.5} aria-hidden />
         </span>
         <div className="min-w-0 flex-1 text-[0.95rem] leading-[1.65] text-foreground/90 [&_a]:font-medium [&_a]:text-brand [&_a]:underline-offset-2 hover:[&_a]:underline [&_code]:rounded-md [&_code]:bg-background/70 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.875em] [&_code]:font-medium [&>p]:m-0 [&>p+p]:mt-2">
            {children}
         </div>
      </aside>
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
