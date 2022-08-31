interface ProjectGitHub {
   repo_id: string;
   name: string;
   description: string;
   image: string;
}

interface ProjectNoGitHub {
   image: string;
   name: string;
   description: string;
   language: string;
}

export type Project = ProjectNoGitHub | ProjectGitHub;

const projects: Project[] = [
   {
      repo_id: "davidilie.com",
      name: "Personal Website",
      description:
         "I've always seen my website as a place where I can experiment with the different options that are available with Web Development. This website currently uses the T3 Stack, and from the enjoyment I've had coding this website, I will use this stack in the future.",
      image: "https://user-images.githubusercontent.com/47594764/187702010-acb78b71-b0f2-4c33-a11b-d5ac4c78d77d.png",
   },
];

export default projects;
