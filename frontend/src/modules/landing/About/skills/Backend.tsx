export const BackendDeveloper = () => {
    return (
        <div className="xl:w-1/3 xs:w-full 2xl:border-r-2 xl:border-r-2 md:border-r-2 md:border-b-0 xl:border-b-0 border-b-2 border-fuchasia-600 dark:border-gray-600 px-5 pt-10">
            <img
                src="/images/svg/backend.svg"
                alt="Backend Developer"
                className="h-24 w-24 mx-auto animate-pulse mb-4"
            />
            <div className="text-center mb-10">
                <h1 className="text-2xl font-semibold mb-5">
                    Backend Developer
                </h1>
                <p className="text-section px-16">
                    I value{" "}
                    <span className="text-blue-700 dark:text-blue-500 font-bold">
                        fast
                    </span>{" "}
                    API calls and{" "}
                    <span className="text-blue-700 dark:text-blue-500 font-bold">
                        efficent
                    </span>{" "}
                    code.
                </p>
            </div>
            <div className="text-center mb-10">
                <h1 className="text-2xl font-semibold text-blue-700 dark:text-blue-500">
                    Stack I use:
                </h1>
                <p className="text-section">MongoDB, Express, NodeJS</p>
            </div>
            <div className="text-center mb-7">
                <h1 className="text-2xl font-semibold text-blue-700 dark:text-blue-500">
                    Tools I use:
                </h1>
                <p className="text-section">Visual Studio Code</p>
                <p className="text-section">MongoDB Compass</p>
                <p className="text-section">Postman</p>
                <p className="text-section">Github</p>
                <p className="text-section">Linux</p>
                <p className="text-section">Terminal</p>
            </div>
        </div>
    );
};
