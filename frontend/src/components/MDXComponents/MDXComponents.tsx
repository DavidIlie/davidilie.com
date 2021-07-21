import Link from "next/link";

import { HiOutlineInformationCircle } from "react-icons/hi";
import { RiBubbleChartLine } from "react-icons/ri";

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
                <a className="duration-200 text-blue-600 hover:text-blue-700 hover:underline cursor-pointer">
                    {props.children}
                </a>
            </Link>
        );
    }
    return (
        <a
            href={props.href}
            className="duration-200 text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
        >
            {props.children}
        </a>
    );
};

export const RemarkTitle = (props: any) => {
    return (
        <div
            {...props}
            style={{
                backgroundColor: "#2d3748",
                marginBottom: "-3%",
                padding: "0.75rem",
                paddingLeft: "1rem",
                border: "1px solid",
                borderBottom: "none",
                borderColor: "#2d3748",
                borderTopLeftRadius: "1rem",
                borderTopRightRadius: "1rem",
                fontFamily: "monospace",
            }}
        />
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
            className="scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-200 rounded-2xl mt-8 py-5 px-5 bg-gray-900 overflow-auto w-full"
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

export const InfoQuote = ({ children }) => (
    <div className="px-6 py-1 mb-5 rounded-lg border-l-4 leading-relaxed text-gray-300 relative border-blue-500 bg-blue-500 bg-opacity-10">
        <div
            className="text-center bg-gray-900 rounded-full w-10 h-10 flex items-center justify-center"
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

export const ThoughtQuote = ({ children }) => (
    <div className="px-6 py-1 rounded-lg border-l-4 leading-relaxed text-gray-300 relative border-purple-500 bg-purple-500 bg-opacity-10">
        <div
            className="text-center bg-gray-900 rounded-full w-10 h-10 flex items-center justify-center"
            style={{
                float: "left",
                position: "absolute",
                top: "-30px",
                left: "-20px",
            }}
        >
            <RiBubbleChartLine className="text-3xl text-purple-500" />
        </div>
        <div className="p-0 m-0 text-lg mb-3">{children}</div>
    </div>
);
