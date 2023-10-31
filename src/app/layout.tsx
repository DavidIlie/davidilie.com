import "./globals.css";

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { BackgroundPattern } from "~/components/background-pattern";
import Footer from "~/components/footer";
import NavBar from "~/components/navbar";
import Providers from "./providers";

export const dynamic = "force-dynamic";

const graphik = localFont({
   src: [
      {
         path: "../../public/fonts/Graphik-Regular.ttf",
         weight: "400",
         style: "normal",
      },
      {
         path: "../../public/fonts/Graphik-Medium.ttf",
         weight: "600",
         style: "bold",
      },
   ],
   variable: "--font-graphik",
   display: "swap",
});

const SEO_DESCRIPTION =
   "A 17 year old aspiring web developer experimenting with programming by publishing my work on the web for others to see and use.";

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
      locale: "en-UK",
      images: [
         {
            url: "/static/me.png",
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
      <html lang="en" suppressHydrationWarning>
         <body className={`text-black dark:text-white ${graphik.variable}`}>
            <Providers>
               <BackgroundPattern>
                  <NavBar />
                  {children}
                  <Footer />
               </BackgroundPattern>
            </Providers>
         </body>
      </html>
   );
}
