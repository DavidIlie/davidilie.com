import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Loader from "@components/Loader";
import { DefaultSeo } from "next-seo";
import { QueryClient, QueryClientProvider } from "react-query";
import AppLayout from "@components/AppLayout";
import PlausibleProvider from "next-plausible";
import ReactModal from "react-modal";
import { Provider as AuthProvider } from "next-auth/client";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/shift-away.css";
import "../styles/global.css";

ReactModal.setAppElement("#__next");

const queryClient = new QueryClient();
function PersonalWebsite({
    Component,
    pageProps,
    router,
}: AppProps): React.ReactElement {
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
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
        <div>
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
                description="A 14 year aspiring web developer experimenting with programming by publishing my work on the web."
            />
            <PlausibleProvider
                domain="davidilie.com"
                selfHosted
                trackOutboundLinks
                enabled={true}
                customDomain={"https://stats.davidilie.com"}
            >
                <ThemeProvider attribute="class">
                    <QueryClientProvider client={queryClient}>
                        <AuthProvider session={pageProps.session}>
                            <Toaster />
                            <AppLayout>
                                {loading ? (
                                    <Loader />
                                ) : (
                                    <Component {...pageProps} />
                                )}
                            </AppLayout>
                        </AuthProvider>
                    </QueryClientProvider>
                </ThemeProvider>
            </PlausibleProvider>
        </div>
    );
}

export default PersonalWebsite;
