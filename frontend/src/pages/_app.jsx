import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { checkAPI } from "@lib/checkAPI";
import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";

function PersonalWebsite({ Component, pageProps }) {
    useEffect(async () => await checkAPI());
    return (
        <>
            <Component {...pageProps} />
            <ToastContainer autoClose={2500} newestOnTop={true} />
        </>
    );
}

export default PersonalWebsite;
