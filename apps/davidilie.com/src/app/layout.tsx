import { Inter } from "next/font/google";

import { BackgroundPattern } from "ui";

import { ThemeProvider } from "~/components/ThemeProvider";
import NavBar from "~/components/NavBar";

import "./globals.css";
import "ui/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
   title: "David Ilie",
   description: "Personal Portfolio",
};

export default async function RootLayout({
   children,
   footer,
}: {
   children: React.ReactNode;
   footer: React.ReactNode;
}) {
   return (
      <html lang="en">
         <body className={inter.className}>
            <ThemeProvider>
               <BackgroundPattern>
                  <NavBar />
                  {children}
                  {footer}
               </BackgroundPattern>
            </ThemeProvider>
            <div className="invisible rounded-md" />
         </body>
      </html>
   );
}
