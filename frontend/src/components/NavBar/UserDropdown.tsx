import Image from "next/image";
import { useSession, signOut } from "next-auth/client";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { AiFillBug } from "react-icons/ai";

import ThemeToggle from "./ThemeToggle";

import LoginModal from "@components/LoginModal";
import React from "react";

const UserDropdown = (): JSX.Element => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const [session, loading] = useSession();

    if (loading) return null;

    return (
        <>
            <Menu as="div" className="mt-1 relative inline-block text-right">
                <Menu.Button>
                    {!session ? (
                        <div className="transition duration-100 ease-in-out p-2 bg-gray-200 hover:bg-gray-300 rounded dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer">
                            <FiSettings
                                className="cursor-pointer rounded-full h-6 w-6 text-gray-500 dark:text-gray-400"
                                aria-label="Settings"
                                title="Settings"
                            />
                        </div>
                    ) : (
                        <Image
                            width="40%"
                            height="40%"
                            className="cursor-pointer rounded-full"
                            src={session.user.image}
                            blurDataURL={
                                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAIAAADwyuo0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAIklEQVQImWNgYBDnFZCxsfc0tvJkCI/O+vP/f0tdhZK8CgBLPAfARKUieAAAAABJRU5ErkJggg=="
                            }
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
                    <Menu.Items className="absolute right-0 w-36 bg-gray-100 dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="border-1 rounded-t-md border-gray-200 dark:border-gray-900">
                            <Menu.Item>
                                <a
                                    href="https://github.com/DavidIlie/davidilie.com/issues"
                                    target="_blank"
                                    aria-label="Submit a bug report"
                                    title="Submit a bug report"
                                >
                                    <DropdownElement>
                                        <AiFillBug className="text-2xl" />
                                        Report a bug
                                    </DropdownElement>
                                </a>
                            </Menu.Item>
                            <Menu.Item as={DropdownElement}>
                                <ThemeToggle />
                            </Menu.Item>
                        </div>
                        <Menu.Item>
                            <a
                                className="font-semibold cursor-pointer bg-gray-300 dark:bg-blue-800 text-center group flex justify-center rounded-b-md items-center w-full py-2 text-sm"
                                onClick={() =>
                                    !session ? setModalOpen(true) : signOut()
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
        <div className="group flex gap-1 rounded-b-md items-center w-full px-2 py-2 text-sm">
            {children}
        </div>
    );
};

export default UserDropdown;
