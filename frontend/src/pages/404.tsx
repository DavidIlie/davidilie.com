import { useEffect } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Loader from "@components/Loader";

export default function Custom404(): JSX.Element {
    const router = useRouter();
    useEffect(() => {
        toast.error("Page not found");
        router.replace("/");
    });
    return (
        <div className="h-screen">
            <Loader />
        </div>
    );
}
