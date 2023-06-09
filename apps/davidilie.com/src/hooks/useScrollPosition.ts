import { useEffect, useState } from "react";

interface ScrollPosition {
   y: number;
   max: number;
}

export default function useScrollPosition(): ScrollPosition {
   const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
      y: 0,
      max: 0,
   });

   const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
         document.documentElement;
      setScrollPosition({ y: scrollTop, max: scrollHeight - clientHeight });
   };

   useEffect(() => {
      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, []);

   return scrollPosition;
}
