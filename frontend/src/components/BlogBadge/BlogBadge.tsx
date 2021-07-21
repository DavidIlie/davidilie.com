interface BlogBadeProps {
    tag: string;
}

export const BlogBadge = ({ tag }: BlogBadeProps): JSX.Element => {
    return (
        <span
            className={`ml-1 inline-flex items-center justify-center px-2 py-2 mr-2 text-xs font-bold leading-none text-${
                [`yellow`, `green`, `blue`, `indigo`][
                    (tag.charCodeAt(0) + tag.charCodeAt(1)) % 4
                ]
            }-100 bg-${
                [`yellow`, `green`, `blue`, `indigo`][
                    (tag.charCodeAt(0) + tag.charCodeAt(1)) % 4
                ]
            }-800 rounded-md`}
        >
            {tag}
        </span>
    );
};
