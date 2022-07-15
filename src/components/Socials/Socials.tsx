import {
   FaDiscord,
   FaYoutube,
   FaTwitter,
   FaTwitch,
   FaGithub,
} from "react-icons/fa";

import { SocialIcon } from "./SocialIcon";

interface SocialsProps {
   font: string | number;
   invisible?: boolean;
}

export const Socials: React.FC<SocialsProps> = ({
   font,
   invisible = false,
}) => {
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
         <SocialIcon tooltip="Albastru#0001" notLink>
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
            tooltip="AlbastruYT"
            newPage
            link="https://twitter.com/AlbastruYT"
         >
            <FaTwitter size={font !== undefined ? `${font}em` : "1.75em"} />
         </SocialIcon>
      </div>
   );
};

export default Socials;
