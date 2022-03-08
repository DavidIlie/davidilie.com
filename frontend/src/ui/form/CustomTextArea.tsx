const CustomTextArea = (props) => {
    return (
        <textarea
            {...props}
            className="w-full px-4 py-3 pr-10 mt-3 text-sm placeholder-gray-600 bg-gray-300 border-0 shadow outline-none dark:placeholder-gray-300 dark:bg-gray-900 rounded-xl focus:outline-none focus:ring"
        />
    );
};

export default CustomTextArea;
