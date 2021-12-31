import { LinkType } from "@data/links";
import Image from "next/image";
import formatDistance from "date-fns/formatDistance";

import Badge from "@components/Badge";
import { shimmer } from "@lib/shimmer";

const LinkCard = ({ name, link, date, label }: LinkType): JSX.Element => {
    return (
        <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-start overflow-hidden duration-200 bg-gray-100 border-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700 hoverItem rounded-xl"
        >
            <div className="relative">
                <div className="absolute z-50 ml-1 right-2 top-2">
                    <Badge
                        label={formatDistance(date, new Date(), {
                            addSuffix: true,
                        })}
                    />
                </div>
                <div className="md:flex-shrink-0">
                    <Image
                        src={`https://rdl.ink/render/${encodeURIComponent(
                            link
                        )}`}
                        width="350px"
                        height="200px"
                        blurDataURL={shimmer(1920, 1080)}
                        placeholder="blur"
                        className="object-cover w-full h-64 rounded-lg rounded-b-none"
                        alt={name + " screenshot"}
                    />
                </div>
            </div>
            <div className="py-2 px-4 -mt-1.5 border-t-4 border-gray-200 dark:border-gray-900 w-full">
                <div className="flex justify-between text-sm">
                    <p className="font-medium">{name}</p>
                    <p className="text-gray-700 dark:text-gray-300">{label}</p>
                </div>
            </div>
        </a>
    );
};

export default LinkCard;
