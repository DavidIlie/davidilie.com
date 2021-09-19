import React from "react";

interface LinkButtonProps {
    link: string;
    text: string;
    Icon: React.ElementType;
    className: string;
}

export const LinkButton = ({
    link,
    text,
    Icon,
    className,
}: Partial<LinkButtonProps>): JSX.Element => {
    return (
        <button
            className={`inline-flex bg-blue-500 dark:bg-blue-900 dark:hover:bg-blue-800 duration-200 p-2 rounded-xl ${className}`}
        >
            <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-white"
            >
                <Icon className="w-4 h-4 mr-2" />
                {text}
            </a>
        </button>
    );
};
