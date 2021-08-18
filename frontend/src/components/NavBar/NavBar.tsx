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

    const [clickMobileMenu, setClickMobileMenu] = useState<boolean>(false);

    const currentPage = router.pathname;

    return (
        <nav
            className={`w-full fixed duration-500 z-50 backdrop-filter backdrop-blur-lg pb-4 ${
                clickMobileMenu ? "bg-gray-800 bg-opacity-50" : "bg-opacity-30"
            }`}
        >
            {blogPage && (
                <div className="absolute w-full">
                    <div className="relative">
                        <div className="overflow-hidden h-1 text-xs flex">
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
                    clickMobileMenu && "bg-white dark:bg-gray-800 bg-opacity-50"
                }`}
            >
                <div className="max-w-7xl mx-auto pl-8 px-4 sm:px-6 sm:pl-8 lg:px-8 lg:pl-8 -mt-1">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                {!clickMobileMenu ? (
                                    <AnimatedTitle />
                                ) : (
                                    <h1
                                        className="text-black dark:text-white text-3xl font-semibold cursor-pointer mt-3"
                                        onClick={() => router.push("/")}
                                    >
                                        David Ilie
                                    </h1>
                                )}
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4 mt-6">
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
                                                    <button className="outline-none focus:outline-none px-3 py-1 text-gray-800 dark:text-gray-300 hover:bg-gray-600 dark:hover:bg-gray-800 duration-200 hover:text-white rounded-sm flex items-center">
                                                        <span className="pr-1 font-medium flex-1 text-sm">
                                                            {page.name}
                                                        </span>
                                                        <span>
                                                            <svg
                                                                className="fill-current h-4 w-4 transform group-hover:-rotate-180
                                          transition duration-150 ease-in-out"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                            </svg>
                                                        </span>
                                                    </button>
                                                    <ul
                                                        className="bg-gray-600 dark:bg-gray-800 text-white transform scale-0 group-hover:scale-100 absolute 
                                    transition duration-150 ease-in-out origin-top min-w-32"
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
                                                                        <li className="rounded-sm px-3 py-1 hover:bg-gray-700 duration-200 cursor-pointer">
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
                            <div className="ml-10 flex items-center space-x-4 mt-6">
                                <UserDropdown />
                            </div>
                        </div>
                        <div className="-mr-2 flex items-center md:hidden mt-3">
                            <div className="mr-5">
                                <UserDropdown />
                            </div>
                            <button
                                type="button"
                                className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
                                onClick={() => {
                                    setClickMobileMenu(!clickMobileMenu);
                                }}
                            >
                                {clickMobileMenu ? (
                                    <svg
                                        className="block h-6 w-6"
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
                                        className="block h-6 w-6"
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
                    <div className="md:hidden h-screen bg-opacity-50 text-center">
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
                                                    ? "bg-gray-600 dark:bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                                                    : "text-gray-800 dark:text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
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
                                                        ? "bg-gray-600 dark:bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                                                        : "text-gray-800 dark:text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer"
                                                }
                                            >
                                                {page.name}
                                            </span>
                                        );
                                    });
                                }
                            })}
                            <hr className="border-0 bg-gray-500 text-gray-500 h-px" />
                            <a
                                className="text-gray-800 dark:text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                href="https://status.davidilie.com"
                            >
                                Status
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};
