import { withTRPC } from "@trpc/next";
import type { AppRouter } from "../server/router";
import type { AppType } from "next/dist/shared/lib/utils";
import superjson from "superjson";
import { SessionProvider } from "next-auth/react";
import PlausibleProvider from "next-plausible";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";

import "../styles/globals.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css";
import BackgroundPattern from "@/components/BackgroundPattern";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import useToggleTheme from "@/hooks/useToggleTheme";
import { useHotkeys } from "@mantine/hooks";

const MyApp: AppType = ({
   Component,
   pageProps: { session, ...pageProps },
}) => {
   return (
      <>
         <DefaultSeo
            defaultTitle="David Ilie"
            titleTemplate="%s | David Ilie"
            openGraph={{
               title: `David Ilie`,
               type: `website`,
               site_name: `David Ilie`,
               images: [
                  {
                     url: `${process.env.NEXT_PUBLIC_APP_URL}/static/me.png`,
                     alt: `Profile Picture`,
                  },
               ],
            }}
            description="A 15 year old aspiring web developer experimenting with programming by publishing my work on the web for others to see and use."
         />
         <PlausibleProvider
            domain="davidilie.com"
            selfHosted
            trackOutboundLinks
            enabled={process.env.NODE_ENV === "production"}
            customDomain={"https://stats.davidilie.com"}
         >
            <ThemeProvider attribute="class">
               <ThemeWrapper>
                  <SessionProvider session={session}>
                     <BackgroundPattern />
                     <div className="flex flex-col min-h-screen pageBackground">
                        <NavBar />
                        <Component {...pageProps} />
                        <Footer />
                     </div>
                  </SessionProvider>
               </ThemeWrapper>
            </ThemeProvider>
         </PlausibleProvider>
      </>
   );
};

const ThemeWrapper: React.FC<{ children: React.ReactNode }> = ({
   children,
}) => {
   const updateTheme = useToggleTheme();
   useHotkeys([["mod+shift+e", updateTheme]]);
   return <>{children}</>;
};

const getBaseUrl = () => {
   if (typeof window !== "undefined") {
      return "";
   }
   if (process.browser) return "";
   if (process.env.NODE_ENV === "production")
      return process.env.NEXT_PUBLIC_APP_URL;

   return `http://localhost:${process.env.PORT ?? 3000}`;
};

export default withTRPC<AppRouter>({
   config({ ctx }) {
      const url = `${getBaseUrl()}/api/trpc`;
      return {
         url,
         transformer: superjson,
         headers: {
            "x-ssr": "1",
         },
      };
   },
   ssr: true,
})(MyApp);
