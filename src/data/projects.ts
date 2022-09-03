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
   language: string;
   url: string;
   tags: string[];
}

export type Project = ProjectNoGitHub | ProjectGitHub;

const projects: Project[] = [
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
