import Tooltip from "@ui/Tooltip";
import React from "react";

interface SocialIconProps {
    children: React.ReactNode;
    tooltip: string;
    newPage: boolean;
    link: string;
    notLink: boolean;
}

export const SocialIcon = ({
    children,
    tooltip,
    newPage,
    link,
    notLink,
}: Partial<SocialIconProps>): JSX.Element => {
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
                    <span className="hover:text-blue-100 duration-250">
                        {children}
                    </span>
                )}
            </Tooltip>
        </div>
    );
};
