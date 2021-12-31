import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useState, useRef } from "react";

import { FiSettings } from "react-icons/fi";
import { AiFillBug } from "react-icons/ai";

import ThemeToggle from "./ThemeToggle";

import LoginModal from "@components/LoginModal";
import { shimmer } from "@lib/shimmer";

const UserDropdown = (): JSX.Element => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    //TODO: find a type-safe way to "click" the button when you click on a link in dropdown
    const buttonRef = useRef();

    const { data: session } = useSession();

    return (
        <>
            <Menu as="div" className="relative inline-block mt-1 text-right">
                <Menu.Button ref={buttonRef}>
                    {!session ? (
                        <div className="p-2 transition duration-100 ease-in-out bg-gray-200 rounded cursor-pointer hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <FiSettings
                                className="w-6 h-6 text-gray-500 rounded-full cursor-pointer dark:text-gray-400"
                                aria-label="Settings"
                                title="Settings"
                            />
                        </div>
                    ) : (
                        <Image
                            width="40%"
                            height="40%"
                            className="rounded-full cursor-pointer"
                            src={session.user.image}
                            blurDataURL={shimmer(1920, 1080)}
                            placeholder="blur"
                            aria-label="Settings+Account"
                            title="Settings+Account"
                        />
                    )}
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 bg-gray-100 rounded-md shadow-lg w-36 dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="border-gray-200 border-1 rounded-t-md dark:border-gray-900">
                            <Menu.Item>
                                <a
                                    href="https://github.com/DavidIlie/davidilie.com/issues"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Submit a bug report"
                                    title="Submit a bug report"
                                >
                                    <DropdownElement>
                                        <AiFillBug className="mx-0.5 text-xl" />
                                        Report a bug
                                    </DropdownElement>
                                </a>
                            </Menu.Item>
                            <Menu.Item as={DropdownElement}>
                                <ThemeToggle />
                            </Menu.Item>
                        </div>
                        {!session && (
                            <Menu.Item>
                                <a
                                    className="flex items-center justify-center w-full py-2 text-sm font-semibold text-center text-white bg-blue-600 cursor-pointer dark:bg-blue-800 group rounded-b-md"
                                    onClick={() =>
                                        !session
                                            ? setModalOpen(true)
                                            : signOut()
                                    }
                                    aria-label={`Click to log ${
                                        !session ? "in" : "out"
                                    } to your account`}
                                    title={`Click to log ${
                                        !session ? "in" : "out"
                                    } to your account`}
                                >
                                    {!session ? "Log In" : "Log Out"}
                                </a>
                            </Menu.Item>
                        )}
                    </Menu.Items>
                </Transition>
            </Menu>
            {modalOpen ? (
                <LoginModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                />
            ) : null}
        </>
    );
};

export const DropdownElement = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="flex items-center w-full gap-1 px-2 py-2 text-sm group rounded-b-md">
            {children}
        </div>
    );
};

export default UserDropdown;
