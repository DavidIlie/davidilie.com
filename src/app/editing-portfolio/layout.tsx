import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "Video Editing Portfolio",
   description:
      "Professional video editing services with 7+ years of experience. I've worked with creators who have millions of subscribers, delivering fast turnaround times and professional quality. Specializing in YouTube content, gaming videos, tech reviews, and video essays.",
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
      title: "Professional Video Editing Services | David Ilie",
      description:
         "7+ years of video editing experience. Trusted by creators with millions of subscribers. Fast delivery, unlimited revisions, and professional quality guaranteed.",
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
      title: "Professional Video Editing Services | David Ilie",
      description:
         "7+ years editing for creators with millions of subscribers. Fast delivery, professional quality, Europe-based editor.",
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
