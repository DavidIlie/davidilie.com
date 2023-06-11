"use client";

import React from "react";
import Tippy, { TippyProps } from "@tippyjs/react";

export const Tooltip: React.FC<
   { children: any; content: string | undefined } & TippyProps
> = ({ children, ...rest }) => {
   return (
      <Tippy {...rest} hideOnClick={true} animation="shift-away">
         {children}
      </Tippy>
   );
};
