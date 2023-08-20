import { cn } from "~/lib/utils";

const ExternalLink: React.FC<{
   children: React.ReactNode;
   url: string;
   className?: string;
}> = ({ children, url, className }) => {
   return (
      <a
         href={url}
         title={url}
         target="_blank"
         rel="noreferrer"
         className={cn(
            `cursor-pointer duration-150 hover:text-blue-600 dark:hover:text-blue-500`,
            className,
         )}
      >
         {children}
      </a>
   );
};

export default ExternalLink;
