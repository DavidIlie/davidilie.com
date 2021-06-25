const CustomSubmitButton = (props) => {
    return (
        <button
            type="submit"
            className="w-full -mt-2 bg-blue-800 px-4 py-3 rounded-xl text-gray-200 font-semibold hover:bg-blue-600 transition duration-200 each-in-out"
        >
            {props.text}
        </button>
    );
};

export default CustomSubmitButton;
