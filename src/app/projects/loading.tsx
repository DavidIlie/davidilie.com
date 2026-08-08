import { Skeleton } from "~/components/ui/skeleton";
import { RepoGridSkeleton } from "./repo-grid-skeleton";

const Loading = () => {
   return (
      <>
         <section className="mx-auto w-full max-w-3xl px-6 pt-24 pb-8 sm:pt-32">
            <Skeleton className="mb-3 h-3 w-40 rounded" />
            <Skeleton
               className="h-10 w-56 rounded-lg sm:h-12"
               style={{ animationDelay: "40ms" }}
            />
            <div className="mt-4 max-w-xl space-y-2">
               <Skeleton
                  className="h-4 w-full rounded"
                  style={{ animationDelay: "80ms" }}
               />
               <Skeleton
                  className="h-4 w-2/3 rounded"
                  style={{ animationDelay: "120ms" }}
               />
            </div>
         </section>

         <div className="mx-auto w-full max-w-[110rem] px-4 sm:px-8 lg:px-16">
            <RepoGridSkeleton />
         </div>
      </>
   );
};

export default Loading;
