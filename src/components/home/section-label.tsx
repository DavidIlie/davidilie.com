import React from "react";

import { cn } from "~/lib/utils";

type Props = {
   children: React.ReactNode;
   className?: string;
   number?: string;
};

export const SectionLabel: React.FC<Props> = ({
   children,
   className,
   number,
}) => (
   <div
      className={cn(
         "flex items-baseline gap-3 font-mono text-[0.65rem] tracking-[0.2em] text-muted-foreground uppercase",
         className,
      )}
   >
      {number ? (
         <span className="text-foreground/40 tabular-nums">{number}</span>
      ) : null}
      <span>{children}</span>
      <span aria-hidden className="dotted-leader" />
   </div>
);
