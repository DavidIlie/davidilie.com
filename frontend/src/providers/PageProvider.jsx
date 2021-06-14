import Head from "next/head";

export default function PageProvider(props) {
    return (
        <div className="h-screen">
            <Head>
                <title>David Ilie {props.title ? `- ${props.title}` : ""}</title>
            </Head>
            {props.children}
        </div>
    )
}