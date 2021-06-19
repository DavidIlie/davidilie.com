import PageProvider from "@providers/PageProvider";

import Header from "@modules/landing/Header";
import About from "@modules/landing/About";

export default function Home() {
    return (
        <PageProvider title="Home">
            <Header />
            <About />
        </PageProvider>
    );
}
