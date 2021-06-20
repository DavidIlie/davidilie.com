export const FrontendDeveloper = () => {
    return (
        <div className="xl:w-1/3 xs:w-full 2xl:border-r-2 xl:border-r-2 md:border-r-2 2xl:border-b-0 md:border-b-0 xl:border-b-0 border-b-2 border-fuchsia-600 px-5 pt-10">
            <img
                src="/images/svg/frontend.svg"
                className="h-24 w-24 mx-auto animate-wiggle mb-4"
            />
            <div className="text-center mb-10">
                <h1 className="text-2xl font-semibold mb-5">
                    Frontend Developer
                </h1>
                <p className="text-section">
                    I like bringing my ideas to{" "}
                    <span className="text-blue-700 font-bold">reality</span>, by
                    producing simple but powerful{" "}
                    <span className="text-blue-700 font-bold">code</span>.
                </p>
            </div>
            <div className="text-center mb-10">
                <h1 className="text-2xl font-semibold text-blue-700">
                    Frameworks I use:
                </h1>
                <p className="text-section">HTML, Next.js, Tailwind CSS</p>
            </div>
            <div className="text-center mb-7">
                <h1 className="text-2xl font-semibold text-blue-700">
                    Tools I use:
                </h1>
                <p className="text-section">Visual Studio Code</p>
                <p className="text-section">Figma</p>
                <p className="text-section">Adobe Illustrator</p>
                <p className="text-section">Pen & Paper</p>
            </div>
        </div>
    );
};
