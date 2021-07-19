interface CustomLinkProps {
    href: string;
    children: React.ReactNode;
}

export const CustomLink = (props: CustomLinkProps) => {
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
                padding: "1rem",
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
