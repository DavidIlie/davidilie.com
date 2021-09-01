import ErrorPage from "@components/ErrorPage";
import { NextApiResponse } from "next";

function Error({ statusCode }: { statusCode: number }): JSX.Element {
    return (
        <ErrorPage
            statusCode={statusCode}
            message={
                statusCode ? `Internal Server Error` : "Client Error Occurred"
            }
        />
    );
}

Error.getInitialProps = ({
    res,
    err,
}: {
    res: NextApiResponse;
    err: { statusCode: number };
}) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;
