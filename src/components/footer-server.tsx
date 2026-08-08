import { connection } from "next/server";

import { HydrateClient, prefetch, trpc } from "~/trpc/server";
import Footer from "./footer";

/**
 * Streams the Spotify query into the layout shell so the client Footer never
 * fires an HTTP round-trip after hydration. Rendered inside a Suspense whose
 * fallback is the same <Footer /> — the brief double render is invisible
 * because both versions produce identical DOM (Footer shows its BuiltInfo
 * fallback until the query resolves), and the browser query cache is a
 * singleton so hydration merges cleanly.
 */
export async function FooterServer() {
   await connection();
   prefetch(trpc.spotify.playingStateAndSong.queryOptions());
   return (
      <HydrateClient>
         <Footer />
      </HydrateClient>
   );
}
