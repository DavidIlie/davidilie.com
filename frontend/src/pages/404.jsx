import { useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function Custom404() {
    const router = useRouter();
    useEffect(() => {
        toast.error("Page not found", { toastId: "404NotFound" });
        router.replace("/");
    });
    return null;
}