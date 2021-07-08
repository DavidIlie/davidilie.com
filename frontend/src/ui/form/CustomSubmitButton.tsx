const CustomSubmitButton = (props) => {
    return (
        <span className="inline-flex py-1 rounded-md shadow-sm bg-blue-600 hover:bg-blue-800 duration-200">
            <button
                {...props}
                type="submit"
                className={`inline-flex items-center w-full mx-auto px-4 py-2 border border-transparent ${
                    props.submitting && "cursor-not-allowed"
                }`}
                disabled={props.submitting}
            >
                {props.submitting && (
                    <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                )}
                {props.submitting ? props.submitText : props.text}
            </button>
        </span>
    );
};

export default CustomSubmitButton;
