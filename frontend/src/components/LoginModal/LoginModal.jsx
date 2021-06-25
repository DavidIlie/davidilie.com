import Modal from "@ui/Modal";
import { signIn } from "next-auth/client";
import { useQuery } from "react-query";

export const LoginModal = (props) => {
    const { data: providers } = useQuery(`getProviders`, () => {
        return fetch(`/api/auth/providers`).then((res) => res.json());
    });

    return (
        <Modal {...props}>
            <div className="grid divide-y divide-gray-500">
                <h1 className="text-2xl">Log In</h1>
                <div className="mt-3">
                    <p className="mt-4 mb-2">
                        Please select the external service you want to sign in
                        with:
                    </p>
                    <div className="flex justify-center">
                        <div>
                            {providers?.google &&
                                Object.values(providers).map(
                                    (provider, index) => (
                                        <div
                                            key={provider.name}
                                            onClick={() =>
                                                signIn(provider.id, {
                                                    callbackUrl: props.callback,
                                                })
                                            }
                                            className={`w-48 bg-blue-700 duration-200 hover:bg-blue-800 p-3 rounded text-center cursor-pointer ${
                                                index < 1 && "mb-4"
                                            }`}
                                        >
                                            Sign in with {provider.name}
                                        </div>
                                    )
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
