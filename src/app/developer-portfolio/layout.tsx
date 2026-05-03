import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "Developer Portfolio",
   description:
      "Your website, live in 7 days. Agencies want 3 months. I'm one person who ships: email Monday, live Sunday, code in your GitHub.",
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
      title: "Your website, live in 7 days | David Ilie",
      description:
         "Agencies want 3 months. I'm one person who ships: email Monday, live Sunday, repo in your GitHub on day seven.",
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
      title: "Your website, live in 7 days | David Ilie",
      description:
         "Agencies want 3 months. I ship in a week. Repo in your GitHub on day seven.",
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
