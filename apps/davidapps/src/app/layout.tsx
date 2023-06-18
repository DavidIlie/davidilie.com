import { Inter } from "next/font/google";
import Link from "next/link";

import { BackgroundPattern, Footer } from "@david/ui";

import { ThemeProvider } from "~/components/ThemeProvider";
import ThemeToggle from "~/components/ThemeToggle";

import "./globals.css";
import "@david/ui/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
   title: "David Ilie Apps Platform",
   description: "David Ilie Apps Platform",
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
               <ThemeToggle />
               <BackgroundPattern>
                  {children}
                  <Footer>
                     <div className="mb-2 flex items-center gap-2 sm:mb-0">
                        <Link
                           href="/privacy-policy.html"
                           className="duration-150 hover:text-blue-500 "
                        >
                           Privacy Policy
                        </Link>
                        ·
                        <Link
                           href="/terms-of-service.html"
                           className="duration-150 hover:text-blue-500 "
                        >
                           Terms of Service
                        </Link>
                     </div>
                  </Footer>
               </BackgroundPattern>
            </ThemeProvider>
         </body>
      </html>
   );
}