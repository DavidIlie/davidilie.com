import {
   FaDiscord,
   FaYoutube,
   FaTwitter,
   FaTwitch,
   FaGithub,
} from "react-icons/fa";

import { Tooltip } from "./Tooltip";

export const Socials: React.FC<{
   font: string | number;
   invisible?: boolean;
}> = ({ font, invisible = false }) => {
   return (
      <div
         className={`mt-2 text-black dark:text-white flex gap-8 justify-center ${
            invisible ? "invisible" : "visible"
         }`}
      >
         <SocialIcon
            tooltip="DavidIlie"
            newPage
            link="https://github.com/davidilie"
         >
            <FaGithub
               className="mb-1"
               size={font !== undefined ? `${font}em` : "1.75em"}
            />
         </SocialIcon>
         <SocialIcon tooltip="albastru#0922" notLink>
            <FaDiscord size={font !== undefined ? `${font}em` : "1.75em"} />
         </SocialIcon>
         <SocialIcon
            tooltip="David Ilie"
            newPage
            link="https://www.youtube.com/channel/UC92hn9Y8WcY_5LribMDW8uA"
         >
            <FaYoutube
               className="mb-1"
               size={font !== undefined ? `${font}em` : "1.75em"}
            />
         </SocialIcon>
         <SocialIcon
            tooltip="codingdavid"
            newPage
            link="https://www.twitch.tv/codingdavid"
         >
            <FaTwitch size={font !== undefined ? `${font}em` : "1.75em"} />
         </SocialIcon>
         <SocialIcon
            tooltip="MrDavidIlie"
            newPage
            link="https://twitter.com/MrDavidIlie"
         >
            <FaTwitter size={font !== undefined ? `${font}em` : "1.75em"} />
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
      <div className="cursor-pointer">
         <Tooltip content={tooltip} placement="bottom">
            {!notLink ? (
               <a
                  href={link}
                  target={newPage ? "_blank" : ""}
                  rel="noreferrer"
                  className="hover:text-blue-100 duration-250"
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
         </Tooltip>
      </div>
   );
};
