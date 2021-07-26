import React from "react";

interface BadgeProps {
    label: string;
    color?: string;
    background?: string;
}

const Badge = ({ label, color, background }: BadgeProps): JSX.Element => {
    return (
        <span
            className={`px-2 py-1 text-xs font-bold leading-none ${
                !color && "text-gray-900"
            } ${!background && "bg-green-500"} rounded-md`}
            style={{ background: background, color: color }}
        >
            {label}
        </span>
    );
};

export default Badge;
