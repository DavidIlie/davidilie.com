import Head from "next/head";

import NavBar from "@components/NavBar";
import Footer from "@components/Footer";

export default function PageProvider(props) {
    return (
        <div className="bg-gray-800">
            <Head>
                <title>{props.title ? props.title : ""} | David Ilie</title>
            </Head>
            <NavBar />
            {props.children}
            <Footer />
        </div>
    );
}
