import Tooltip from "@ui/Tooltip";
import React from "react";

interface SocialIconProps {
    children: React.ReactNode;
    tooltip: string;
    newPage: boolean;
    link: string;
}

export const SocialIcon = ({
    children,
    tooltip,
    newPage,
    link,
}: Partial<SocialIconProps>): JSX.Element => {
    return (
        <div className="cursor-pointer">
            <Tooltip content={tooltip} placement="bottom">
                <a
                    href={link}
                    target={newPage ? "_blank" : ""}
                    rel="noreferrer"
                    className="hover:text-blue-100 duration-250"
                >
                    {children}
                </a>
            </Tooltip>
        </div>
    );
};
