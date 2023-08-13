import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { BackgroundPattern } from "@david/ui";

import Footer, { FooterLoader } from "~/components/Footer";
import NavBar from "~/components/NavBar";
import { Providers } from "~/components/Providers";

import "./globals.css";
import "@david/ui/styles.css";

const inter = Inter({ subsets: ["latin"] });

const SEO_DESCRIPTION =
   "A 17 year old aspiring web developer experimenting with programming by publishing my work on the web for others to see and use.";

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
   colorScheme: "dark light",
   formatDetection: {
      email: false,
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
            <Providers>
               <BackgroundPattern>
                  <NavBar />
                  {children}
                  <Suspense fallback={<FooterLoader />}>
                     {/*
                  // @ts-expect-error Server Component*/}
                     <Footer />
                  </Suspense>
               </BackgroundPattern>
            </Providers>
         </body>
      </html>
   );
}
