import React from "react";

interface BadgeProps {
    label: string;
}

const Badge = ({ label }: BadgeProps): JSX.Element => {
    return (
        <span className="absolute z-50 right-2 top-2 ml-1 inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-gray-900 bg-green-500 rounded-md">
            {label}
        </span>
    );
};

export default Badge;
