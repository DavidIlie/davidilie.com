import Link from "next/link";
import { formatHashLink } from "@lib/formatHashLink";
import { HiOutlineInformationCircle, HiOutlineLightBulb } from "react-icons/hi";
import { RiBubbleChartLine } from "react-icons/ri";
import { FaQuoteLeft } from "react-icons/fa";
import { TiWarningOutline } from "react-icons/ti";
import Image, { ImageProps } from "next/image";
import { shimmer } from "@lib/shimmer";

import Tooltip from "@ui/Tooltip";

interface CustomLinkProps {
    href: string;
    children: React.ReactNode;
}

export const CustomLink = (props: CustomLinkProps) => {
    const href = props.href;
    const isInternalLink =
        href && (href.startsWith("/") || href.startsWith("#"));

    if (isInternalLink) {
        return (
            <Link href={props.href}>
                <a
                    className="duration-200 text-blue-500 hover:text-blue-600 hover:underline cursor-pointer"
                    {...props}
                >
                    {props.children}
                </a>
            </Link>
        );
    }
    return (
        <a
            href={props.href}
            className="duration-200 text-blue-500 hover:text-blue-600 hover:underline cursor-pointer"
            {...props}
        >
            {props.children}
        </a>
    );
};

interface CustomImageProps {
    border?: boolean;
}

export const CustomImage = ({
    alt,
    border,
    ...props
}: ImageProps & CustomImageProps): JSX.Element => {
    return (
        <div className="flex-col justify-center w-full blog-image">
            <div className="flex justify-center blog-image">
                <Image
                    alt={alt}
                    {...props}
                    placeholder="blur"
                    blurDataURL={shimmer(1920, 1080)}
                />
            </div>
            <h1 className="text-center font-semibold mt-2 text-gray-300 blog-image">
                {alt}
            </h1>
        </div>
    );
};

