import { cn } from "~/lib/utils";

export const DottedSeparator: React.FC<{ className?: string }> = ({
   className,
}) => <hr className={cn("dotted-separator my-12 sm:my-16", className)} />;
