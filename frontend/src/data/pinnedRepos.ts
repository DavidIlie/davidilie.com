export interface PinnedRepoType {
    image: string;
    name: string;
    id: string;
    language: string;
    description: string;
}

export const pinnedRepos: PinnedRepoType[] = [
    {
        image: "https://user-images.githubusercontent.com/47594764/133920730-573c74c2-ad29-416e-9e88-fad7d7abddc3.gif",
        name: "ShareX Upload Server",
        id: "sharex-upload-server",
        language: "Typescript",
        description:
            "I've always wanted a good way to store screenshots/files/etc on my server and not on my computer. When I discovered ShareX (and it's custom uploader feature), I knew I wanted to create my own advanced uploader with support for all upload types, and a nice frontend to go with it.",
    },
    {
        image: "https://user-images.githubusercontent.com/47594764/122973725-d6a83a80-d391-11eb-8e23-ba35a1c1f234.png",
        name: "Personal Website",
        id: "davidilie.com",
        language: "Typescript",
        description:
            "This website has been my testing grounds since it has been created. It allowed me to experiment with different technologies/different techniques and so on. The website uses NextJS along with TailwindCSS, and I am having a blast working on it.",
    },
    {
        image: "https://user-images.githubusercontent.com/47594764/124882354-94f1d380-dfd0-11eb-9783-8d709b5e5d62.gif",
        name: "Personal Dashboard",
        id: "personal-dashboard",
        language: "Typescript",
        description:
            "I've always had some sort of dashboard setup which allows me to keep track of all my services that are running in my homelab. However, all of the services that I used had their own quirks so I decided to create my own Dashboard using NextJS, TailwindCSS and Typescript.",
    },
];
