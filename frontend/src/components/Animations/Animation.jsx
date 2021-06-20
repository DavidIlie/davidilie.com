import { chakra } from "@chakra-ui/react";
import React from "react";

export const UpDown = ({ children, type }) => {
    return (
        <chakra.div
            overflow="hidden"
            position="absolute"
            className={
                type === `wide`
                    ? `UpDownWideAnimation`
                    : type === `slow`
                    ? `UpDownSlowAnimation`
                    : `UpDownAnimation`
            }
            top={0}
            left={0}
            right={0}
            bottom={0}
            zIndex={-500}
        >
            {children}
        </chakra.div>
    );
};
