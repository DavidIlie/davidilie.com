const CustomField = (props) => {
    return (
        <div className="mt-3 mb-4 w-full flex items-center justify-between">
            <div className="relative flex flex-wrap w-full items-stretch">
                <span className="z-10 mt-1 h-full leading-snug font-normal text-center absolute bg-transparent text-base items-center justify-center pl-3 py-3">
                    <props.icon />
                </span>
                <input
                    {...props}
                    className="px-10 py-3 placeholder-gray-600 dark:placeholder-gray-300 relative bg-gray-300 dark:bg-gray-900 rounded-xl text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"
                />
            </div>
        </div>
    );
};

export default CustomField;
