export const ExternalLink: React.FC<{
   children: React.ReactNode;
   url: string;
}> = ({ children, url }) => {
   return (
      <a
         href={url}
         title={url}
         target="_blank"
         rel="noreferrer"
         className="cursor-pointer duration-150 hover:text-blue-600 dark:hover:text-blue-500"
      >
         {" "}
         {children}{" "}
      </a>
   );
};
