"use client";

import React from "react";
import { useTheme } from "next-themes";

import { colors } from "~/lib/colors";

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

const Patterns = React.memo(() => (
   <>
      <UpDown type="normal">
         <SVG icon="triangle" width={48} stroke left="10%" top="20%" />
         <SVG icon="hexa" width={48} stroke left="60%" top="70%" />
         <SVG icon="box" width={6} left="60%" top="15%" />
      </UpDown>
      <UpDown type="wide">
         <SVG icon="triangle" width={24} stroke left="65%" top="8%" />
         <SVG icon="triangle" width={12} stroke left="90%" top="50%" />
         <SVG icon="triangle" width={16} stroke left="30%" top="65%" />
      </UpDown>
      <UpDown type="slow">
         <SVG icon="circle" width={20} hiddenMobile left="85%" top="25%" />
         <SVG
            icon="circle"
            hiddenMobile
            stroke
            width={24}
            left="5%"
            top="70%"
         />
         <SVG icon="circle" width={6} left="4%" top="20%" />
         <SVG icon="circle" width={12} left="50%" top="60%" />
      </UpDown>
   </>
));

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
      viewBox: `0 0 30 30`,
   },
   circle: {
      shape: (
         <path d="M15,30A15,15,0,1,1,30,15,15,15,0,0,1,15,30ZM15,6.23A8.77,8.77,0,1,0,23.77,15,8.77,8.77,0,0,0,15,6.23Z" />
      ),
      viewBox: `0 0 30 30`,
   },

   box: {
      shape: (
         <path d="M28,2V28H2V2H28m.13-2H1.88A1.88,1.88,0,0,0,0,1.88V28.13A1.88,1.88,0,0,0,1.88,30H28.13A1.87,1.87,0,0,0,30,28.13V1.88A1.88,1.88,0,0,0,28.13,0Z" />
      ),
      viewBox: `0 0 30 30`,
   },
   hexa: {
      shape: (
         <polygon
            strokeLinejoin="round"
            strokeMiterlimit="10"
            points="27.5,21.904 15,28.809  2.5,21.904 2.5,8.095 15,1.19 27.5,8.095 "
         />
      ),
      viewBox: `0 0 30 30`,
   },
};

type IconType = "triangle" | "circle" | "hexa" | "box";

type SVGProps = {
   stroke?: boolean;
   color?: string | number | any;
   width: number;
   icon: IconType;
   zIndex?: number;
   left: string;
   top: string;
   hiddenMobile?: boolean;
};

const GetColor = () => {
   const { resolvedTheme } = useTheme();
   if (resolvedTheme === "dark") {
      return [`100`, `200`, `300`, `400`, `500`];
   } else {
      return [`500`, `600`, `700`, `800`, `900`];
   }
};

const SVG = ({
   stroke = false,
   color = `${colors[Math.floor(Math.random() * 12)]}-${
      GetColor()[Math.floor(Math.random() * 4)]
   }`,
   zIndex = -500,
   width,
   icon,
   left,
   top,
   hiddenMobile = false,
}: SVGProps): JSX.Element => {
   return (
      <svg
         fill={stroke ? `none` : `currentColor`}
         className={`absolute fill-current text-${color} sm:block ${
            hiddenMobile && "hidden"
         }`}
         style={{
            width: `${width / 2 / 2}rem`,
            filter: "blur(8px) saturate(100%)",
            left: left,
            top: top,
            zIndex,
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

const UpDown = ({ children, type }: UpDownProps): JSX.Element => {
   return (
      <div
         className={`${
            type === `wide`
               ? `UpDownWideAnimation`
               : type === `slow`
               ? `UpDownSlowAnimation`
               : `UpDownAnimation`
         } absolute bottom-0 left-0 right-0 top-0 overflow-hidden`}
         style={{ zIndex: -500 }}
      >
         {children}
      </div>
   );
};
