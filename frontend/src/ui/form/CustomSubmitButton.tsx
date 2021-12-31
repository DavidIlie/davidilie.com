interface Props {
    submitting: boolean;
    submitText: string;
    text: string;
    width?: number;
}

const CustomSubmitButton = ({
    submitting,
    submitText,
    text,
    width,
    ...rest
}: Props) => {
    return (
        <span className="inline-flex py-1 duration-200 bg-blue-400 rounded-md shadow-sm dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-800">
            <button
                {...rest}
                type="submit"
                className={`inline-flex items-center w-${
                    width ? width : "full"
                } mx-auto px-4 py-2 border border-transparent ${
                    submitting && "cursor-not-allowed"
                }`}
                disabled={submitting}
            >
                {submitting && (
                    <svg
                        className="w-5 h-5 mr-3 -ml-1 text-white animate-spin dark:text-white"
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
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                )}
                <div className="mx-auto">{submitting ? submitText : text}</div>
            </button>
        </span>
    );
};

export default CustomSubmitButton;
