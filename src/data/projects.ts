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
   url?: string;
   tags: string[];
}

export type Project = ProjectNoGitHub | ProjectGitHub;

const projects: Project[] = [
   {
      name: "MBRetrofit Tools",
      description:
         "The leading and most modern Mercedes-Benz platform, with map activation codes, vehicle coding, and dealer-level car lookups. I've spent the past couple of years being trained and mentored by some of the most senior people in this world, and that work has gotten my platform to a point where it's the only one that can pull off certain things on these cars, all of it through reverse engineering.",
      image: "/static/mbretrofit-tools.png",
      url: "https://mbretrofit.it",
      tags: ["Next.js", "tRPC", "Turborepo", "Mercedes"],
   },
   {
      name: "ZeroCut",
      description:
         "A donation platform for streamers: landing page, Stripe checkout, auth, creator dashboard, and live donation flow. Shipped end-to-end in seven days from empty repo to live URL.",
      image: "/static/zerocut.png",
      url: "https://www.zerocut.gg",
      tags: ["Next.js", "Stripe", "ClickHouse", "Shipped in 7d"],
   },
   {
      repo_id: "plexo",
      name: "Plexo",
      description:
         "A personal media dashboard for your Plex library. Tracks movies, TV shows, watch history, and viewing patterns in one self-hosted interface.",
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
   },
];

export default projects;
