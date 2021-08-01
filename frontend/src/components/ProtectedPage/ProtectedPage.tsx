import { useSession } from "next-auth/client";

import NotAuthenticated from "@components/NotAuthenticated";
import Loader from "@components/Loader";

const ProtectedPage = (props): JSX.Element => {
    const [session, loading] = useSession();

    if (loading) return <Loader />;

    if (!loading && !session)
        return (
            <div className="h-screen">
                <NotAuthenticated />
            </div>
        );
    return <div {...props}>{props.children}</div>;
};

export default ProtectedPage;
