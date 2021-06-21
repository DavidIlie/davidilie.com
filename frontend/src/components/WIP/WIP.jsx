import { Fade } from "react-awesome-reveal";

export const WIP = () => {
    return (
        <Fade direction="down">
            <div className="flex flex-col justify-center items-center h-screen w-full">
                <h1 className="header-gradient font-semibold 2xl:text-6xl xl:text-6xl md:text-6xl lg:text-6xl text-4xl text-center">
                    This page is currently a work in progress
                </h1>
                <p className="text-gray-500 text-2xl">Check back later :)</p>
            </div>
        </Fade>
    );
};
