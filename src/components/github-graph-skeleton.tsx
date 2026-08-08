import { Skeleton } from "~/components/ui/skeleton";

const WEEKS = 52;
const MOBILE_WEEKS = 26;
const MOBILE_START = WEEKS - MOBILE_WEEKS;

/* Deterministic brand hints — Math.random() would break prerender determinism. */
function cellClass(wi: number, di: number) {
   const i = wi * 7 + di;
   if ((i * 7 + 3) % 11 === 0) return "bg-brand/15";
   return "bg-muted/60";
}

export function GitHubGraphSkeleton() {
   return (
      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-br from-card/80 via-card/50 to-muted/30 p-5 sm:p-7">
         <div
            aria-hidden
            className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand/10 blur-3xl"
         />

         {/* Header */}
         <div className="relative mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
               <div className="mb-1.5 flex items-center gap-2">
                  <Skeleton className="h-3 w-32" />
               </div>
               <div className="flex items-baseline gap-2">
                  <Skeleton
                     className="h-9 w-24 sm:h-10"
                     style={{ animationDelay: "60ms" }}
                  />
                  <Skeleton
                     className="h-4 w-36"
                     style={{ animationDelay: "120ms" }}
                  />
               </div>
               <Skeleton
                  className="mt-1.5 h-3 w-20"
                  style={{ animationDelay: "180ms" }}
               />
            </div>

            {/* Streak stat pills */}
            <div className="flex gap-3">
               <Skeleton
                  className="h-[34px] w-28 rounded-full"
                  style={{ animationDelay: "200ms" }}
               />
               <Skeleton
                  className="h-[34px] w-28 rounded-full"
                  style={{ animationDelay: "260ms" }}
               />
            </div>
         </div>

         {/* Graph */}
         <div className="relative">
            <div className="relative mb-2 ml-[28px] h-3 sm:hidden" />
            <div className="relative mb-2 hidden h-3 sm:ml-8 sm:block" />

            <div className="flex items-stretch gap-1.5">
               {/* Day label gutter */}
               <div className="w-[22px] shrink-0 sm:w-6" />

               {/* Cells */}
               <div className="flex flex-1 gap-[3px] sm:gap-1">
                  {Array.from({ length: WEEKS }).map((_, wi) => (
                     <div
                        key={wi}
                        className={`skeleton-pulse min-w-0 flex-1 flex-col gap-[3px] sm:flex sm:gap-1 ${
                           wi < MOBILE_START ? "hidden" : "flex"
                        }`}
                        style={{ animationDelay: `${wi * 12}ms` }}
                     >
                        {Array.from({ length: 7 }).map((_, di) => (
                           <div
                              key={di}
                              className={`aspect-square w-full rounded-[3px] ${cellClass(wi, di)}`}
                           />
                        ))}
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Footer: busiest-day line + legend */}
         <div className="relative mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex min-h-[1.5rem] items-center">
               <Skeleton className="h-3.5 w-48" />
            </div>
            <div className="flex items-center gap-1.5">
               <Skeleton className="h-3 w-6 rounded-[3px]" />
               {[0, 1, 2, 3, 4].map((l) => (
                  <span key={l} className="h-3 w-3 rounded-[3px] bg-muted/60" />
               ))}
               <Skeleton className="h-3 w-8 rounded-[3px]" />
            </div>
         </div>
      </div>
   );
}
