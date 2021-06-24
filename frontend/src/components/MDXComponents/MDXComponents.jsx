export const CustomLink = (props) => {
    return (
        <a
            {...props}
            className="duration-200 text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
        />
    );
};

export const RemarkTitle = (props) => {
    return (
        <div
            {...props}
            style={{
                backgroundColor: "#111827",
                marginBottom: "-3%",
                padding: "1rem",
                paddingLeft: "1rem",
                border: "1px solid",
                borderBottom: "none",
                borderColor: "#111827",
                borderTopLeftRadius: "2rem",
                borderTopRightRadius: "2rem",
                fontFamily: "monospace",
            }}
        />
    );
};

export const CustomDiv = (props) => {
    if (props?.className?.includes("remark-code-title")) {
        return <RemarkTitle {...props} />;
    } else {
        return <div {...props} />;
    }
};

export const CustomPre = (props) => {
    return (
        <pre
            {...props}
            className="rounded-2xl mt-8 py-5 px-5 bg-gray-800 overflow-auto w-full"
            style={{ maxHeight: "500px" }}
        />
    );
};

export const CustomCode = (props) => {
    return (
        <code
            {...props}
            className={`${props.className} text-gray-200 code overflow-auto`}
        />
    );
};
