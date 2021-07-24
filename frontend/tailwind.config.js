module.exports = {
    purge: ["./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        fontSize: {
            xs: ".75rem",
            sm: ".875rem",
            tiny: ".875rem",
            base: "1rem",
            lg: "1.125rem",
            xl: "1.25rem",
            "2xl": "1.5rem",
            "3xl": "1.875rem",
            "4xl": "2.25rem",
            "5xl": "3rem",
            "6xl": "4rem",
            "7xl": "5rem",
            section: "1.27rem",
        },
        screens: {
            xs: "416px",
            sm: "600px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            xxl: "1520px",
        },
        minWidth: {
            0: "0",
            "2/4": "40%",
            "1/2": "45%",
            "3/4": "75%",
            full: "100%",
        },
        extend: {
            gridTemplateColumns: {
                musicTitle: "minmax(150px, 1fr)",
                musicNormal: "minmax(110px, 1fr)",
            },
            backgroundImage: (theme) => ({
                background: "url('/images/gif/background.gif')",
            }),
            keyframes: {
                wiggle: {
                    "0%, 100%": {
                        transform: "rotate(-3deg)",
                    },
                    "50%": {
                        transform: "rotate(3deg)",
                    },
                },
                "fade-in-down": {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(-10px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                },
                "fade-in-up": {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(10px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                },
                "bounce-up": {
                    "0%, 20%, 60%, 100%": {
                        transform: "translateY(0)",
                    },
                    "40%": {
                        transform: "translateY(-5px) rotate(3deg)",
                    },
                    "80%": {
                        transform: "translateY(-5px) rotate(-3deg)",
                    },
                },
            },
            animation: {
                wiggle: "wiggle 2s ease-in-out infinite",
                "fade-in-down": "fade-in-down 0.5s ease-out",
                "fade-in-up": "fade-in-up 0.5s ease-out",
                "bounce-up": "bounce-up 5s ease infinite",
            },
        },
    },
    variants: {
        extend: {
            margin: ["hover"],
        },
        scrollbar: ["rounded"],
    },
    plugins: [require("tailwind-scrollbar")],
};
