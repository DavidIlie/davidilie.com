export const LinkButton = ({ link, text, Icon }) => {
    return (
        <button className="bg-gray-700 hover:bg-blue-500 duration-200 p-2 rounded-xl">
            <a href={link} target="_blank" className="inline-flex items-center">
                <Icon className="w-4 h-4 mr-2" />
                {text}
            </a>
        </button>
    );
};
