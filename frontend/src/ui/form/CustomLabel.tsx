export default function CustomLabel(props) {
    return (
        <label className="block text-black dark:text-white text-lg font-semibold -mb-2 mt-5 px-0.5">
            {props.error ? (
                <span className="text-red-500">{props.error}</span>
            ) : (
                <span>{props.name}</span>
            )}
        </label>
    );
}
