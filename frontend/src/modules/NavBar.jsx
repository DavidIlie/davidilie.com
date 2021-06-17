import { useState, useEffect } from "react";

export default function NavBar() {
    const [clickMobileMenu, setClickMobileMenu] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY >= 80) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        });
    }, []);

    return (
        <nav
            className={`${
                scrolled ? "bg-gray-800" : ""
            } w-full fixed duration-500 cursor-pointer`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <h1 className="text-white text-2xl">David Ilie</h1>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <a className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium duration-250">
                                    Home
                                </a>

                                <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium duration-250">
                                    Contact
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            type="button"
                            className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                            onClick={() => {
                                setClickMobileMenu(!clickMobileMenu);
                                setScrolled(!clickMobileMenu);
                            }}
                        >
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

                            <svg
                                className="hidden h-6 w-6"
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
                        </button>
                    </div>
                </div>
            </div>
            {clickMobileMenu ? (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium">
                            Dashboard
                        </a>
                        <a className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                            Contact
                        </a>
                    </div>
                </div>
            ) : null}
        </nav>
    );
}
