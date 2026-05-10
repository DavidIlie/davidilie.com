"use client";

import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn } from "~/lib/utils";

const HoverCard = HoverCardPrimitive.Root;
const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
   React.ElementRef<typeof HoverCardPrimitive.Content>,
   React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "end", sideOffset = 8, ...props }, ref) => (
   <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
         ref={ref}
         align={align}
         sideOffset={sideOffset}
         className={cn(
            "z-[60] w-72 rounded-xl border border-border bg-popover p-3 text-popover-foreground shadow-2xl outline-none",
            "animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
            className,
         )}
         {...props}
      />
   </HoverCardPrimitive.Portal>
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardTrigger, HoverCardContent };
