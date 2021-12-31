import { pages } from "@data/pages";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";

import useScrollPosition from "@hooks/useScrollPosition";

import AnimatedTitle from "./AnimatedTitle";
import UserDropdown from "./UserDropdown";

export const NavBar = () => {
    const router = useRouter();

    const { pathname } = useRouter();
    const [width, setWidth] = useState<number>(0);
    const { y, max } = useScrollPosition();

    const blogPage = pathname === "/blog/[slug]";

    useEffect(() => {
        if (blogPage) {
            const newWidth = y / max;
            if (newWidth !== width) {
                setWidth(newWidth * 100);
            }
        }
    }, [y, max, width, blogPage]);

    const [top, setTop] = useState<boolean>(true);

    useEffect(() => {
        const scrollHandler = () => {
            window.pageYOffset > 10 ? setTop(false) : setTop(true);
        };
        window.addEventListener("scroll", scrollHandler);
        return () => window.removeEventListener("scroll", scrollHandler);
    }, [top]);

    const [clickMobileMenu, setClickMobileMenu] = useState<boolean>(false);

    const currentPage = router.pathname;

    return (
        <nav
            className={`w-full fixed duration-300 z-50 backdrop-filter backdrop-blur-lg pb-4 ${
                clickMobileMenu ? "bg-cyan-900 bg-opacity-20" : "bg-opacity-30"
            } ${
                !top &&
                "backdrop-filter backdrop-blur-lg bg-cyan-100 dark:bg-cyan-900 bg-opacity-50 dark:bg-opacity-10 hover:bg-opacity-60 hover:bg-cyan-50 dark:hover:bg-opacity-20 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.3)] shadow-black"
            }`}
        >
            {blogPage && (
                <div className="absolute w-full">
                    <div className="relative">
                        <div className="flex h-1 overflow-hidden text-xs">
                            <div
                                style={{
                                    width: `${width}%`,
                                }}
                                className={`shadow-none flex flex-col text-center whitespace-nowrap text-black dark:text-white justify-center ${
                                    width > 99 && "duration-200"
                                } bg-${
                                    width >= 100 ? "green-500" : "blue-700"
                                }`}
                            ></div>
                        </div>
                    </div>
                </div>
            )}

            <div
                className={`${
                    clickMobileMenu &&
                    "bg-white dark:bg-gray-800 bg-opacity-40 dark:bg-opacity-40"
                }`}
            >
                <div className="px-4 pl-8 mx-auto -mt-1 max-w-7xl sm:px-6 sm:pl-8 lg:px-8 lg:pl-8">
                    <div className="flex items-center justify-between h-16 mb-2">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                {!clickMobileMenu ? (
                                    <AnimatedTitle />
                                ) : (
                                    <h1
                                        className="mt-3 text-3xl font-semibold text-black cursor-pointer dark:text-white"
                                        onClick={() => router.push("/")}
                                    >
                                        David Ilie
                                    </h1>
                                )}
                            </div>
                            <div className="hidden md:block">
                                <div className="flex items-baseline mt-6 ml-10 space-x-4">
                                    {pages.map((page, index) => {
                                        const current =
                                            currentPage === page.url;

                                        if (page.type !== "dropdown") {
                                            return (
                                                <span
                                                    onClick={() =>
                                                        !current
                                                            ? router
                                                                  .push(
                                                                      page.url
                                                                  )
                                                                  .then(() =>
                                                                      window.scrollTo(
                                                                          0,
                                                                          0
                                                                      )
                                                                  )
                                                            : null
                                                    }
                                                    key={index}
                                                    className={`cursor-pointer ${
                                                        current
                                                            ? "bg-gray-600 dark:bg-gray-800 text-white px-3 py-2 rounded-md text-sm font-medium duration-200"
                                                            : "text-gray-800 dark:text-gray-300 hover:bg-gray-600 dark:hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium duration-200"
                                                    }`}
                                                >
                                                    {page.name}
                                                </span>
                                            );
                                        }

                                        if (page.type === "dropdown") {
                                            return (
                                                <div
                                                    className="navItem group"
                                                    key={index}
                                                >
                                                    <button className="flex items-center px-3 py-1 text-gray-800 duration-200 rounded-sm outline-none focus:outline-none dark:text-gray-300 hover:bg-gray-600 dark:hover:bg-gray-800 hover:text-white">
                                                        <span className="flex-1 pr-1 text-sm font-medium">
                                                            {page.name}
                                                        </span>
                                                        <span>
                                                            <svg
                                                                className="w-4 h-4 transition duration-150 ease-in-out transform fill-current group-hover:-rotate-180"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                            </svg>
                                                        </span>
                                                    </button>
                                                    <ul
                                                        className="absolute text-white transition duration-150 ease-in-out origin-top transform scale-0 bg-gray-600 dark:bg-gray-800 group-hover:scale-100 min-w-32"
                                                    >
                                                        {page.links.map(
                                                            (page, index) => {
                                                                return (
                                                                    <Link
                                                                        href={
                                                                            page.url
                                                                        }
                                                                        key={
                                                                            index
                                                                        }
                                                                        passHref={
                                                                            true
                                                                        }
                                                                    >
                                                                        <li className="px-3 py-1 duration-200 rounded-sm cursor-pointer hover:bg-gray-700">
                                                                            {
                                                                                page.name
                                                                            }
                                                                        </li>
                                                                    </Link>
                                                                );
                                                            }
                                                        )}
                                                    </ul>
                                                </div>
                                            );
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="flex items-center mt-6 ml-10 space-x-4">
                                <UserDropdown />
                            </div>
                        </div>
                        <div className="flex items-center mt-3 -mr-2 md:hidden">
                            <div className="mr-5 mt-0.5">
                                <UserDropdown />
                            </div>
                            <button
                                type="button"
                                className="inline-flex items-center justify-center p-2 text-gray-500 bg-gray-200 rounded-md dark:bg-gray-800 hover:bg-gray-300 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
                                onClick={() => {
                                    setClickMobileMenu(!clickMobileMenu);
                                }}
                            >
                                {clickMobileMenu ? (
                                    <svg
                                        className="block w-6 h-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="block w-6 h-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                {clickMobileMenu && (
                    <div className="h-screen text-center bg-opacity-50 md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {pages.map((page, index) => {
                                const current = currentPage === page.url;
                                if (page.type !== "dropdown") {
                                    return (
                                        <span
                                            onClick={() =>
                                                !current
                                                    ? router
                                                          .push(page.url)
                                                          .then(() =>
                                                              window.scrollTo(
                                                                  0,
                                                                  0
                                                              )
                                                          ) &&
                                                      setClickMobileMenu(false)
                                                    : null
                                            }
                                            key={index}
                                            className={
                                                current
                                                    ? "bg-cyan-600 dark:bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                                                    : "text-gray-800 dark:text-gray-300 hover:bg-cyan-800 dark:hover:bg-cyan-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                                            }
                                        >
                                            {page.name}
                                        </span>
                                    );
                                }
                                if (page.type === "dropdown") {
                                    return page.links.map((page, index) => {
                                        return (
                                            <span
                                                onClick={() =>
                                                    !current
                                                        ? router
                                                              .push(page.url)
                                                              .then(() =>
                                                                  window.scrollTo(
                                                                      0,
                                                                      0
                                                                  )
                                                              ) &&
                                                          setClickMobileMenu(
                                                              false
                                                          )
                                                        : null
                                                }
                                                key={index}
                                                className={
                                                    current
                                                        ? "bg-cyan-600 dark:bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                                                        : "text-gray-800 dark:text-gray-300 hover:bg-cyan-800 dark:hover:bg-cyan-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                                                }
                                            >
                                                {page.name}
                                            </span>
                                        );
                                    });
                                }
                            })}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};
