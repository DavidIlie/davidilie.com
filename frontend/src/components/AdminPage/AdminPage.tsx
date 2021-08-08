import { useSession } from "next-auth/client";
import { Fade } from "react-awesome-reveal";

import ProtectedPage from "@components/ProtectedPage";
import Loader from "@components/Loader";

const AdminPage = (props): JSX.Element => {
    const [session, loading] = useSession();

    if (loading) return <Loader />;

    return (
        <ProtectedPage>
            {session.user.isAdmin ? (
                <div {...props}>{props.children}</div>
            ) : (
                <>
                    <Fade direction="down">
                        <div className="flex flex-col justify-center items-center h-screen w-full">
                            <h1 className="header-gradient font-semibold 2xl:text-6xl xl:text-6xl md:text-6xl lg:text-6xl text-4xl text-center">
                                You are not an admin!
                            </h1>
                            <p className="text-gray-500 text-2xl">
                                In order to see this page, you need
                                administrator privileges.
                            </p>
                        </div>
                    </Fade>
                </>
            )}
        </ProtectedPage>
    );
};

export default AdminPage;
