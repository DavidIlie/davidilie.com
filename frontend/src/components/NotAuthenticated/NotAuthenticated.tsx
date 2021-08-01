import { Fade } from "react-awesome-reveal";
import { useState } from "react";

import LoginModal from "@components/LoginModal";

const NotAuthenticated = (): JSX.Element => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <>
            <Fade direction="down">
                <div className="flex flex-col justify-center items-center h-screen w-full">
                    <h1 className="header-gradient font-semibold 2xl:text-6xl xl:text-6xl md:text-6xl lg:text-6xl text-4xl text-center">
                        You are not authenticated!
                    </h1>
                    <p className="text-gray-500 text-2xl">
                        In order to see this page, please{" "}
                        <a
                            className="duration-200 text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                            onClick={() => setModalOpen(true)}
                        >
                            login
                        </a>
                    </p>
                </div>
            </Fade>
            {modalOpen ? (
                <LoginModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                />
            ) : null}
        </>
    );
};

export default NotAuthenticated;
