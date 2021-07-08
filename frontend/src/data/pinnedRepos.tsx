export interface PinnedRepoType {
    image: string;
    name: string;
    id: string;
    language: string;
    description: string;
}

export const pinnedRepos: PinnedRepoType[] = [
    {
        image: "https://camo.githubusercontent.com/09e8c935231f1dd0851cf5ea950f12fc975e8863b1199ec148ba843e426e3802/68747470733a2f2f73332e67696679752e636f6d2f696d616765732f6e6f726d616c2d6170706c69636174696f6e2e676966",
        name: "Cow App",
        id: "cow-app",
        language: "Python",
        description:
            "As part of my preparation for my IGCSE Computer Science Exam, I was asked to produce an application which keeps track of the yeilds a farmer would do. However, I over engineered this basic concept in order to advance my knowledge of Python.",
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
