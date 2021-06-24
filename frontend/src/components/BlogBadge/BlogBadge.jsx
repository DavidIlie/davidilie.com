export const BlogBadge = ({ tag }) => {
    return (
        <span className="ml-1 inline-flex items-center justify-center px-2 py-2 mr-2 text-xs font-bold leading-none text-green-100 bg-green-800 rounded-md">
            {tag}
        </span>
    );
};
