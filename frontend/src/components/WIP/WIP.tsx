import { Fade } from "react-awesome-reveal";

export const WIP = () => {
    return (
        <Fade direction="down">
            <div className="flex flex-col items-center justify-center w-full h-screen">
                <h1 className="text-4xl font-semibold text-center header-gradient 2xl:text-6xl xl:text-6xl md:text-6xl lg:text-6xl">
                    This page is currently being worked on.
                </h1>
                <p className="text-2xl text-gray-500">Check back later :)</p>
            </div>
        </Fade>
    );
};
