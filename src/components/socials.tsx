"use client";

import { Github, Linkedin, Twitter, Youtube } from "lucide-react";

import { cn } from "~/lib/utils";

import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "~/components/ui/tooltip";

export const Socials: React.FC<{
   font: string | number;
   invisible?: boolean;
   className?: string;
}> = ({ font, invisible = false, className }) => {
   return (
      <div
         className={cn(
            `mt-2 flex items-center gap-8 text-black dark:text-white ${
               invisible ? "invisible" : "visible"
            }`,
            className,
         )}
      >
         <SocialIcon
            tooltip="DavidIlie"
            newPage
            link="https://github.com/davidilie"
         >
            <Github size={font !== undefined ? `${font}em` : "1.75em"} />
         </SocialIcon>
         <SocialIcon
            tooltip="David-Alexandru Ilie"
            newPage
            link="https://linkedin.com/in/davidilie"
         >
            <Linkedin size={font !== undefined ? `${font}em` : "1.75em"} />
         </SocialIcon>
         <SocialIcon
            tooltip="David Ilie"
            newPage
            link="https://www.youtube.com/channel/UC92hn9Y8WcY_5LribMDW8uA"
         >
            <Youtube size={font !== undefined ? `${font}em` : "1.75em"} />
         </SocialIcon>
         <SocialIcon
            tooltip="MrDavidIlie"
            newPage
            link="https://twitter.com/MrDavidIlie"
         >
            <Twitter size={font !== undefined ? `${font}em` : "1.75em"} />
         </SocialIcon>
      </div>
   );
};

export const SocialIcon: React.FC<
   Partial<{
      children: React.ReactNode;
      tooltip: string;
      newPage: boolean;
      link: string;
      notLink: boolean;
   }>
> = ({ children, tooltip, newPage, link, notLink }) => {
   return (
      <TooltipProvider>
         <Tooltip>
            <TooltipTrigger className="cursor-pointer">
               {!notLink ? (
                  <a
                     href={link}
                     target={newPage ? "_blank" : ""}
                     rel="noreferrer"
                     className="duration-250 hover:text-blue-100"
                     aria-label={`Social link: ${tooltip}`}
                  >
                     {children}
                  </a>
               ) : (
                  <span
                     className="duration-250 hover:text-blue-100"
                     //    onClick={() => clipboard.copy(tooltip)}
                  >
                     {children}
                  </span>
               )}
            </TooltipTrigger>
            <TooltipContent>
               <p>{tooltip}</p>
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>
   );
};
