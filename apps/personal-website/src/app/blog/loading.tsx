import { LoadingSpinner } from "@david/ui";

const Loading = () => {
   return (
      <div className="mt-32 mb-12 flex flex-grow justify-center sm:px-6 lg:px-8">
         <div className="px-4 text-center sm:px-0">
            <LoadingSpinner />
         </div>
      </div>
   );
};

export default Loading;
