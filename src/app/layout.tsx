import "./globals.css";

import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@wrksz/themes/next";
import PlausibleProvider from "next-plausible";

import AppErrorBoundary from "~/components/app-error-boundary";
import { BackgroundPattern } from "~/components/background-pattern";
import { ConditionalCTA } from "~/components/conditional-cta";
import Footer from "~/components/footer";
import { FooterServer } from "~/components/footer-server";
import NavBar from "~/components/navbar";
import { OfflineBanner } from "~/components/offline-banner";
import { TRPCReactProvider } from "~/trpc/react";

const bricolage = Bricolage_Grotesque({
   subsets: ["latin"],
   variable: "--font-bricolage",
   display: "swap",
   weight: ["400", "500", "600", "700", "800"],
});

const figtree = Figtree({
   subsets: ["latin"],
   variable: "--font-figtree",
   display: "swap",
   weight: ["400", "500", "600", "700"],
});

const SEO_DESCRIPTION =
   "An 18 year old aspiring web developer experimenting with programming by publishing my work on the web for others to see and use.";

export const viewport: Viewport = {
   colorScheme: "dark light",
};

export const metadata: Metadata = {
   metadataBase: new URL("https://davidilie.com"),
   alternates: {
      canonical: "https://davidilie.com",
   },
   title: {
      template: "%s | David Ilie",
      default: "David Ilie",
   },
   authors: [{ name: "David Ilie", url: "https://github.com/davidilie" }],
   creator: "David Ilie",
   publisher: "David Ilie",
   description: SEO_DESCRIPTION,
   formatDetection: {
      email: true,
      address: false,
      telephone: false,
   },
   keywords: ["Personal Website", "CV", "Portoflio", "Next.js", "tRPC"],
   openGraph: {
      url: "https://davidilie.com",
      title: "David Ilie",
      type: "website",
      siteName: "David Ilie",
      description: SEO_DESCRIPTION,
      locale: "en-UK",
      images: [
         {
            url: "/static/me.jpeg",
            alt: "Profile Picture",
         },
      ],
   },
   robots: {
      index: true,
      follow: true,
      googleBot: {
         index: true,
         follow: true,
         "max-video-preview": -1,
         "max-image-preview": "large",
         "max-snippet": -1,
      },
   },
   twitter: {
      title: "David Ilie",
      card: "summary_large_image",
   },
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html
         lang="en"
         suppressHydrationWarning
         className={`${bricolage.variable} ${figtree.variable}`}
      >
         <head>
            <PlausibleProvider
               domain="davidilie.com"
               trackOutboundLinks
               selfHosted
               scriptProps={{
                  src: "/js/script.js",
                  //@ts-expect-error stupid
                  "data-api": "https://e.dave.tips/api/event",
               }}
            />
         </head>
         <body className="text-foreground">
            <ThemeProvider
               attribute="class"
               defaultTheme="system"
               enableSystem
               storage="localStorage"
            >
               <TRPCReactProvider>
                  <BackgroundPattern>
                     <NavBar />
                     <main className="flex flex-1 flex-col">
                        <AppErrorBoundary>{children}</AppErrorBoundary>
                     </main>
                     <ConditionalCTA />
                     <Suspense fallback={<Footer />}>
                        <FooterServer />
                     </Suspense>
                  </BackgroundPattern>
                  <OfflineBanner />
                  {process.env.NODE_ENV === "development" && (
                     <ReactQueryDevtools initialIsOpen={false} />
                  )}
               </TRPCReactProvider>
            </ThemeProvider>
         </body>
      </html>
   );
}
