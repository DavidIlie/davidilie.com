import LeftPortion from "./portions/left";

export default function Header() {
    return (
        <div className="h-full flex justify-center items-center space-x-32">
            <LeftPortion />
        </div>
    );
}
