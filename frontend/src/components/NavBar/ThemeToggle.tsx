import React from "react";
import { HiMoon, HiSun } from "react-icons/hi";
import { useTheme } from "next-themes";

const ThemeToggle = (): JSX.Element => {
    const { theme, setTheme } = useTheme();

    return (
        typeof window != "undefined" && (
            <div
                className="transition duration-200 ease-in-out p-2 bg-gray-200 rounded dark:bg-gray-800 cursor-pointer"
                onClick={() =>
                    theme === "dark" ? setTheme("light") : setTheme("dark")
                }
            >
                {theme === "dark" ? (
                    <HiSun
                        aria-label="Toggle Light Mode"
                        title="Activate Light mode"
                        className="text-gray-500 dark:text-gray-400 text-2xl cursor-pointer"
                    />
                ) : (
                    <HiMoon
                        aria-label="Toggle Dark Mode"
                        title="Activate Dark mode"
                        className="text-gray-500 dark:text-gray-400 text-2xl cursor-pointer"
                    />
                )}
            </div>
        )
    );
};

export default ThemeToggle;
