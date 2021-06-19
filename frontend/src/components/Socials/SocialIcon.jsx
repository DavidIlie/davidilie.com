import Tooltip from "@ui/Tooltip";

export const SocialIcon = (props) => {
    return (
        <div className="cursor-pointer">
            <Tooltip content={props.tooltip} placement="bottom">
                <a
                    href={props.link}
                    target="_blank"
                    className="hover:text-blue-100 duration-250"
                    {...props}
                >
                    {props.children}
                </a>
            </Tooltip>
        </div>
    );
};
