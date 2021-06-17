import PageProvider from "@providers/PageProvider";

import NavBar from "@modules/NavBar";
import Header from "@modules/landing/Header";
import About from "@modules/landing/About";
import Footer from "@modules/Footer";

export default function Home() {
    return (
        <PageProvider title="Home">
            <NavBar />
            <Header />
            <About />
            <Footer />
        </PageProvider>
    );
}
