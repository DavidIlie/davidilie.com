import { colors } from "@lib/colors";

interface BlogBadeProps {
    tag: string;
}

export const BlogBadge = ({ tag }: BlogBadeProps): JSX.Element => {
    return (
        <span
            className={`inline-flex items-center justify-center px-2 py-2 mr-2 text-xs font-bold leading-none text-${
                colors[(tag.charCodeAt(1) + tag.charCodeAt(1)) % 17]
            }-50 bg-${
                colors[(tag.charCodeAt(1) + tag.charCodeAt(2)) % 17]
            }-600 bg-opacity-50 rounded-md`}
        >
            {tag}
        </span>
    );
};