export const CustomUnorderedList = ({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element => {
    return <ul className="mt-3 list-disc ml-5 font-semibold ">{children}</ul>;
};

export const CustomListItem = ({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element => {
    return (
        <li className="text-blue-500">
            <span className="text-black dark:text-white">{children}</span>
        </li>
    );
};

const WindowButton = ({ bg }: { bg: string }) => {
    return (
        <a
            style={{ height: "12px", width: "12px", borderRadius: "999px" }}
            className={`bg-${bg}`}
        />
    );
};

export const RemarkTitle = ({ children }: { children: string }) => {
    const checkIfInternal =
        children.startsWith("Terminal") ||
        children.startsWith("web/") ||
        children.startsWith("Example");
    return (
        <div
            className="z-20 mt-2 -mb-5 flex flex-wrap justify-between items-center py-1 w-full mx-auto codeEditorTitle bg-gray-100 dark:bg-black border-gray-200 dark:border-black border-b-0"
            style={{
                borderBottom: "none",
                borderTopLeftRadius: "1rem",
                borderTopRightRadius: "1rem",
            }}
        >
            <span
                className="flex relative justify-start items-center gap-4 px-4 codeEditorTitle"
                style={{ height: "36px" }}
            >
                <WindowButton bg="red-400" />
                <WindowButton bg="yellow-400" />
                <WindowButton bg="green-500" />
            </span>
            {!checkIfInternal ? (
                <Tooltip content="Go to file">
                    <a
                        href={`https://github.com/davidilie/davidilie.com/tree/master/frontend/${children}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 text-blue-500 cursor-pointer truncate"
                    >
                        {children}
                    </a>
                </Tooltip>
            ) : (
                <a className="px-4 text-blue-500 truncate">{children}</a>
            )}
        </div>
    );
};

export const CustomDiv = (props: any) => {
    if (props?.className?.includes("remark-code-title")) {
        return <RemarkTitle {...props} />;
    } else {
        return <div {...props} />;
    }
};

export const CustomPre = (props: any) => {
    return (
        <pre
            {...props}
            className="z-50 scrollbar-thin scrollbar-thumb-blue-500 dark:scrollbar-thumb-blue-700 scrollbar-track-blue-200 py-5 px-5 bg-gray-200 dark:bg-gray-900 overflow-auto w-full"
            style={{ maxHeight: "500px" }}
        />
    );
};

export const CustomCode = (props: any) => {
    return (
        <code
            {...props}
            className={`${props.className} text-gray-200 code overflow-auto`}
        />
    );
};

export const InfoQuote = ({ children }: { children: JSX.Element }) => (
    <div className="px-6 py-1 mb-5 rounded-lg border-l-4 leading-relaxed text-gray-800 dark:text-gray-300 relative border-blue-700 bg-blue-700 bg-opacity-20 dark:border-blue-500 dark:bg-blue-500 dark:bg-opacity-10">
        <div
            className="text-center bg-gray-200 dark:bg-gray-900 rounded-full w-10 h-10 flex items-center justify-center"
            style={{
                float: "left",
                position: "absolute",
                top: "-30px",
                left: "-20px",
            }}
        >
            <HiOutlineInformationCircle className="text-3xl text-blue-500" />
        </div>
        <div className="p-0 m-0 text-lg mb-3">{children}</div>
    </div>
);

export const ThoughtQuote = ({ children }: { children: JSX.Element }) => (
    <div className="px-6 py-1 rounded-lg border-l-4 leading-relaxed text-gray-800 dark:text-gray-300 relative border-purple-700 bg-purple-700 bg-opacity-20 dark:border-purple-500 dark:bg-purple-500 dark:bg-opacity-10">
        <div
            className="text-center bg-gray-200 dark:bg-gray-900 rounded-full w-10 h-10 flex items-center justify-center"
            style={{
                float: "left",
                position: "absolute",
                top: "-30px",
                left: "-20px",
            }}
        >
            <RiBubbleChartLine className="text-3xl text-purple-600 dark:text-purple-500" />
        </div>
        <div className="p-0 m-0 text-lg mb-3">{children}</div>
    </div>
);

export const AnnouncementQuote = ({ children }: { children: JSX.Element }) => (
    <div className="px-6 py-1 rounded-lg border-l-4 text-gray-800 dark:text-gray-300 leading-relaxed relative border-yellow-700 bg-yellow-700 dark:border-yellow-500 dark:bg-yellow-500 bg-opacity-20 dark:bg-opacity-10">
        <div
            className="text-center bg-gray-200 dark:bg-gray-900 rounded-full w-10 h-10 flex items-center justify-center"
            style={{
                float: "left",
                position: "absolute",
                top: "-30px",
                left: "-20px",
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-600 dark:text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
            </svg>
        </div>
        <div className="p-0 m-0 text-lg mb-3">{children}</div>
    </div>
);

export const BlockQuote = ({ children }: { children: JSX.Element }) => (
    <div className="px-6 py-1 rounded-lg border-l-4 leading-relaxed text-gray-800 dark:text-gray-300 relative border-gray-600 dark:border-gray-300 bg-gray-400 bg-opacity-20 dark:bg-opacity-10">
        <div
            className="text-center bg-gray-200 dark:bg-gray-900 rounded-full w-10 h-10 flex items-center justify-center"
            style={{
                float: "left",
                position: "absolute",
                top: "-30px",
                left: "-20px",
            }}
        >
            <FaQuoteLeft />
        </div>
        <div className="p-0 m-0 text-lg mb-3 italic">{children}</div>
    </div>
);

export const IdeaQuote = ({ children }: { children: JSX.Element }) => (
    <div className="px-6 py-1 mb-6 rounded-lg border-l-4 leading-relaxed text-gray-800 dark:text-gray-300 relative border-yellow-600 bg-yellow-600 dark:border-yellow-400 dark:bg-yellow-400 bg-opacity-20 dark:bg-opacity-10">
        <div
            className="text-center bg-gray-200 dark:bg-gray-900 rounded-full w-10 h-10 flex items-center justify-center"
            style={{
                float: "left",
                position: "absolute",
                top: "-30px",
                left: "-20px",
            }}
        >
            <HiOutlineLightBulb className="text-3xl text-yellow-500 dark:text-yellow-400" />
        </div>
        <div className="p-0 m-0 text-lg mb-3">{children}</div>
    </div>
);

export const WarningQuote = ({ children }: { children: JSX.Element }) => (
    <div className="px-6 py-1 mb-6 rounded-lg border-l-4 leading-relaxed text-gray-800 dark:text-gray-300 relative bg-red-600 border-red-600 dark:border-red-500 dark:bg-red-500 bg-opacity-20 dark:bg-opacity-10">
        <div
            className="text-center bg-gray-200 dark:bg-gray-900 rounded-full w-10 h-10 flex items-center justify-center"
            style={{
                float: "left",
                position: "absolute",
                top: "-30px",
                left: "-20px",
            }}
        >
            <TiWarningOutline className="text-3xl text-red-700 dark:text-red-500" />
        </div>
        <div className="p-0 m-0 text-lg mb-3">{children}</div>
    </div>
);

const AnchorLink = ({ children }: { children: string }) => {
    return (
        <Tooltip content="Click for anchor link">
            <a
                href={`#${formatHashLink(children[1])}`}
                className="duration-200 hover:text-blue-500"
            >
                {children}
            </a>
        </Tooltip>
    );
};

export const h1 = ({ children }: { children: any }) => (
    <h1 className="text-4xl font-extrabold text-black dark:text-white mt-2">
        <AnchorLink>{children}</AnchorLink>
    </h1>
);

export const h2 = ({ children }: { children: any }) => (
    <h2 className="text-3xl font-extrabold text-black dark:text-white mt-2">
        <AnchorLink>{children}</AnchorLink>
    </h2>
);

export const h3 = ({ children }: { children: any }) => (
    <h3 className="text-2xl font-extrabold text-black dark:text-white">
        <AnchorLink>{children}</AnchorLink>
    </h3>
);

export const h4 = ({ children }: { children: any }) => (
    <h4 className="text-xl font-extrabold text-black dark:text-white">
        <AnchorLink>{children}</AnchorLink>
    </h4>
);

export const h5 = ({ children }: { children: any }) => (
    <h5 className="text-lg font-extrabold text-black dark:text-white">
        <AnchorLink>{children}</AnchorLink>
    </h5>
);

export const h6 = ({ children }: { children: any }) => (
    <h6 className="text-md font-extrabold text-black dark:text-white">
        <AnchorLink>{children}</AnchorLink>
    </h6>
);
