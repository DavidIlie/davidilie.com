import NextDocument, { Html, Head, Main, NextScript } from "next/document";

export default class Document extends NextDocument {
    render() {
        return (
            <Html>
                <Head />
                <body style={{ background: "#1a202c" }}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
