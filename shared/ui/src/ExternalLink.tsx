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
         className="duration-150 cursor-pointer dark:hover:text-blue-500 hover:text-blue-600"
      >
         {" "}
         {children}{" "}
      </a>
   );
};
