"use client";

import React, { useEffect, useRef, useState } from "react";

import { cn } from "~/lib/utils";

type Direction = "up" | "down" | "left" | "right";

const directionStyles: Record<Direction, string> = {
   up: "translate-y-8",
   down: "-translate-y-8",
   left: "translate-x-8",
   right: "-translate-x-8",
};

export const Reveal: React.FC<{
   children: React.ReactNode;
   direction?: Direction;
   cascade?: boolean;
   triggerOnce?: boolean;
   duration?: number;
   className?: string;
}> = ({
   children,
   direction = "up",
   cascade = false,
   triggerOnce = true,
   duration = 600,
   className,
}) => {
   const ref = useRef<HTMLDivElement>(null);
   const [visible, setVisible] = useState(false);

   useEffect(() => {
      const el = ref.current;
      if (!el) return;

      const observer = new IntersectionObserver(
         ([entry]) => {
            if (entry.isIntersecting) {
               setVisible(true);
               if (triggerOnce) observer.disconnect();
            } else if (!triggerOnce) {
               setVisible(false);
            }
         },
         { threshold: 0.1 },
      );

      observer.observe(el);
      return () => observer.disconnect();
   }, [triggerOnce]);

   if (!cascade) {
      return (
         <div
            ref={ref}
            className={cn(
               "transition-all",
               visible
                  ? "translate-x-0 translate-y-0 opacity-100"
                  : `opacity-0 ${directionStyles[direction]}`,
               className,
            )}
            style={{ transitionDuration: `${duration}ms` }}
         >
            {children}
         </div>
      );
   }

   const items = React.Children.toArray(children);
   return (
      <div ref={ref} className={className}>
         {items.map((child, i) => (
            <div
               key={i}
               className={cn(
                  "transition-all",
                  visible
                     ? "translate-x-0 translate-y-0 opacity-100"
                     : `opacity-0 ${directionStyles[direction]}`,
               )}
               style={{
                  transitionDuration: `${duration}ms`,
                  transitionDelay: visible ? `${i * 100}ms` : "0ms",
               }}
            >
               {child}
            </div>
         ))}
      </div>
   );
};
