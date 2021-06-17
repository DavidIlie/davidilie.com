import PageProvider from "@providers/PageProvider";

import NavBar from "@modules/NavBar";
import Header from "@modules/landing/header/Header";

export default function Home() {
    return (
        <PageProvider title="Home">
            <NavBar />
            <Header />
        </PageProvider>
    );
}
