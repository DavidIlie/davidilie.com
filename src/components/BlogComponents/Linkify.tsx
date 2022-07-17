import React from "react";

//@ts-ignore
import BaseLinkify from "react-linkify";

const Linkify: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   return (
      <BaseLinkify
         componentDecorator={(
            decoratedHref: any,
            decoratedText: any,
            key: any
         ) => (
            <a
               href={decoratedHref}
               key={key}
               className="font-medium text-blue-500 duration-150 hover:text-blue-600"
            >
               {decoratedText}
            </a>
         )}
      >
         {children}
      </BaseLinkify>
   );
};

export default Linkify;
