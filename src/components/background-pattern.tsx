"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "@wrksz/themes/client";

export const BackgroundPattern: React.FC<{
   children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
   return (
      <div className="pageBackground">
         <Patterns />
         <div className="flex min-h-screen flex-col">{children}</div>
      </div>
   );
};

// Palette of HSL colors for decorative SVGs
const palette = [
   [0, 72, 51], // red
   [25, 95, 53], // orange
   [38, 92, 50], // amber
   [48, 96, 53], // yellow
   [84, 81, 44], // lime
   [142, 71, 45], // green
   [160, 84, 39], // emerald
   [173, 80, 40], // teal
   [189, 94, 43], // cyan
   [199, 89, 48], // sky
   [217, 91, 60], // blue
   [239, 84, 67], // indigo
];

const hashPosition = (left: string, top: string) => {
   let hash = 0;
   const str = left + top;
   for (let i = 0; i < str.length; i++) {
      hash = (hash * 31 + str.charCodeAt(i)) | 0;
   }
   return Math.abs(hash);
};

const getColor = (left: string, top: string, isDark: boolean) => {
   const h = hashPosition(left, top);
   const [hue, sat, light] = palette[h % palette.length];
   // Dark mode: lighter, more muted; Light mode: richer
   const l = isDark ? light + 20 : light;
   const s = isDark ? sat * 0.6 : sat;
   return `hsl(${hue} ${s}% ${l}%)`;
};

const Patterns = React.memo(() => {
   const { resolvedTheme } = useTheme();
   const [mounted, setMounted] = useState(false);
   useEffect(() => setMounted(true), []);

   // Don't render until mounted to avoid hydration mismatch from useTheme
   if (!mounted) return null;

   const isDark = resolvedTheme === "dark";

   return (
      <>
         <UpDown type="normal">
            <SVG
               icon="triangle"
               width={48}
               stroke
               left="10%"
               top="20%"
               isDark={isDark}
            />
            <SVG
               icon="hexa"
               width={48}
               stroke
               hiddenMobile
               left="60%"
               top="70%"
               isDark={isDark}
            />
            <SVG icon="box" width={6} left="60%" top="15%" isDark={isDark} />
         </UpDown>
         <UpDown type="wide">
            <SVG
               icon="triangle"
               width={24}
               stroke
               left="65%"
               top="8%"
               isDark={isDark}
            />
            <SVG
               icon="triangle"
               width={12}
               stroke
               hiddenMobile
               left="90%"
               top="50%"
               isDark={isDark}
            />
            <SVG
               icon="triangle"
               width={16}
               stroke
               left="30%"
               top="65%"
               isDark={isDark}
            />
         </UpDown>
         <UpDown type="slow">
            <SVG
               icon="circle"
               width={20}
               hiddenMobile
               left="85%"
               top="25%"
               isDark={isDark}
            />
            <SVG
               icon="circle"
               hiddenMobile
               stroke
               width={24}
               left="5%"
               top="70%"
               isDark={isDark}
            />
            <SVG icon="circle" width={6} left="4%" top="20%" isDark={isDark} />
            <SVG
               icon="circle"
               width={12}
               left="50%"
               top="60%"
               isDark={isDark}
            />
         </UpDown>
      </>
   );
});

Patterns.displayName = "Patterns";

const icons = {
   triangle: {
      shape: (
         <polygon
            strokeWidth="1px"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            points="14.921,2.27 28.667,25.5 1.175,25.5 "
         />
      ),
      viewBox: "0 0 30 30",
   },
   circle: {
      shape: (
         <path d="M15,30A15,15,0,1,1,30,15,15,15,0,0,1,15,30ZM15,6.23A8.77,8.77,0,1,0,23.77,15,8.77,8.77,0,0,0,15,6.23Z" />
      ),
      viewBox: "0 0 30 30",
   },
   box: {
      shape: (
         <path d="M28,2V28H2V2H28m.13-2H1.88A1.88,1.88,0,0,0,0,1.88V28.13A1.88,1.88,0,0,0,1.88,30H28.13A1.87,1.87,0,0,0,30,28.13V1.88A1.88,1.88,0,0,0,28.13,0Z" />
      ),
      viewBox: "0 0 30 30",
   },
   hexa: {
      shape: (
         <polygon
            strokeLinejoin="round"
            strokeMiterlimit="10"
            points="27.5,21.904 15,28.809  2.5,21.904 2.5,8.095 15,1.19 27.5,8.095 "
         />
      ),
      viewBox: "0 0 30 30",
   },
};

type IconType = "triangle" | "circle" | "hexa" | "box";

type SVGProps = {
   stroke?: boolean;
   width: number;
   icon: IconType;
   left: string;
   top: string;
   hiddenMobile?: boolean;
   isDark: boolean;
};

const SVG = ({
   stroke = false,
   width,
   icon,
   left,
   top,
   hiddenMobile = false,
   isDark,
}: SVGProps) => {
   return (
      <svg
         fill={stroke ? "none" : "currentColor"}
         stroke={stroke ? "currentColor" : undefined}
         className={`absolute sm:block ${hiddenMobile ? "hidden" : ""}`}
         style={{
            color: getColor(left, top, isDark),
            width: `${width / 4}rem`,
            filter: "blur(8px) saturate(100%)",
            left,
            top,
            zIndex: -500,
         }}
         viewBox={icons[icon].viewBox}
      >
         {icons[icon].shape}
      </svg>
   );
};

interface UpDownProps {
   children: React.ReactNode;
   type: "normal" | "wide" | "slow";
}

const UpDown = ({ children, type }: UpDownProps) => {
   return (
      <div
         className={`${
            type === "wide"
               ? "UpDownWideAnimation"
               : type === "slow"
                 ? "UpDownSlowAnimation"
                 : "UpDownAnimation"
         } absolute top-0 right-0 bottom-0 left-0 overflow-hidden`}
         style={{ zIndex: -500 }}
      >
         {children}
      </div>
   );
};
