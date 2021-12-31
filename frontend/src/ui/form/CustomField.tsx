const CustomField = (props) => {
    return (
        <div className="flex items-center justify-between w-full mt-3 mb-4">
            <div className="relative flex flex-wrap items-stretch w-full">
                <span className="absolute z-10 items-center justify-center h-full py-3 pl-3 mt-1 text-base font-normal leading-snug text-center bg-transparent">
                    <props.icon />
                </span>
                <input
                    {...props}
                    className="relative w-full px-10 py-3 pr-10 text-sm placeholder-gray-600 bg-gray-300 border-0 shadow outline-none dark:placeholder-gray-300 dark:bg-gray-900 rounded-xl focus:outline-none focus:ring"
                />
            </div>
        </div>
    );
};

export default CustomField;
