import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { env } from "~/env.mjs";

import { BackgroundPattern } from "@david/ui";

import Footer, { FooterLoader } from "~/components/Footer";
import NavBar from "~/components/NavBar";
import { ThemeProvider } from "~/components/ThemeProvider";

import "./globals.css";
import "@david/ui/styles.css";

const inter = Inter({ subsets: ["latin"] });

const SEO_DESCRIPTION = "Personal Portfolio";

export const metadata: Metadata = {
   metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
   alternates: {
      canonical: env.NEXT_PUBLIC_APP_URL,
   },
   title: {
      template: "%s | David Ilie",
      default: "David Ilie",
   },
   authors: [{ name: "David Ilie", url: "https://github.com/davidilie" }],
   creator: "David Ilie",
   publisher: "David Ilie",
   description: SEO_DESCRIPTION,
   colorScheme: "dark light",
   formatDetection: {
      email: false,
      address: false,
      telephone: false,
   },
   keywords: ["Personal Website", "CV", "Portoflio", "Next.js", "tRPC"],
   openGraph: {
      url: env.NEXT_PUBLIC_APP_URL,
      title: "David Ilie",
      type: "website",
      siteName: "David Ilie",
      description: SEO_DESCRIPTION,
      images: [
         {
            url: "/static/me.png",
            alt: "Profile Picture",
         },
      ],
   },
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en">
         <body className={inter.className}>
            <ThemeProvider>
               <BackgroundPattern>
                  <NavBar />
                  {children}
                  <Suspense fallback={<FooterLoader />}>
                     {/*
                  // @ts-expect-error Server Component*/}
                     <Footer />
                  </Suspense>
               </BackgroundPattern>
            </ThemeProvider>
         </body>
      </html>
   );
}
