import { NextSeo } from "next-seo";

import Header from "@modules/landing/Header";
import About from "@modules/landing/About";

export default function Home() {
    return (
        <>
            <NextSeo title="Home" />
            <Header />
            <About />
            <div className="h-96"></div>
        </>
    );
}
