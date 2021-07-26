export interface LinkType {
    link: string;
    id: string;
    name: string;
    label?: string;
    date: Date;
}

export const links: LinkType[] = [
    {
        id: `nextjs`,
        link: `https://nextjs.org/`,
        name: `Next.JS`,
        label: `Web Development`,
        date: new Date(`2020-07-31T19:20`),
    },
    {
        id: `framer-motion`,
        link: `https://www.framer.com/motion/`,
        name: `Framer Motion`,
        label: `Web Animations`,
        date: new Date(`2021-03-12T19:20`),
    },
    {
        id: `iconscout`,
        link: `https://iconscout.com/`,
        name: `Iconscout`,
        label: `Free icons & Illustrations`,
        date: new Date(`2021-02-24T19:20`),
    },
    {
        id: `next-auth`,
        link: `https://next-auth.js.org/`,
        name: `NextAuth.js`,
        label: `Next.js Authentication`,
        date: new Date(`2021-07-01T19:20`),
    },
    {
        id: `proxmox-ve`,
        link: `https://proxmox.com/en/`,
        name: `Proxmox VE`,
        label: `VM/LXC Hypervisor`,
        date: new Date(`2019-04-25T19:20`),
    },
    {
        id: `tailwind-css`,
        link: `https://tailwindcss.com/`,
        name: `Tailwind CSS`,
        label: `Web Development`,
        date: new Date(`2021-05-25T19:20`),
    },
    {
        id: `rancher`,
        link: `https://rancher.com/`,
        name: `Rancher`,
        label: `Kubernetes Management`,
        date: new Date(`2020-12-28T19:20`),
    },
    {
        id: `traefik`,
        link: `https://traefik.io/`,
        name: `Traefik`,
        label: `Kubernetes Ingress`,
        date: new Date(`2020-12-28T19:20`),
    },
    {
        id: `k3s`,
        link: `https://k3s.io/`,
        name: `k3s`,
        label: `Kubernetes`,
        date: new Date(`2020-12-28T19:20`),
    },
];

export default links;
