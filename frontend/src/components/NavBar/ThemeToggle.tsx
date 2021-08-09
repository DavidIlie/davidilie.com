import React from "react";
import { HiMoon, HiSun } from "react-icons/hi";
import { useTheme } from "next-themes";

const ThemeToggle = (): JSX.Element => {
    const { theme, setTheme } = useTheme();

    return (
        typeof window != "undefined" && (
            <button
                className="group flex gap-1 rounded-b-md items-center w-full"
                aria-label={
                    theme === "dark" ? "Toggle Light Mode" : "Toggle Dark Mode"
                }
                title={
                    theme === "dark" ? "Toggle Light Mode" : "Toggle Dark Mode"
                }
                onClick={() =>
                    theme === "dark" ? setTheme("light") : setTheme("dark")
                }
            >
                {theme === "dark" ? (
                    <HiSun className="text-2xl" />
                ) : (
                    <HiMoon className="text-2xl" />
                )}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
        )
    );
};

export default ThemeToggle;
