"use client";

import { usePathname } from "next/navigation";

import { CallToAction } from "./call-to-action";

/**
 * The "I'd love to work with you!" block belongs on most pages but is
 * redundant on:
 *   - `/developer-portfolio` — has a full pricing/CTA flow
 *   - `/editing-portfolio` — has a full pricing/CTA flow
 *
 * Everywhere else (home, blog index, blog posts, projects, music) shows it.
 */
const SKIP_PATHS = ["/developer-portfolio", "/editing-portfolio"];

export const ConditionalCTA: React.FC = () => {
   const pathname = usePathname();
   if (SKIP_PATHS.includes(pathname)) return null;
   return <CallToAction />;
};
