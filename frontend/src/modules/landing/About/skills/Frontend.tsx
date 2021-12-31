import { shimmer } from "@lib/shimmer";
import Image from "next/image";

export const FrontendDeveloper = () => {
    return (
        <div className="px-5 pt-10 border-b-2 xl:w-1/3 xs:w-full 2xl:border-r-2 xl:border-r-2 md:border-r-2 2xl:border-b-0 md:border-b-0 xl:border-b-0 border-fuchasia-600 dark:border-gray-600">
            <div className="flex justify-center mb-3">
                <Image
                    src="/images/svg/frontend.svg"
                    alt="Frontend Developer"
                    className="w-24 h-24 animate-wiggle"
                    blurDataURL={shimmer(1920, 1080)}
                    placeholder="blur"
                    width="100%"
                    height="100%"
                />
            </div>
            <div className="mb-10 text-center">
                <h1 className="mb-5 text-2xl font-semibold">
                    Frontend Developer
                </h1>
                <p className="text-section">
                    I like bringing my ideas to{" "}
                    <span className="font-bold text-blue-700 dark:text-blue-500">
                        reality
                    </span>
                    , by producing simple but powerful{" "}
                    <span className="font-bold text-blue-700 dark:text-blue-500">
                        code
                    </span>
                    .
                </p>
            </div>
            <div className="mb-10 text-center">
                <h1 className="text-2xl font-semibold text-blue-700 dark:text-blue-500">
                    Technologies I use:
                </h1>
                <p className="text-section">React, Next.js, Tailwind CSS</p>
            </div>
            <div className="text-center mb-7">
                <h1 className="text-2xl font-semibold text-blue-700 dark:text-blue-500">
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
