import React from "react";
import { HiMoon, HiSun } from "react-icons/hi";
import { useTheme } from "next-themes";

const ThemeToggle = (): JSX.Element => {
    const { theme, setTheme } = useTheme();

    return (
        <div
            className="transition duration-200 ease-in-out rounded-md p-2 cursor-pointer"
            onClick={() =>
                theme === "dark" ? setTheme("light") : setTheme("dark")
            }
        >
            {theme === "dark" ? (
                <HiSun className="text-gray-500 dark:text-gray-400 text-2xl cursor-pointer" />
            ) : (
                <HiMoon className="text-gray-500 dark:text-gray-400 text-2xl cursor-pointer" />
            )}
        </div>
    );
};

export default ThemeToggle;
