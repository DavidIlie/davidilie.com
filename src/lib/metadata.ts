import type { Metadata } from "next";

const SITE_NAME = "David Ilie";
const TWITTER_HANDLE = "@MrDavidIlie";

type BuildMetadataArgs = {
   title: string;
   description: string;
   /** Absolute path from the site root, e.g. "/music". Used for canonical + og:url. */
   path: "/" | `/${string}`;
   /**
    * og/twitter image. Relative paths are resolved against `metadataBase`
    * (set in the root layout); absolute URLs pass through untouched. Defaults
    * to the dynamic `/og` card, which always renders.
    */
   image?: string;
   /** Home page: the title is the full <title>, with no "| David Ilie" suffix. */
   absoluteTitle?: boolean;
   type?: "website" | "article";
   /** ISO date, only used when `type` is "article". */
   publishedTime?: string;
};

/**
 * Builds a complete, per-route metadata object. Next.js shallow-merges
 * metadata, so a child route that sets only `title` keeps the root layout's
 * generic `openGraph`/`twitter` — which is why every page was showing the same
 * "David Ilie" social embed. This emits the full og + twitter block so each
 * route gets its own preview.
 */
export function buildMetadata({
   title,
   description,
   path,
   image,
   absoluteTitle = false,
   type = "website",
   publishedTime,
}: BuildMetadataArgs): Metadata {
   const socialTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
   const ogImage = image ?? `/og?title=${encodeURIComponent(title)}`;

   const openGraph: Metadata["openGraph"] =
      type === "article"
         ? {
              title: socialTitle,
              description,
              url: path,
              siteName: SITE_NAME,
              locale: "en_GB",
              type: "article",
              publishedTime,
              images: [{ url: ogImage, alt: socialTitle }],
           }
         : {
              title: socialTitle,
              description,
              url: path,
              siteName: SITE_NAME,
              locale: "en_GB",
              type: "website",
              images: [{ url: ogImage, alt: socialTitle }],
           };

   return {
      title: absoluteTitle ? { absolute: title } : title,
      description,
      alternates: { canonical: path },
      openGraph,
      twitter: {
         card: "summary_large_image",
         title: socialTitle,
         description,
         site: TWITTER_HANDLE,
         creator: TWITTER_HANDLE,
         images: [ogImage],
      },
   };
}
