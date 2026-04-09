import React from "react";
import Link from "next/link";

import ExternalLink from "./external-link";
import { Button } from "./ui/button";

export const ServicesButtons: React.FC = () => {
   return (
      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
         <Link href="/editing-portfolio">
            <Button
               variant="outline"
               size="lg"
               className="w-full rounded-xl border border-border/80 bg-card/60 px-8 py-3 font-semibold text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:shadow-md sm:w-auto"
            >
               Editing Portfolio
            </Button>
         </Link>
         <Link href="/developer-portfolio">
            <Button
               variant="outline"
               size="lg"
               className="w-full rounded-xl border border-border/80 bg-card/60 px-8 py-3 font-semibold text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:shadow-md sm:w-auto"
            >
               Developer Portfolio
            </Button>
         </Link>
      </div>
   );
};

export const CallToAction: React.FC = () => {
   return (
      <div className="border-t border-border/80 bg-blue-50/40 dark:bg-blue-950/20">
         <div className="container max-w-4xl px-6 py-12">
            <div className="space-y-6 text-center">
               <h1 className="p-1 text-4xl font-medium text-brand sm:text-5xl">
                  I&apos;d love to work with you!
               </h1>
               <div className="mx-auto max-w-2xl space-y-4">
                  <p className="text-xl font-medium text-muted-foreground sm:text-2xl">
                     Check out the portfolios below to see what I can do for you
                  </p>
                  <p className="text-lg text-muted-foreground">
                     Or send me an email so we can chat about your project
                  </p>
               </div>
               <ServicesButtons />
               <div className="pt-8">
                  <div className="mx-auto max-w-md rounded-2xl border border-border/80 bg-card/60 p-6 backdrop-blur-xs">
                     <p className="mb-3 text-sm font-medium text-muted-foreground">
                        Or you can contact me at:
                     </p>
                     <ExternalLink
                        url="mailto:david@davidilie.com"
                        className="inline-flex items-center gap-2 text-xl font-semibold text-brand transition-colors duration-200 hover:text-brand/80"
                     >
                        david@davidilie.com
                     </ExternalLink>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};
