import { cn } from "~/lib/utils";

export const DottedSeparator: React.FC<{ className?: string }> = ({
   className,
}) => (
   <hr
      className={cn(
         "dotted-separator mx-auto my-16 max-w-3xl sm:my-24",
         className,
      )}
   />
);
