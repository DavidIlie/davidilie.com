import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "Developer Portfolio",
   description:
      "Launch your website in 1 week. Professional web development with modern technologies. From simple websites to complex web applications - fast execution, zero compromises on quality.",
   keywords: [
      "web developer",
      "Next.js developer",
      "React developer",
      "TypeScript developer",
      "full-stack developer",
      "website development",
      "web application development",
      "modern web development",
      "fast web development",
      "professional web developer",
      "David Ilie developer",
   ],
   openGraph: {
      url: "https://davidilie.com/developer-portfolio",
      title: "Professional Web Development Services | David Ilie",
      description:
         "Launch your website in 1 week. Modern web development with React, Next.js, and TypeScript. Fast execution, professional quality, full source code ownership.",
      type: "website",
      siteName: "David Ilie",
      locale: "en-US",
      images: [
         {
            url: "/static/developer-portfolio-og.png",
            width: 1200,
            height: 630,
            alt: "David Ilie Developer Portfolio - Professional Web Developer",
            type: "image/png",
         },
      ],
   },
   twitter: {
      card: "summary_large_image",
      title: "Professional Web Development Services | David Ilie",
      description:
         "Launch your website in 1 week. Modern web development with React, Next.js, and TypeScript.",
      site: "@MrDavidIlie",
      creator: "@MrDavidIlie",
      images: ["/static/developer-portfolio-og.png"],
   },
};

export default function DeveloperPortfolioLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return <>{children}</>;
}
