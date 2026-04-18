export interface ProjectGitHub {
   repo_id: string;
   name: string;
   description: string;
   image: string;
   url?: string;
   tags: string[];
}

export interface ProjectNoGitHub {
   image: string;
   name: string;
   description: string;
   url: string;
   tags: string[];
}

export type Project = ProjectNoGitHub | ProjectGitHub;

const projects: Project[] = [
   {
      name: "ZeroCut",
      description:
         "A donation platform for streamers — landing page, Stripe checkout, auth, creator dashboard, and live donation flow. Shipped end-to-end in seven days from empty repo to live URL. Built with Next.js, Prisma, and ClickHouse for event analytics.",
      image: "/static/zerocut.png",
      url: "https://www.zerocut.gg",
      tags: ["Next.js", "Stripe", "ClickHouse", "Shipped in 7d"],
   },
   {
      repo_id: "plexo",
      name: "Plexo",
      description:
         "A personal media dashboard for your Plex library. Tracks movies, TV shows, watch history, and viewing patterns in one self-hosted interface — built with Next.js, tRPC, shadcn/ui, and Recharts.",
      image: "/static/plexo.png",
      url: "https://plexo.davidhome.ro",
      tags: ["Next.js", "tRPC", "Self-Hosted", "Plex"],
   },
   {
      name: "KCA News",
      description:
         "This Content Management Website empowers students to share thoughts and enhance language skills via articles at King's College Alicante. Created on the request of the English Department's head, it maintains a consistent corporate style. With 110+ registered accounts and 120+ articles, the platform fosters a thriving English-focused community, bringing joy to both teachers and students.",
      image: "/static/kca-news.gif",
      tags: ["T3 Stack", "Markdown", "Vercel"],
      url: "https://kcanews.org",
   },
   {
      repo_id: "davidilie.com",
      name: "Personal Website",
      description:
         "I've always seen my website as a place where I can experiment with the different options that are available with Web Development. This website currently uses the T3 Stack, and from the enjoyment I've had coding this website, I will use this stack in the future.",
      image: "https://user-images.githubusercontent.com/47594764/188265778-074aec44-982d-4e7f-b3c5-207392779f2c.png",
      tags: ["T3 Stack", "MDX", "Railway"],
   },
];

export default projects;
