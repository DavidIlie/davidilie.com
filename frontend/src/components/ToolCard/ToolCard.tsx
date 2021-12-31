import { usePalette } from "react-palette";
import { useTheme } from "next-themes";
import Image from "next/image";

import { ToolType } from "@data/tools";

import Badge from "@components/Badge";

export const ToolCard = ({
    name,
    description,
    link,
    id,
    labels,
}: ToolType): JSX.Element => {
    const { data } = usePalette(`/images/tools/${id}.png`);
    const { theme } = useTheme();

    return (
        <a href={link} target="_blank" rel="noreferrer">
            <div
                className="grid p-3 duration-200 bg-gray-100 border-2 border-gray-200 shadow-lg border-1 dark:bg-gray-800 dark:border-gray-900 rounded-2xl hoverItem"
                style={{ gridTemplateColumns: "80px 1fr" }}
            >
                <div
                    className="relative p-2 overflow-hidden rounded-2xl"
                    style={{
                        boxShadow: `inset 0 0 20px 5px ${
                            theme === "dark"
                                ? `${data.darkVibrant}19`
                                : `${data.lightVibrant}19`
                        }`,
                    }}
                >
                    <div
                        className="absolute inset-0 border-1"
                        style={{
                            background:
                                theme === "dark"
                                    ? data.darkVibrant
                                    : data.lightVibrant,
                            borderColor:
                                theme === "dark"
                                    ? data.darkVibrant
                                    : data.lightVibrant,
                            opacity: theme === "dark" ? 0.25 : 0.15,
                        }}
                    />
                    <Image
                        alt={`${name} logo`}
                        src={`/images/tools/${id}.png`}
                        height="100%"
                        width="100%"
                        blurDataURL={
                            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAIAAADwyuo0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAIklEQVQImWNgYBDnFZCxsfc0tvJkCI/O+vP/f0tdhZK8CgBLPAfARKUieAAAAABJRU5ErkJggg=="
                        }
                        placeholder="blur"
                        className="object-scale-down"
                    />
                </div>
                <div className="flex flex-col justify-center pl-5 text-left truncate itms-center">
                    <h1 className="text-xl font-medium">{name}</h1>
                    <p className="text-gray-400">{description}</p>
                    <div className="flex gap-1 mt-1 max-w-min">
                        {labels?.map((label, index) => (
                            <Badge
                                color={
                                    theme === "light"
                                        ? data.darkVibrant
                                        : data.lightVibrant
                                }
                                background={`${
                                    theme === "light"
                                        ? data.darkVibrant
                                        : data.lightVibrant
                                }22`}
                                label={label}
                                key={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </a>
    );
};

export default ToolCard;
