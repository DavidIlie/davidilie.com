import { AiOutlineArrowDown } from "react-icons/ai";

export default function scrollDown() {
    return (
        <div className="text-white absolute bottom-0 p-5">
            <AiOutlineArrowDown className="mx-auto text-5xl animate-bounce" />
            <h1 className="text-3xl">Scroll Down!</h1>
        </div>
    );
}
