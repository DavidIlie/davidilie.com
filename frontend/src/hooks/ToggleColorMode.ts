import { useTheme } from "next-themes";
import { useSound } from "use-sound";

export default function ToggleColorMode() {
    const { theme, setTheme } = useTheme();

    const [play] = useSound("/lightswitch.mp3", {
        volume: 0.05,
        sprite: {
            on: [0, 300],
            off: [500, 300],
        },
    });

    const updateTheme = () => {
        theme === "dark" ? setTheme("light") : setTheme("dark");
        theme === "dark" ? play({ id: "on" }) : play({ id: "off" });
    };

    return updateTheme;
}
