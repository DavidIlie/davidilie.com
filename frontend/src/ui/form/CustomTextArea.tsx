const CustomTextArea = (props) => {
    return (
        <textarea
            {...props}
            className="mt-3 px-4 py-3 placeholder-gray-600 dark:placeholder-gray-300 relative bg-gray-300 dark:bg-gray-900 rounded-xl text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10"
        />
    );
};

export default CustomTextArea;
