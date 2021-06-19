import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { DefaultSeo } from "next-seo";
import { checkAPI } from "@lib/checkAPI";

import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css";

function PersonalWebsite({ Component, pageProps }) {
    useEffect(async () => await checkAPI());
    return (
        <>
            <DefaultSeo
                defaultTitle="David Ilie"
                openGraph={{
                    title: `David Ilie`,
                    type: `website`,
                    site_name: `David Ilie`,
                    images: [
                        {
                            url: `https://www.michael-hall.me/images/png/me.png`,
                            alt: `Profile Picture`,
                        },
                    ],
                }}
                description="A 14 year aspiring web developer experimenting by publishing my work on the web."
            />
            <Component {...pageProps} />
            <ToastContainer autoClose={2500} newestOnTop={true} />
        </>
    );
}

export default PersonalWebsite;
