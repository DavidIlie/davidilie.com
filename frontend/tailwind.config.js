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
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
