import { useRouter } from "next/router";

import { pages } from "@lib/constants";
import Socials from "./Socials";

export default function Footer() {
    const router = useRouter();
    const currentPage = router.pathname;
    return (
        <footer className="bg-black text-white pt-5 pb-5 w-full">
            <div className="flex justify-center items-center space-x-6 mb-5">
                {pages.map((page, index) => {
                    const current = currentPage === page.url;
                    return (
                        <h1
                            className={
                                current
                                    ? "text-2xl text-gray-500 "
                                    : "text-2xl cursor-pointer hover:text-blue-400 duration-200"
                            }
                            key={index}
                            onClick={() =>
                                !current ? router.push(page.url) : null
                            }
                        >
                            {page.name}
                        </h1>
                    );
                })}
            </div>
            <Socials />
        </footer>
    );
}
