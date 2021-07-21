interface BlogBadeProps {
    tag: string;
}

export const BlogBadge = ({ tag }: BlogBadeProps): JSX.Element => {
    return (
        <span
            className={`ml-1 inline-flex items-center justify-center px-2 py-2 mr-2 text-xs font-bold leading-none text-${
                [`gray`, `red`, `yellow`, `green`, `blue`, `indigo`][
                    (tag.charCodeAt(0) + tag.charCodeAt(1)) % 6
                ]
            }-100 bg-${
                [`gray`, `red`, `yellow`, `green`, `blue`, `indigo`][
                    (tag.charCodeAt(0) + tag.charCodeAt(1)) % 6
                ]
            }-700 rounded-md`}
        >
            {tag}
        </span>
    );
};
