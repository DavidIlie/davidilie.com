import LeftArea from "./left"
import RightArea from "./right"

export default function Header() {
    return (
        <div className="h-full flex justify-center items-center space-x-32">
            <LeftArea/>
            <RightArea/>
        </div>
    )
}