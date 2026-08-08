"use client";

import { catchError, type ErrorInfo } from "next/error";

import { Button } from "~/components/ui/button";

function Fallback(_props: object, { error, retry }: ErrorInfo) {
   const message = error instanceof Error ? error.message : String(error);

   return (
      <div className="flex flex-1 items-center justify-center p-6">
         <div className="w-full max-w-md rounded-lg border border-border bg-muted/50 p-6 text-center">
            <h2 className="text-lg font-semibold text-foreground">
               Something went wrong
            </h2>
            <p className="mt-2 text-muted-foreground">
               This part of the page failed to load.
            </p>
            <p className="mt-3 font-mono text-sm break-words text-muted-foreground">
               {message}
            </p>
            <Button className="mt-4" onClick={() => retry()}>
               Try again
            </Button>
         </div>
      </div>
   );
}

export default catchError(Fallback);
