import type React from "react";

import { cn } from "~/lib/utils";

export function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
   return (
      <div
         aria-hidden
         className={cn("skeleton-shimmer rounded-md bg-muted/60", className)}
         {...props}
      />
   );
}
