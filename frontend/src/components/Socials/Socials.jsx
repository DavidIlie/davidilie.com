import {
    FaDiscord,
    FaYoutube,
    FaTwitter,
    FaTwitch,
    FaGithub,
} from "react-icons/fa";
import { toast } from "react-toastify";

import { SocialIcon } from "./SocialIcon";

export const Socials = ({ font, invisible }) => {
    const HandleCopy = () => {
        try {
            navigator.clipboard.writeText("Albastru#0871");
            toast.info("Copied successfully!", { toastId: "copiedDiscord" });
        } catch (error) {
            toast.error("Couldn't copy! Discord: Albastru#0871");
        }
    };
    return (
        <div
            className={`mt-2 text-white text-${
                font !== undefined ? font : 3
            }xl flex space-x-10 justify-center ${
                invisible ? "invisible" : "visible"
            }`}
        >
            <SocialIcon
                tooltip="DavidIlie"
                newPage
                link={`${process.env.NEXT_PUBLIC_HOST}/api/redir/github`}
            >
                <FaGithub className="mb-1" />
            </SocialIcon>
            <SocialIcon tooltip="Albastru#0871" onClick={HandleCopy}>
                <FaDiscord />
            </SocialIcon>
            <SocialIcon
                tooltip="Albastru"
                newPage
                link={`${process.env.NEXT_PUBLIC_HOST}/api/redir/youtube`}
            >
                <FaYoutube className="mb-1" />
            </SocialIcon>
            <SocialIcon
                tooltip="AlbastruYT"
                newPage
                link={`${process.env.NEXT_PUBLIC_HOST}/api/redir/twitch`}
            >
                <FaTwitch />
            </SocialIcon>
            <SocialIcon
                tooltip="AlbastruYT"
                newPage
                link={`${process.env.NEXT_PUBLIC_HOST}/api/redir/twitter`}
            >
                <FaTwitter />
            </SocialIcon>
        </div>
    );
};
