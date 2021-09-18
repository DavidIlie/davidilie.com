interface BlogBadeProps {
    tag: string;
}

export const BlogBadge = ({ tag }: BlogBadeProps): JSX.Element => {
    return (
        <span
            className={`inline-flex items-center justify-center px-2 py-2 mr-2 text-xs font-bold leading-none text-${
                [`green`, `blue`, `indigo`][
                    (tag.charCodeAt(1) + tag.charCodeAt(1)) % 3
                ]
            }-100 bg-${
                [`green`, `blue`, `indigo`][
                    (tag.charCodeAt(2) + tag.charCodeAt(1)) % 3
                ]
            }-800 rounded-md`}
        >
            {tag}
        </span>
    );
};
