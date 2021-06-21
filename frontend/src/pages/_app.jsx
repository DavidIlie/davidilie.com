import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Loader from "@components/Loader";
import { DefaultSeo } from "next-seo";
import { QueryClient, QueryClientProvider } from "react-query";
import { checkAPI } from "@lib/checkAPI";
import AppLayout from "@components/AppLayout";

import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css";
import "../styles/global.css";

const queryClient = new QueryClient();
function PersonalWebsite({ Component, pageProps, router }) {
    const [loading, setLoading] = useState(false);
    useEffect(async () => {
        await checkAPI();
        document.documentElement.lang = `en-US`;
        const start = () => {
            setLoading(true);
        };
        const end = () => {
            setLoading(false);
        };
        router.events.on(`routeChangeStart`, start);
        router.events.on(`routeChangeComplete`, end);
        router.events.on(`routeChangeError`, end);
        return () => {
            router.events.off(`routeChangeStart`, start);
            router.events.off(`routeChangeComplete`, end);
            router.events.off(`routeChangeError`, end);
        };
    });
    return (
        <>
            <DefaultSeo
                defaultTitle="David Ilie"
                titleTemplate="%s | David Ilie"
                openGraph={{
                    title: `David Ilie`,
                    type: `website`,
                    site_name: `David Ilie`,
                    images: [
                        {
                            url: `https://www.davidilie.com/images/png/me.png`,
                            alt: `Profile Picture`,
                        },
                    ],
                }}
                description="A 14 year aspiring web developer experimenting by publishing my work on the web."
            />
            <QueryClientProvider client={queryClient}>
                <AppLayout>
                    {loading ? <Loader /> : <Component {...pageProps} />}
                </AppLayout>
            </QueryClientProvider>
            <ToastContainer autoClose={2500} newestOnTop={true} />
        </>
    );
}

export default PersonalWebsite;
