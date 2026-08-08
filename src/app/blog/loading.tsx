import { Skeleton } from "~/components/ui/skeleton";

const cardShell =
   "overflow-hidden rounded-2xl border border-border/70 bg-card/60";

const CardSkeleton = ({ delay }: { delay: number }) => (
   <div className={cardShell} style={{ animationDelay: `${delay}ms` }}>
      <Skeleton
         className="aspect-[16/10] w-full rounded-none"
         style={{ animationDelay: `${delay}ms` }}
      />
      <div className="border-t border-border/70 px-4 py-4">
         <Skeleton
            className="h-5 w-3/4"
            style={{ animationDelay: `${delay + 60}ms` }}
         />
         <Skeleton
            className="mt-2.5 h-4 w-full"
            style={{ animationDelay: `${delay + 120}ms` }}
         />
         <Skeleton
            className="mt-1.5 h-4 w-5/6"
            style={{ animationDelay: `${delay + 180}ms` }}
         />
         <div className="mt-3 flex items-center justify-between gap-2">
            <Skeleton
               className="h-5 w-16 rounded-full"
               style={{ animationDelay: `${delay + 240}ms` }}
            />
            <Skeleton
               className="h-3 w-24"
               style={{ animationDelay: `${delay + 240}ms` }}
            />
         </div>
      </div>
   </div>
);

const Loading = () => (
   <div className="flex flex-grow items-center justify-center">
      <div className="container mx-auto mt-24 mb-12 max-w-4xl px-6 sm:mt-32">
         <div className="flex flex-col items-center gap-3 text-center">
            <Skeleton className="h-4 w-44" />
            <Skeleton
               className="h-12 w-72 sm:h-[3.75rem] sm:w-96"
               style={{ animationDelay: "60ms" }}
            />
            <Skeleton
               className="mt-1 h-5 w-full max-w-2xl sm:h-6"
               style={{ animationDelay: "120ms" }}
            />
         </div>

         {/* Featured card: image panel + text column, desktop only */}
         <div
            className={`${cardShell} mx-3 mt-8 mb-3 hidden sm:flex`}
            style={{ animationDelay: "180ms" }}
         >
            <Skeleton
               className="h-72 w-[44%] flex-shrink-0 rounded-none"
               style={{ animationDelay: "180ms" }}
            />
            <div className="flex flex-1 flex-col px-6 py-5">
               <Skeleton
                  className="h-5 w-20 rounded-full"
                  style={{ animationDelay: "240ms" }}
               />
               <Skeleton
                  className="mt-3 h-7 w-4/5"
                  style={{ animationDelay: "300ms" }}
               />
               <Skeleton
                  className="mt-3 h-4 w-full"
                  style={{ animationDelay: "360ms" }}
               />
               <Skeleton
                  className="mt-1.5 h-4 w-2/3"
                  style={{ animationDelay: "420ms" }}
               />
               <Skeleton
                  className="mt-auto h-3 w-32"
                  style={{ animationDelay: "480ms" }}
               />
            </div>
         </div>

         <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:px-2.5">
            {[0, 1, 2, 3].map((i) => (
               <CardSkeleton key={i} delay={240 + i * 60} />
            ))}
         </div>
      </div>
   </div>
);

export default Loading;
