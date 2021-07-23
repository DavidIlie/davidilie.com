import {
    FaDiscord,
    FaYoutube,
    FaTwitter,
    FaTwitch,
    FaGithub,
} from "react-icons/fa";
import { toast } from "react-toastify";

import { SocialIcon } from "./SocialIcon";

interface SocialsProps {
    font: string | number;
    invisible: boolean;
}

export const Socials = ({ font, invisible }: SocialsProps): JSX.Element => {
    return (
        <div
            className={`mt-2 text-white flex space-x-10 justify-center ${
                invisible ? "invisible" : "visible"
            }`}
        >
            <SocialIcon
                tooltip="DavidIlie"
                newPage
                link={`/api/redir/github`}
            >
                <FaGithub
                    className="mb-1"
                    size={font !== undefined ? `${font}em` : "1.75em"}
                />
            </SocialIcon>
            <SocialIcon tooltip="Albastru#0871">
                <FaDiscord size={font !== undefined ? `${font}em` : "1.75em"} />
            </SocialIcon>
            <SocialIcon
                tooltip="Albastru"
                newPage
                link={`/api/redir/youtube`}
            >
                <FaYoutube
                    className="mb-1"
                    size={font !== undefined ? `${font}em` : "1.75em"}
                />
            </SocialIcon>
            <SocialIcon
                tooltip="AlbastruYT"
                newPage
                link={`/api/redir/twitch`}
            >
                <FaTwitch size={font !== undefined ? `${font}em` : "1.75em"} />
            </SocialIcon>
            <SocialIcon
                tooltip="AlbastruYT"
                newPage
                link={`$/api/redir/twitter`}
            >
                <FaTwitter size={font !== undefined ? `${font}em` : "1.75em"} />
            </SocialIcon>
        </div>
    );
};
