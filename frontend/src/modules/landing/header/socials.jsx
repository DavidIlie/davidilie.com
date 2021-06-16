import { FaDiscord, FaYoutube, FaTwitter, FaTwitch, FaGithub } from "react-icons/fa";
import Tooltip from "@ui/Tooltip";
import { toast } from "react-toastify";

export default function Socials() {
    const HandleCopy = () => {
        navigator.clipboard.writeText("Albastru#0871")
        toast.info("Copied successfully!", { toastId: "copiedDiscord"})
    }
    return (
        <div className="text-white text-3xl absolute right-0 p-2">
            <Tooltip content="DavidIlie" placement="left">
                <a href="https://github.com/DavidIlie" target="_blank" className="hover:text-blue-100 duration-250">
                    <FaGithub className="mb-1" />
                </a>
            </Tooltip>
            <Tooltip content="Albastru#0871" placement="left">
                <a className="hover:text-blue-100 duration-250 cursor-pointer" onClick={HandleCopy}>
                    <FaDiscord />
                </a>
            </Tooltip>
            <Tooltip content="Albastru" placement="left">
                <a href="https://youtube.com/channel/UCwfF_jZHkxF1Vxx5b8PlIGA" target="_blank" className="hover:text-blue-100 duration-250">
                    <FaYoutube className="mb-1" />
                </a>
            </Tooltip>
            <Tooltip content="AlbastruYT" placement="left">
                <a href="https://twitch.tv/AlbastruYT" target="_blank" className="hover:text-blue-100 duration-250">
                    <FaTwitch />
                </a>
            </Tooltip>
            <Tooltip content="AlbastruYT" placement="left">
                <a href="https://twitter.com/AlbastruYT" target="_blank" className="hover:text-blue-100 duration-250">
                    <FaTwitter />
                </a>
            </Tooltip>
        </div>
    )
}