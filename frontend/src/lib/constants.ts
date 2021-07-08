interface PageProps {
    name: string;
    url: string;
}

export const pages: PageProps[] = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: "Projects", url: "/projects" },
    { name: "Music", url: "/music" },
];
