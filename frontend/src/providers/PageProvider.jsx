import Head from "next/head";

import NavBar from "@components/NavBar";
import Footer from "@components/Footer";

export default function PageProvider(props) {
    return (
        <div className="h-screen">
            <Head>
                <title>
                    David Ilie {props.title ? `- ${props.title}` : ""}
                </title>
            </Head>
            <NavBar />
            {props.children}
            <Footer />
        </div>
    );
}
