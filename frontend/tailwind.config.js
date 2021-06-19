module.exports = {
    purge: ["./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: false,
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
        extend: {
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
            },
            animation: {
                wiggle: "wiggle 1s ease-in-out infinite",
                "fade-in-down": "fade-in-down 0.5s ease-out",
                "fade-in-up": "fade-in-up 0.5s ease-out",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
