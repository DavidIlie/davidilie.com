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
            className={`bg-gray-500 dark:bg-gray-700 dark:hover:bg-blue-500 duration-200 p-2 rounded-xl ${className}`}
        >
            <a
                href={link}
                target="_blank"
                className="inline-flex items-center text-white"
            >
                <Icon className="w-4 h-4 mr-2" />
                {text}
            </a>
        </button>
    );
};
