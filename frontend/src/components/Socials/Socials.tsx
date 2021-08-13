import {
    FaDiscord,
    FaYoutube,
    FaTwitter,
    FaTwitch,
    FaGithub,
} from "react-icons/fa";

import { SocialIcon } from "./SocialIcon";

interface SocialsProps {
    font: string | number;
    invisible: boolean;
}

export const Socials = ({ font, invisible }: SocialsProps): JSX.Element => {
    return (
        <div
            className={`mt-2 text-black dark:text-white flex space-x-10 justify-center ${
                invisible ? "invisible" : "visible"
            }`}
        >
            <SocialIcon
                tooltip="DavidIlie"
                newPage
                link={`https://davidilie.com/api/redir/github`}
            >
                <FaGithub
                    className="mb-1"
                    size={font !== undefined ? `${font}em` : "1.75em"}
                />
            </SocialIcon>
            <SocialIcon tooltip="Albastru#0871" notLink>
                <FaDiscord size={font !== undefined ? `${font}em` : "1.75em"} />
            </SocialIcon>
            <SocialIcon
                tooltip="Albastru"
                newPage
                link={`https://davidilie.com/api/redir/youtube`}
            >
                <FaYoutube
                    className="mb-1"
                    size={font !== undefined ? `${font}em` : "1.75em"}
                />
            </SocialIcon>
            <SocialIcon
                tooltip="AlbastruYT"
                newPage
                link={`https://davidilie.com/api/redir/twitch`}
            >
                <FaTwitch size={font !== undefined ? `${font}em` : "1.75em"} />
            </SocialIcon>
            <SocialIcon
                tooltip="AlbastruYT"
                newPage
                link={`https://davidilie.com/api/redir/twitter`}
            >
                <FaTwitter size={font !== undefined ? `${font}em` : "1.75em"} />
            </SocialIcon>
        </div>
    );
};
