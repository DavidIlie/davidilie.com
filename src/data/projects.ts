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
      repo_id: "plexo",
      name: "Plexo",
      description:
         "A personal media dashboard for your Plex library. Tracks movies, TV shows, watch history, and viewing patterns in one self-hosted interface — built with Next.js, tRPC, shadcn/ui, and Recharts.",
      image: "/static/plexo.png",
      url: "https://plexo.davidhome.ro",
      tags: ["Next.js", "tRPC", "Self-Hosted", "Plex"],
   },
   {
      name: "MBRetrofit Tools",
      description:
         "A comprehensive suite of tools for Mercedes-Benz car retrofitting and diagnostics. Features vehicle lookup, coding browser, DLM flash tools, and DoIP communication — built as a monorepo with Next.js, tRPC, and Electron.",
      image: "/static/mbretrofit-tools.png",
      url: "https://mbretrofit.tools",
      tags: ["T3 Stack", "Electron", "Monorepo", "Mercedes-Benz"],
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
      repo_id: "reddam-pokemon-go",
      name: "Reddam House Go!",
      description:
         "The Head of Middle School asked me to develop a mobile game for Year 5 students at Reddam House Berkshire, introducing them to the school's middle/senior section. Using a simplified schematic, I developed an app where students find randomly selected rooms within a time limit. Fastest completion time or discovering all rooms won the game.",
      image: "https://github.com/DavidIlie/davidilie.com/assets/47594764/2b268847-3f94-4792-be90-a39335feb0db",
      tags: ["React Native", "Web Sockets", "Game"],
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
