import { Skeleton } from "~/components/ui/skeleton";

const CARDS = 9;
const PILLS = [null, "w-20", "w-16", "w-14", "w-16", "w-12", "w-14"];

export function RepoGridSkeleton() {
   return (
      <div aria-hidden>
         {/* Stats + Search row */}
         <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-4">
               <Skeleton className="h-5 w-20 rounded-full" />
               <Skeleton
                  className="h-5 w-20 rounded-full"
                  style={{ animationDelay: "40ms" }}
               />
            </div>
            <div className="flex items-center gap-2">
               <Skeleton
                  className="h-[34px] w-40 rounded-lg sm:w-48"
                  style={{ animationDelay: "80ms" }}
               />
               <Skeleton
                  className="h-[34px] w-28 rounded-lg sm:w-52"
                  style={{ animationDelay: "120ms" }}
               />
            </div>
         </div>

         {/* Language filter pills */}
         <div className="mb-5 flex flex-wrap gap-1.5">
            {PILLS.map((width, i) => (
               <Skeleton
                  key={i}
                  className={`h-[26px] rounded-full ${width ?? "w-10"}`}
                  style={{ animationDelay: `${i * 40}ms` }}
               />
            ))}
         </div>

         {/* Grid */}
         <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: CARDS }, (_, i) => (
               <div
                  key={i}
                  className="flex flex-col rounded-xl border border-border/60 bg-card/50 p-4"
               >
                  <div className="mb-2 flex items-start justify-between gap-2">
                     <Skeleton
                        className={`h-[19px] rounded ${i % 3 === 0 ? "w-36" : i % 3 === 1 ? "w-28" : "w-44"}`}
                        style={{ animationDelay: `${i * 40}ms` }}
                     />
                     {i % 2 === 0 && (
                        <Skeleton
                           className="h-4 w-8 rounded"
                           style={{ animationDelay: `${i * 40 + 20}ms` }}
                        />
                     )}
                  </div>
                  <div className="mb-3 flex-1 space-y-1.5">
                     <Skeleton
                        className="h-3.5 w-full rounded"
                        style={{ animationDelay: `${i * 40 + 40}ms` }}
                     />
                     <Skeleton
                        className={`h-3.5 rounded ${i % 2 === 0 ? "w-3/4" : "w-2/3"}`}
                        style={{ animationDelay: `${i * 40 + 60}ms` }}
                     />
                  </div>
                  <div className="flex items-center gap-3">
                     <span className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-brand/20" />
                        <Skeleton
                           className="h-3 w-12 rounded"
                           style={{ animationDelay: `${i * 40 + 80}ms` }}
                        />
                     </span>
                     <Skeleton
                        className="ml-auto h-3 w-16 rounded"
                        style={{ animationDelay: `${i * 40 + 100}ms` }}
                     />
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}
