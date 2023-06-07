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
         className="duration-150 cursor-pointer hover:text-blue-500"
      >
         {" "}
         {children}{" "}
      </a>
   );
};
