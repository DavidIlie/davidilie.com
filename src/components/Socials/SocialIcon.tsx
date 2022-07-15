import React from "react";
import { useClipboard } from "@mantine/hooks";

import Tooltip from "../Tooltip";

interface SocialIconProps {
   children: React.ReactNode;
   tooltip: string;
   newPage: boolean;
   link: string;
   notLink: boolean;
}

export const SocialIcon: React.FC<Partial<SocialIconProps>> = ({
   children,
   tooltip,
   newPage,
   link,
   notLink,
}) => {
   const clipboard = useClipboard({ timeout: 500 });
   return (
      <div className="cursor-pointer">
         <Tooltip content={tooltip} placement="bottom">
            {!notLink ? (
               <a
                  href={link}
                  target={newPage ? "_blank" : ""}
                  rel="noreferrer"
                  className="hover:text-blue-100 duration-250"
               >
                  {children}
               </a>
            ) : (
               <span
                  className="duration-250 hover:text-blue-100"
                  onClick={() => clipboard.copy(tooltip)}
               >
                  {children}
               </span>
            )}
         </Tooltip>
      </div>
   );
};
