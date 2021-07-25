import { LinkType } from "@data/links";
import Image from "next/image";
import formatDistance from "date-fns/formatDistance";

import Badge from "@components/Badge";

const LinkCard = ({ name, link, date, label }: LinkType): JSX.Element => {
    return (
        <a
            href={link}
            target="_blank"
            className="bg-gray-100 border-gray-200 dark:bg-gray-900 dark:border-gray-700 border-2 duration-200 hoverItem rounded-xl overflow-hidden flex items-start flex-col"
        >
            <div className="relative">
                <Badge label={label} />
                <div className="md:flex-shrink-0">
                    <Image
                        src={`https://rdl.ink/render/${encodeURIComponent(
                            link
                        )}`}
                        width="350px"
                        height="200px"
                        blurDataURL={
                            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAIAAADwyuo0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAIklEQVQImWNgYBDnFZCxsfc0tvJkCI/O+vP/f0tdhZK8CgBLPAfARKUieAAAAABJRU5ErkJggg=="
                        }
                        placeholder="blur"
                        className="object-cover h-64 w-full rounded-lg rounded-b-none"
                        alt={name + " screenshot"}
                    />
                </div>
            </div>
            <div className="py-2 px-4 -mt-1.5 border-t-4 border-gray-200 dark:border-gray-800 w-full">
                <div className="flex justify-between font-medium text-sm">
                    <p>{name}</p>
                    <p>
                        {formatDistance(date, new Date(), { addSuffix: true })}
                    </p>
                </div>
            </div>
        </a>
    );
};

export default LinkCard;
