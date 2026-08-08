"use client";

import { useOffline } from "next/offline";

export function OfflineBanner() {
   const isOffline = useOffline();

   if (!isOffline) return null;

   return (
      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full border border-border bg-muted px-4 py-2 text-sm text-muted-foreground shadow-lg">
         You&apos;re offline — retrying when you reconnect.
      </div>
   );
}
