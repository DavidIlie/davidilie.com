import Link from "next/link";

interface ErrorPageProps {
    statusCode: number;
    message: string;
}

const ErrorPage = ({ statusCode, message }: ErrorPageProps): JSX.Element => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen">
            <div className="flex items-center justify-start">
                <div className="px-4 text-4xl font-semibold tracking-wider text-gray-300 border-r border-gray-500">
                    {statusCode}
                </div>

                <div className="ml-4 text-3xl tracking-wider text-gray-300">
                    {message}
                </div>
            </div>
            <div className="flex justify-center mt-2 text-section">
                <Link href="/">
                    <a className="hover:underline">Want to go home?</a>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
