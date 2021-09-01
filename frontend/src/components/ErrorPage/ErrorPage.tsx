import Link from "next/link";

interface ErrorPageProps {
    statusCode: number;
    message: string;
}

const ErrorPage = ({ statusCode, message }: ErrorPageProps): JSX.Element => {
    return (
        <div className="flex flex-col justify-center items-center h-screen w-full">
            <div className="flex items-center justify-start">
                <div className="px-4 text-4xl font-semibold text-gray-300 border-r border-gray-500 tracking-wider">
                    {statusCode}
                </div>

                <div className="ml-4 text-3xl text-gray-300 tracking-wider">
                    {message}
                </div>
            </div>
            <div className="flex justify-center text-section mt-2">
                <Link href="/">
                    <a className="hover:underline">Want to go home?</a>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
