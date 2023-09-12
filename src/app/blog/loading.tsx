import { LoadingSpinner } from "~/components/loading-spinner";

const Loading = () => {
   return (
      <div className="mb-12 mt-32 flex flex-grow justify-center sm:px-6 lg:px-8">
         <div className="px-4 text-center sm:px-0">
            <LoadingSpinner />
         </div>
      </div>
   );
};

export default Loading;
