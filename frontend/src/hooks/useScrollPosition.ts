import { useEffect, useState } from "react";

interface StateProps {
    y: number;
    max: number;
}

export default function useScrollPosition(): { y: number; max: number } {
    const [scrollPosition, setScrollPosition] = useState<StateProps>({
        y: 0,
        max: 0,
    });
    const handleScroll = (e: WheelEvent) => {
        const { target } = e;
        const { scrollingElement } = target as HTMLDocument;
        const { scrollTop, scrollHeight, clientHeight } = scrollingElement;
        setScrollPosition({ y: scrollTop, max: scrollHeight - clientHeight });
    };

    useEffect(() => {
        // @ts-ignore
        window?.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            // @ts-ignore
            window?.removeEventListener("scroll", handleScroll);
        };
    }, [scrollPosition]);
    return { y: scrollPosition.y, max: scrollPosition.max };
}
