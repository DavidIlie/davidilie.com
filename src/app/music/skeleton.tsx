import { Skeleton } from "~/components/ui/skeleton";

const EQ_BARS = ["h-3", "h-5", "h-4"];

const SectionHeaderSkeleton = ({ delay = 0 }: { delay?: number }) => {
   return (
      <div className="mb-4 flex items-baseline gap-3">
         <Skeleton
            className="h-4 w-4"
            style={{ animationDelay: `${delay}ms` }}
         />
         <Skeleton
            className="h-3 w-28"
            style={{ animationDelay: `${delay + 60}ms` }}
         />
         <span aria-hidden className="dotted-leader" />
      </div>
   );
};

const SongRowSkeleton = ({
   withRank,
   delay,
}: {
   withRank?: boolean;
   delay: number;
}) => {
   return (
      <div className="flex w-full items-center gap-3 rounded-xl border border-border/80 bg-card/40 p-2.5 sm:gap-4 sm:p-3">
         {withRank && (
            <Skeleton
               className="h-4 w-4 min-w-[1.25rem] sm:min-w-[1.5rem]"
               style={{ animationDelay: `${delay}ms` }}
            />
         )}
         <Skeleton
            className="h-11 w-11 flex-shrink-0 rounded-lg sm:h-12 sm:w-12"
            style={{ animationDelay: `${delay}ms` }}
         />
         <div className="min-w-0 flex-1 space-y-1.5">
            <Skeleton
               className="h-3.5 w-3/5"
               style={{ animationDelay: `${delay + 40}ms` }}
            />
            <Skeleton
               className="h-3 w-2/5"
               style={{ animationDelay: `${delay + 80}ms` }}
            />
         </div>
      </div>
   );
};

export const MusicPageSkeleton = () => {
   return (
      <div className="space-y-10 sm:space-y-14">
         {/* Hero */}
         <div className="space-y-4 pt-2">
            <div className="flex items-center justify-center gap-2">
               <Skeleton className="h-6 w-24 rounded-full" />
            </div>
            <Skeleton
               className="mx-auto h-12 w-48"
               style={{ animationDelay: "60ms" }}
            />
            <Skeleton
               className="mx-auto h-5 w-72 max-w-full"
               style={{ animationDelay: "120ms" }}
            />
         </div>

         {/* Currently Playing */}
         <div>
            <SectionHeaderSkeleton />
            <div className="relative flex items-center gap-4 overflow-hidden rounded-2xl border border-border/70 bg-card/40 p-5 sm:p-6">
               <div className="absolute top-3 right-4 flex items-end gap-[3px]">
                  {EQ_BARS.map((height, i) => (
                     <span
                        key={height}
                        aria-hidden
                        className={`skeleton-pulse w-1 rounded-full bg-muted ${height}`}
                        style={{ animationDelay: `${i * 50}ms` }}
                     />
                  ))}
               </div>
               <Skeleton className="h-16 w-16 flex-shrink-0 rounded-xl sm:h-20 sm:w-20" />
               <div className="min-w-0 flex-1 space-y-2">
                  <Skeleton
                     className="h-3 w-24"
                     style={{ animationDelay: "50ms" }}
                  />
                  <Skeleton
                     className="h-4.5 w-1/2"
                     style={{ animationDelay: "100ms" }}
                  />
                  <Skeleton
                     className="h-3.5 w-1/3"
                     style={{ animationDelay: "150ms" }}
                  />
               </div>
            </div>
         </div>

         {/* Top Genres + Top Artists */}
         <div className="grid gap-x-8 gap-y-10 md:grid-cols-5 md:items-start">
            <div className="md:col-span-2">
               <SectionHeaderSkeleton delay={40} />
               <div className="flex flex-wrap gap-2">
                  {[16, 24, 14, 20, 16, 24, 18, 14].map((width, i) => (
                     <Skeleton
                        key={i}
                        className="h-8 rounded-full"
                        style={{
                           width: `${width * 4}px`,
                           animationDelay: `${i * 40}ms`,
                        }}
                     />
                  ))}
               </div>
            </div>
            <div className="md:col-span-3">
               <SectionHeaderSkeleton delay={80} />
               <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {Array.from({ length: 3 }, (_, i) => (
                     <Skeleton
                        key={i}
                        className="aspect-square w-full rounded-2xl"
                        style={{ animationDelay: `${i * 40}ms` }}
                     />
                  ))}
               </div>
            </div>
         </div>

         {/* Top Songs + Recently Played */}
         <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
            <div>
               <SectionHeaderSkeleton delay={120} />
               <div className="space-y-2.5">
                  {Array.from({ length: 6 }, (_, i) => (
                     <SongRowSkeleton key={i} withRank delay={i * 40} />
                  ))}
               </div>
            </div>
            <div>
               <SectionHeaderSkeleton delay={160} />
               <div className="space-y-2.5">
                  {Array.from({ length: 6 }, (_, i) => (
                     <SongRowSkeleton key={i} delay={i * 40} />
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};
