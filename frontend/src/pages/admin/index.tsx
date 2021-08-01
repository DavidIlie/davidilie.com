import { useSession } from "next-auth/client";

import ProtectedPage from "@components/ProtectedPage";

export default function Admin(): JSX.Element {
    return (
        <ProtectedPage className="h-screen flex justify-center items-center">
            <h1>hello there</h1>
        </ProtectedPage>
    );
}
