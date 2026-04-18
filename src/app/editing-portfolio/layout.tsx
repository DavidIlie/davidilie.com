import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "Video Editing Portfolio",
   description:
      "I edit for Chief Pat (2.4M subs), built Kuhrawn's channel from zero, and cut my own YouTube videos. 7 years in Premiere and After Effects. Send the footage.",
   keywords: [
      "video editing",
      "YouTube editor",
      "professional video editing",
      "Adobe Premiere Pro",
      "After Effects",
      "gaming video editor",
      "tech video editing",
      "video essay editing",
      "content creator editor",
      "European video editor",
      "fast video editing",
      "Chief Pat editor",
      "David Ilie editor",
   ],
   openGraph: {
      url: "https://davidilie.com/editing-portfolio",
      title: "Video editing for people who care about retention | David Ilie",
      description:
         "I edit for Chief Pat (2.4M subs). Built Kuhrawn's channel from zero. Cut my own videos too. 7 years in. Send the footage.",
      type: "website",
      siteName: "David Ilie",
      locale: "en-US",
      images: [
         {
            url: "/static/editing-portfolio-og.png",
            width: 1200,
            height: 630,
            alt: "David Ilie Video Editing Portfolio - Professional YouTube Editor",
            type: "image/png",
         },
      ],
   },
   twitter: {
      card: "summary_large_image",
      title: "Video editing for people who care about retention | David Ilie",
      description:
         "I edit for Chief Pat (2.4M subs). Built Kuhrawn's from zero. 7 years in Premiere + AE. Europe, fast replies.",
      site: "@MrDavidIlie",
      creator: "@MrDavidIlie",
      images: ["/static/editing-portfolio-og.png"],
   },
};

export default function EditingPortfolioLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return <>{children}</>;
}
