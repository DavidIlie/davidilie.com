import Modal from "@ui/Modal";
import { useRouter } from "next/router";
import { signIn } from "next-auth/client";

interface LoginModalProps {
    isOpen: boolean;
    onClose: any;
    callback?: string;
}

export const LoginModal = ({
    isOpen,
    onClose,
    callback,
}: LoginModalProps): JSX.Element => {
    const router = useRouter();

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="grid divide-y divide-gray-500">
                <h1 className="text-2xl">Log In</h1>
                <div className="mt-3">
                    <p className="mt-4 mb-2">
                        Please select the external service you want to sign in
                        with:
                    </p>
                    <div className="flex justify-center">
                        <div>
                            <div
                                onClick={() =>
                                    signIn("google", {
                                        callbackUrl:
                                            callback || router.pathname,
                                    })
                                }
                                className={`w-48 text-white bg-blue-600 dark:bg-blue-700 duration-200 hover:bg-blue-700 dark:hover:bg-blue-800 p-3 rounded text-center cursor-pointer mb-4`}
                            >
                                Sign in with Google
                            </div>
                            <div
                                onClick={() =>
                                    signIn("discord", {
                                        callbackUrl:
                                            callback || router.pathname,
                                    })
                                }
                                className={`w-48 text-white bg-blue-600 dark:bg-blue-700 duration-200 hover:bg-blue-700 dark:hover:bg-blue-800 p-3 rounded text-center cursor-pointer`}
                            >
                                Sign in with Discord
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
