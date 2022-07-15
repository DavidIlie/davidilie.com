import React from "react";
import Tippy, { TippyProps } from "@tippyjs/react";

const Tooltip: React.FC<{ children: any } & TippyProps> = ({
   children,
   ...rest
}) => {
   return (
      <Tippy {...rest} hideOnClick={true} animation="shift-away">
         {children}
      </Tippy>
   );
};

export default Tooltip;
