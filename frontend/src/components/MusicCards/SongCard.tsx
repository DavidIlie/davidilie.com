import Image from "next/image";
import styles from "../../styles/styles.module.css";

import { Item2 } from "@interfaces/MusicData";
import { shimmer } from "@lib/shimmer";

interface SongCardProps {
    song: Item2;
    titleCard: boolean;
    isPlaying: boolean;
}

const SongCard = ({
    song,
    titleCard,
    isPlaying,
}: SongCardProps): JSX.Element => {
    return (
        song !== undefined && (
            <a
                target="_blank"
                rel="noreferrer"
                href={song.external_urls?.spotify}
                className="h-full max-w-xl overflow-visible"
            >
                <div
                    style={{
                        gridTemplateColumns: `${
                            titleCard ? `150px` : `110px`
                        } 1fr`,
                    }}
                    className="grid xl:w-[550px] p-5 my-1 overflow-visible duration-200 bg-gray-100 border-2 border-gray-200 shadow-lg cursor-pointer dark:bg-gray-800 dark:border-gray-700 rounded-2xl hover:shadow-xl hoverItem"
                >
                    <div
                        //@ts-ignore
                        style={{ boxSizing: titleCard ? `150px` : `110px` }}
                        className="rounded-2xl"
                    >
                        <Image
                            alt={song?.name + " album cover"}
                            className={styles.image}
                            width={titleCard ? `150px` : `110px`}
                            height={titleCard ? `150px` : `110px`}
                            blurDataURL={shimmer(1920, 1080)}
                            placeholder="blur"
                            src={
                                song.albumImageUrl ||
                                song.album.images
                                    .filter((image) => image.height > 109)
                                    .slice(-1)[0].url
                            }
                        />
                    </div>

                    <div className="flex flex-col max-w-full ml-5 truncate">
                        <p className="max-w-full text-2xl font-semibold truncate">
                            {`${song.name}${
                                titleCard && !isPlaying ? ` - Paused` : ``
                            }`}
                        </p>
                        <div className="flex flex-col w-full mt-2 text-gray-400 truncate">
                            <h1 className="truncate max-w-ful">
                                Album • {song.album.name || song.album}
                            </h1>
                            <p className="max-w-full truncate">
                                Artist{song.artists?.length > 1 && `s`} •{` `}
                                {song.artist ||
                                    song.artists
                                        ?.map((artist) => artist.name)
                                        .join(`, `)}
                            </p>
                        </div>
                    </div>
                </div>
            </a>
        )
    );
};

export default SongCard;
